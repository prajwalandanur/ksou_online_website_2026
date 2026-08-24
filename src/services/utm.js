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

/** Empty rather than absent — the brief is explicit that "test" must never ship. */
const EMPTY = { utmSource: '', utmMedium: '', utmCampaign: '' };

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
 * The attribution to send with a lead. Always returns all three fields, as
 * empty strings when this visit carried no campaign parameters.
 */
export function getUtmParameters() {
  const raw = readStored('session', STORAGE_KEY);
  if (!raw) return { ...EMPTY };

  try {
    const parsed = JSON.parse(raw);
    return {
      utmSource: parsed.utmSource ?? '',
      utmMedium: parsed.utmMedium ?? '',
      utmCampaign: parsed.utmCampaign ?? '',
    };
  } catch {
    // Corrupt value — treat the visit as unattributed rather than throwing
    // inside a form submission.
    return { ...EMPTY };
  }
}
