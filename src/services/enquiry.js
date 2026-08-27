/**
 * Delivery of a captured enquiry lead to KSOU's enquiry system (Talisma).
 *
 * ── The browser posts straight to KSOU ──────────────────────────────────
 *   POST https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries
 *
 * This build is deployed to IIS at
 * `onlineprogramme.ksoumysuru.ac.in/ksou_test/` — the **same origin** as the
 * API. That single fact removes both obstacles this module used to work
 * around: there is no cross-origin request, so CORS never applies, and the
 * visitor's own browser carries the Cloudflare clearance that a server-side
 * call could never obtain. It is exactly how KSOU's existing enquiry form at
 * /KSOU/Public/EnquiryForm already reaches this same endpoint.
 *
 * **The `api/enquiry.js` Vercel proxy is unused by this build.** IIS cannot
 * run it; it is kept only for a possible return to Vercel, where a direct
 * call would once again be blocked and that proxy — not a CORS request — is
 * the path that works.
 *
 * ── The payload is theirs, not ours ─────────────────────────────────────
 * `buildEnquiryLead` emits exactly the eleven fields their OpenAPI schema
 * (`SaveEnquiryRequest`) declares, in their names and their types. Anything
 * this site wants to know but their CRM has no column for — which surface
 * captured the lead, which page, which language — rides along in a separate
 * `meta` object that the proxy logs and does not forward.
 *
 * `programId` and `countryId` are required integers and are resolved from
 * `constants/ksouCrm.js`. An unresolvable one **throws** rather than
 * defaulting: a lead filed against the wrong programme is worse than a lead
 * that fails visibly and can be retried.
 */

import { COUNTRIES } from '@/constants/countries';
import { resolveKsouCountry, resolveKsouProgramme } from '@/constants/ksouCrm';
import { getUtmParameters } from './utm';

/**
 * KSOU's enquiry endpoint and its key, both from `.env` — which is gitignored
 * and therefore NOT in the repository, so it must exist on whatever machine
 * runs the build (see `.env.example`). Without it the site builds fine but
 * posts an empty key and KSOU answers 401.
 *
 * `VITE_ENQUIRY_ENDPOINT` is still honoured first, so a staging build can be
 * pointed at a proxy or a different collector without a code change.
 */
const ENDPOINT =
  import.meta.env.VITE_ENQUIRY_ENDPOINT ||
  import.meta.env.VITE_API_URL ||
  'https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries';

/**
 * Inlined into the bundle at build time and therefore public. The API
 * requires it: verified 2026-08-27, a request without the header is answered
 * `401 "A valid X-API-Key header is required."`
 */
const API_KEY = import.meta.env.VITE_API_KEY || '';

/** Field caps from their schema. Over-long input is rejected with a 400. */
const MAX = {
  studentName: 150,
  mobileNo: 20,
  emailId: 200,
  city: 100,
  country: 100,
  program: 200,
};

/**
 * Assembles the KSOU enquiry payload from the form's own values.
 *
 * @param {object}  args
 * @param {object}  args.values     Raw form values. `country` is an ISO code,
 *                                  `programme` is a course id or `ma:English`.
 * @param {string}  args.page       Language-stripped path the lead came from.
 * @param {string}  args.pageTitle  Document title at submission time.
 * @param {string}  args.language   Active site language.
 * @param {string}  args.source     Which surface captured it (ENQUIRY_SOURCES).
 * @returns {{ enquiry: object, meta: object }}
 * @throws {Error} when the programme or country cannot be resolved to a KSOU id.
 */
export function buildEnquiryLead({ values, page, pageTitle, language, source }) {
  const programme = resolveKsouProgramme(values.programme);
  if (!programme) {
    throw new Error(`No KSOU programId for programme "${values.programme}"`);
  }

  const isoCountry = COUNTRIES.find((country) => country.code === values.country);
  const country = resolveKsouCountry(isoCountry);
  if (!country) {
    throw new Error(`No KSOU countryId for country "${values.country}"`);
  }

  const utm = getUtmParameters();

  return {
    enquiry: {
      studentName: values.studentName.trim().slice(0, MAX.studentName),
      mobileNo: values.mobile.trim().slice(0, MAX.mobileNo),
      emailId: values.email.trim().slice(0, MAX.emailId),
      city: values.city.trim().slice(0, MAX.city),
      countryId: country.id,
      country: country.name.slice(0, MAX.country),
      programId: programme.id,
      program: programme.name.slice(0, MAX.program),
      ...utm,
    },
    // Not part of their schema. Kept so the proxy can log where a lead came
    // from, and so a future second destination does not have to re-derive it.
    meta: {
      page,
      pageTitle,
      language,
      source,
      submittedAt: new Date().toISOString(),
    },
  };
}

/**
 * Posts one lead through the proxy.
 *
 * Resolves only when KSOU accepted it. Rejects on a network failure, on a
 * validation rejection, on an `isSuccess: false` envelope, and on anything
 * the proxy could not deliver — `EnquiryForm` turns every rejection into a
 * visible, retryable message rather than a confirmation the visitor did not
 * earn.
 *
 * @param {{ enquiry: object, meta: object }} lead From `buildEnquiryLead`.
 * @returns {Promise<{ isSuccess: true, message?: string, data?: object }>}
 */
export async function submitEnquiry(lead) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    /*
     * `lead.enquiry` only — never the whole object. `buildEnquiryLead` also
     * returns a `meta` block (page, source, language) for this site's own
     * use, and posting it would push fields their schema does not declare
     * into a real CRM. The proxy used to strip it; sending directly, that
     * responsibility moves here.
     */
    body: JSON.stringify(lead.enquiry),
  });

  /*
   * Read the body once as text, then try JSON. Their documented
   * `accept: text/plain` means a 2xx body is not guaranteed to be JSON, and
   * a Cloudflare challenge or an IIS error page returns HTML — in both cases
   * `response.json()` would throw a parse error that masks the real status.
   */
  const raw = await response.text().catch(() => '');
  let payload;
  try {
    payload = raw ? JSON.parse(raw) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    /*
     * Kept out of the UI (the form shows its own wording) but surfaced in the
     * console, because the three failures worth telling apart all look
     * identical to a visitor:
     *   401 { detail: "A valid X-API-Key header is required." }  → key missing
     *                                                             from the build
     *   400 { errors: { StudentName: [...] } }                   → their validator
     *   an HTML body                                             → Cloudflare or IIS
     *                                                             answered, not the API
     */
    const detail =
      payload?.detail ||
      (payload?.errors && JSON.stringify(payload.errors)) ||
      payload?.title ||
      raw.slice(0, 500) ||
      '(no body)';
    throw new Error(`Enquiry submission failed with status ${response.status}: ${detail}`);
  }

  /*
   * A 2xx is necessary but not sufficient: their envelope carries the real
   * verdict in `isSuccess`, and a 200 with `isSuccess: false` is a *rejected*
   * lead. Treating that as delivered would show a student "Thank You" for an
   * enquiry nobody received, which is the one outcome this must never
   * produce. An unparseable 2xx is still accepted — failing real leads over
   * a content-type quirk would be worse.
   */
  if (payload && payload.isSuccess === false) {
    throw new Error(
      `Enquiry rejected by KSOU: ${payload.message || '(no message)'} ${
        payload.errors ? JSON.stringify(payload.errors) : ''
      }`.trim(),
    );
  }

  return {
    isSuccess: true,
    message: payload?.message,
    data: payload?.data,
  };
}
