/**
 * Marketing attribution for enquiry leads.
 *
 * A visitor arrives on `/?utm_source=google&utm_medium=cpc&utm_campaign=...`,
 * reads two programme pages, and only then opens the enquiry form. By that
 * point the query string is long gone — React Router has replaced the URL
 * several times over. Attribution therefore has to be captured at the moment
 * of arrival and held for the rest of the visit, which is what this does.
 *
 * sessionStorage, matching the popup sequence: attribution belongs to the
 * visit that carried the parameters, and a campaign click a week ago should
 * not be credited with today's organic enquiry. (The 7-day submission
 * suppression is the one thing here that outlives the session, and it uses
 * localStorage for exactly that reason.)
 *
 * ── First touch wins ────────────────────────────────────────────────────
 * Once a visit has attribution, later navigations do not overwrite it. If
 * someone lands from a Google ad and later clicks an internal link that
 * happens to carry different UTMs, the ad brought them and keeps the credit.
 * A parameter-less navigation never clears what was captured.
 */

import { readStored, writeStored } from './enquiryStorage';

const STORAGE_KEY = 'ksou.enquiry.utm';

/** The three fields KSOU's API accepts. Nothing else is captured. */
const UTM_PARAMS = {
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
};

/**
 * The API caps each of these at 200 characters and rejects anything longer,
 * which would turn a junk query string into a failed lead. Truncating keeps
 * the enquiry deliverable; attribution is not worth losing a student over.
 */
const MAX_LENGTH = 200;

/**
 * What an unattributed visit reports.
 *
 * `direct` / `none` is the convention GA and most CRMs already use for
 * traffic that arrived without a campaign, so a counsellor reading the lead
 * sees a meaningful origin instead of three blank columns — and the blanks
 * were genuinely ambiguous, since they could equally mean "attribution
 * broke". Placeholder values such as "test" must never ship, which is why
 * these are the real conventional terms rather than invented ones.
 *
 * Applied per field, not just wholesale: a URL carrying only `utm_source`
 * still reports `none` for the two it omitted.
 */
const DEFAULTS = { utmSource: 'direct', utmMedium: 'none', utmCampaign: 'none' };

/** Fills any field the visit did not supply with its conventional default. */
const withDefaults = (found) => ({
  utmSource: found?.utmSource || DEFAULTS.utmSource,
  utmMedium: found?.utmMedium || DEFAULTS.utmMedium,
  utmCampaign: found?.utmCampaign || DEFAULTS.utmCampaign,
});

function readFromLocation(search) {
  const params = new URLSearchParams(search);
  const found = {};
  let any = false;

  for (const [field, param] of Object.entries(UTM_PARAMS)) {
    const value = (params.get(param) ?? '').trim().slice(0, MAX_LENGTH);
    found[field] = value;
    if (value) any = true;
  }

  return any ? found : null;
}

/**
 * Captures UTM parameters from the current URL, if this visit has none yet.
 *
 * Safe to call on every route change and on every mount — it is a no-op once
 * something has been stored, and a no-op when the URL carries no UTMs.
 */
export function captureUtmParameters(search = window.location.search) {
  if (readStored('session', STORAGE_KEY)) return;

  const found = readFromLocation(search);
  if (!found) return;

  writeStored('session', STORAGE_KEY, JSON.stringify(found));
}

/**
 * The attribution to send with a lead. Always returns all three fields,
 * falling back to `direct` / `none` / `none` for anything this visit did not
 * carry, so the CRM never receives a blank attribution column.
 */
export function getUtmParameters() {
  const raw = readStored('session', STORAGE_KEY);
  if (!raw) return withDefaults(null);

  try {
    return withDefaults(JSON.parse(raw));
  } catch {
    // Corrupt value — treat the visit as unattributed rather than throwing
    // inside a form submission.
    return withDefaults(null);
  }
}
