/**
 * Vercel serverless function: forwards an enquiry lead to KSOU's API.
 *
 * ── Why this exists ─────────────────────────────────────────────────────
 * The browser cannot post to KSOU directly. Verified from the deployed
 * origin on 2026-08-24: the cross-origin request fails before a response is
 * readable, because `onlineprogramme.ksoumysuru.ac.in` sits behind Cloudflare
 * and returns no `Access-Control-Allow-Origin` for this site. Server-to-
 * server has no such restriction, so the lead takes one extra hop.
 *
 * This is the "appropriate secure proxy" path the integration brief asks for
 * when direct calls are blocked. It holds no credentials — KSOU's enquiry
 * endpoint is unauthenticated — so there is nothing here to leak; it exists
 * purely to move the request out of the browser's origin model.
 *
 * ── What it does NOT do ─────────────────────────────────────────────────
 * It does not re-validate the lead's contents beyond presence and shape.
 * KSOU's own API is the authority on what it accepts, and duplicating its
 * rules here would mean two validators drifting apart. A rejection is passed
 * back with its status so the form can tell "try again" from "we're down".
 *
 * The `meta` object the client sends (page, source, language) is logged and
 * deliberately not forwarded — it is not in KSOU's schema.
 */

const KSOU_ENQUIRY_URL =
  process.env.KSOU_ENQUIRY_URL ||
  'https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries';

/** Long enough for a slow CRM, short enough to stay inside the function budget. */
const UPSTREAM_TIMEOUT_MS = 15_000;

/** Exactly the fields KSOU's `SaveEnquiryRequest` schema declares. */
const ALLOWED_FIELDS = [
  'studentName',
  'mobileNo',
  'emailId',
  'city',
  'countryId',
  'country',
  'programId',
  'program',
  'utmSource',
  'utmMedium',
  'utmCampaign',
];

const REQUIRED_FIELDS = [
  'studentName',
  'mobileNo',
  'emailId',
  'country',
  'countryId',
  'program',
  'programId',
];

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel parses JSON bodies for us, but a string body arrives from some
  // clients (and from `fetch` with a text content-type), so handle both.
  let body = request.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: 'Malformed JSON body' });
    }
  }

  const enquiry = body?.enquiry;
  if (!enquiry || typeof enquiry !== 'object') {
    return response.status(400).json({ error: 'Missing enquiry payload' });
  }

  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = enquiry[field];
    return value === undefined || value === null || value === '';
  });
  if (missing.length > 0) {
    return response.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
  }

  // Whitelist rather than pass-through: an unexpected key reaching a CRM is
  // how junk ends up in someone's lead database.
  const payload = {};
  for (const field of ALLOWED_FIELDS) {
    if (enquiry[field] !== undefined) payload[field] = enquiry[field];
  }
  payload.countryId = Number(payload.countryId);
  payload.programId = Number(payload.programId);

  if (!Number.isInteger(payload.countryId) || payload.countryId < 1) {
    return response.status(400).json({ error: 'Invalid countryId' });
  }
  if (!Number.isInteger(payload.programId) || payload.programId < 1) {
    return response.status(400).json({ error: 'Invalid programId' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(KSOU_ENQUIRY_URL, {
      method: 'POST',
      headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      // Logged in full for whoever is debugging; the client gets the status
      // and a short reason, never the upstream URL or a stack.
      console.error('[enquiry] KSOU rejected lead', {
        status: upstream.status,
        body: text.slice(0, 1000),
        meta: body.meta,
      });
      return response
        .status(upstream.status === 400 ? 400 : 502)
        .json({ error: 'The enquiry service rejected this submission.' });
    }

    console.log('[enquiry] delivered', {
      programId: payload.programId,
      countryId: payload.countryId,
      source: body.meta?.source,
      page: body.meta?.page,
    });

    return response.status(200).json({ delivered: true, upstream: text.slice(0, 500) });
  } catch (error) {
    const aborted = error?.name === 'AbortError';
    console.error('[enquiry] upstream call failed', aborted ? 'timeout' : error);
    return response
      .status(504)
      .json({ error: 'Could not reach the enquiry service. Please try again.' });
  } finally {
    clearTimeout(timeout);
  }
}
