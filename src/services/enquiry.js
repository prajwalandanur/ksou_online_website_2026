/**
 * Delivery of a captured enquiry lead. The first file in `services/`.
 *
 * ⚠ **No lead destination is configured in this repository.** The site is a
 * static React build with no backend of its own, so this module posts to
 * whatever endpoint `VITE_ENQUIRY_ENDPOINT` names — a form-capture service, a
 * Vercel function, a CRM webhook — and the admissions team decides which.
 *
 * With that variable unset (the current state), a submission is logged to the
 * console and reported as successful so the modal's confirmation state is
 * still exercisable in development. **A lead submitted in that mode is not
 * delivered anywhere.** Set the variable before launch, or the popup collects
 * prospective students' details and drops them.
 *
 * Kept out of the component deliberately: the form should not know whether
 * the lead goes to a webhook, a serverless route or a spreadsheet, and
 * swapping that later should not reopen `EnquiryForm`.
 */

import { ENQUIRY_SOURCES } from '@/constants/enquiry';

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT;

/** Roughly the latency of a real round trip, so the pending state is visible. */
const UNCONFIGURED_DELAY_MS = 700;

/**
 * Posts one lead.
 *
 * Resolves on delivery, rejects on a network failure or a non-2xx response —
 * `EnquiryForm` turns a rejection into a visible, retryable error rather than
 * a false confirmation.
 *
 * @param {object} lead Shape built by `buildEnquiryLead`.
 * @returns {Promise<{ delivered: boolean }>} `delivered: false` means the
 *   endpoint is unconfigured and the lead was only logged.
 */
export async function submitEnquiry(lead) {
  if (!ENDPOINT) {
    console.warn(
      '[enquiry] VITE_ENQUIRY_ENDPOINT is not set — this lead was NOT delivered anywhere:',
      lead,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, UNCONFIGURED_DELAY_MS);
    });
    return { delivered: false };
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Enquiry submission failed with status ${response.status}`);
  }

  return { delivered: true };
}

/**
 * Assembles the payload a counsellor actually needs.
 *
 * `programme` is sent as the exact programme name shown on the site rather
 * than its slug, so the lead lands in the counsellor's inbox reading "Master
 * of Business Administration" and not "mba"; `programmeId` rides along for
 * anything downstream that wants to match on a key. Same reasoning for
 * `country` / `countryCode`.
 *
 * `page` is the language-stripped path so `/kn/programmes/mba` and
 * `/programmes/mba` aggregate as one source, with `language` carrying the
 * distinction separately.
 *
 * `source` names the surface the lead came from (see `ENQUIRY_SOURCES`) —
 * the same form is rendered both by the timed popup and permanently on
 * `/contact`, and labelling a sought-out enquiry as a popup interruption
 * would misreport how the site actually converts. It defaults to the popup
 * because that was this payload's only origin when the field was introduced,
 * so an existing caller keeps sending exactly what it sent before.
 */
export function buildEnquiryLead({
  values,
  countryName,
  programmeName,
  page,
  pageTitle,
  language,
  source = ENQUIRY_SOURCES.popup,
}) {
  return {
    studentName: values.studentName.trim(),
    mobile: values.mobile.trim(),
    email: values.email.trim(),
    city: values.city.trim(),
    country: countryName,
    countryCode: values.country,
    programme: programmeName,
    programmeId: values.programme,
    page,
    pageTitle,
    language,
    source,
    submittedAt: new Date().toISOString(),
  };
}
