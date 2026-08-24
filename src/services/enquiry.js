/**
 * Delivery of a captured enquiry lead to KSOU's enquiry system (Talisma).
 *
 * ── Why this posts to our own origin ────────────────────────────────────
 * The real endpoint is
 *   POST https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries
 * and the browser cannot call it directly: verified on 2026-08-24 from the
 * deployed Vercel origin, the cross-origin request fails outright
 * ("TypeError: Failed to fetch") because the host sits behind Cloudflare and
 * sends no `Access-Control-Allow-Origin` for us. There is nothing to fix on
 * this side — CORS is the other server's decision.
 *
 * So this posts to `/api/enquiry`, a serverless function on our own domain
 * (`api/enquiry.js`), which forwards the lead server-to-server where CORS
 * does not apply. Same-origin request, no preflight, no credentials in the
 * browser. If KSOU ever sends the ACAO header, this module is the only place
 * that needs to change.
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
 * Same-origin proxy route. `VITE_ENQUIRY_ENDPOINT` still overrides it, so a
 * staging build can be pointed elsewhere without a code change, but it is no
 * longer required for the form to work — the default path is the real one.
 */
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry';

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
 * validation rejection, and on anything the proxy could not deliver —
 * `EnquiryForm` turns every rejection into a visible, retryable message
 * rather than a confirmation the visitor did not earn.
 *
 * @param {{ enquiry: object, meta: object }} lead From `buildEnquiryLead`.
 */
export async function submitEnquiry(lead) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    // The proxy returns a short, non-technical reason; keep it out of the UI
    // (the form shows its own copy) but make it visible in the console for
    // whoever is debugging a failing campaign.
    let detail;
    try {
      detail = (await response.text()).slice(0, 500);
    } catch {
      detail = '(no body)';
    }
    throw new Error(`Enquiry submission failed with status ${response.status}: ${detail}`);
  }

  return { delivered: true };
}
