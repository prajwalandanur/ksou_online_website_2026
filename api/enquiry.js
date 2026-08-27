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
 * when direct calls are blocked. Since 2026-08-27 it also **does** hold a
 * credential — KSOU's `X-API-Key` — which is the second reason it must stay
 * server-side: a key shipped in the bundle is a published key.
 *
 * ── Success is `isSuccess`, not the status code ─────────────────────────
 * Their API answers `{ isSuccess, message, errors, data }`. A 200 carrying
 * `isSuccess: false` is a *rejected* lead, and reporting it as delivered
 * would show a student a "Thank You" for an enquiry nobody received. This
 * function therefore parses the body and treats that case as a failure.
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

/**
 * KSOU's API key, supplied by the university on 2026-08-27.
 *
 * Server-side only and deliberately never `VITE_`-prefixed: Vite inlines
 * those into the client bundle, which would publish this key to anyone who
 * opens devtools. It stays here, where only the function can read it.
 *
 * Absent, the request is still attempted without the header — that is how
 * the integration behaved before the key existed, and a missing environment
 * variable should surface as KSOU's own 401 rather than as this function
 * refusing to run.
 */
const KSOU_API_KEY = process.env.KSOU_ENQUIRY_API_KEY || '';

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
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        ...(KSOU_API_KEY ? { 'X-API-Key': KSOU_API_KEY } : {}),
      },
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

    /*
     * A 2xx is necessary but not sufficient. Their envelope carries the real
     * verdict in `isSuccess`, so parse it before calling this delivered.
     *
     * The `accept: text/plain` header they document means the body is not
     * guaranteed to be JSON, so a parse failure is not treated as a
     * rejection — an unparseable 2xx is accepted, since the alternative is
     * failing leads over a content-type quirk. Only an explicit
     * `isSuccess: false` fails.
     */
    let envelope;
    try {
      envelope = JSON.parse(text);
    } catch {
      envelope = null;
    }

    if (envelope && envelope.isSuccess === false) {
      console.error('[enquiry] KSOU returned isSuccess=false', {
        message: envelope.message,
        errors: envelope.errors,
        meta: body.meta,
      });
      return response.status(422).json({
        error: 'The enquiry service rejected this submission.',
        message: typeof envelope.message === 'string' ? envelope.message.slice(0, 300) : undefined,
      });
    }

    console.log('[enquiry] delivered', {
      programId: payload.programId,
      countryId: payload.countryId,
      source: body.meta?.source,
      page: body.meta?.page,
      // Their own confirmation flags: a lead can be saved but not yet pushed
      // to the CRM, which is worth seeing in the logs.
      saved: envelope?.data?.saved,
      crmIntegrated: envelope?.data?.crmIntegrated,
    });

    return response.status(200).json({
      delivered: true,
      isSuccess: envelope?.isSuccess ?? true,
      message: typeof envelope?.message === 'string' ? envelope.message.slice(0, 300) : undefined,
      data: envelope?.data,
    });
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
