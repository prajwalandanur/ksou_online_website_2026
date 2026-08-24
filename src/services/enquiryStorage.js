/**
 * Browser storage for the enquiry popup, plus the post-submission suppression
 * flag that outlives the session.
 *
 * Split out of `useEnquiryPopup` because the flag now has two writers: the
 * popup's own form and the permanent form on `/contact`. A module-level store
 * with a subscription is what lets a submission on the contact page silence a
 * popup controller that is already mounted on the same screen — a plain
 * localStorage write would sit there unread until the next reload, and the
 * visitor would be asked for details they had just handed over.
 */

import {
  ENQUIRY_STORAGE_KEYS,
  SUBMISSION_SUPPRESSION_MS,
} from '@/constants/enquiry';

/**
 * sessionStorage and localStorage, but survivable.
 *
 * Safari in private mode and a few locked-down enterprise configurations
 * throw on `setItem` — and on the storage object itself when cookies are
 * blocked entirely. A lead-capture popup must not be able to take the page
 * down, so every access is guarded and falls back to a module-level object.
 * The fallback loses its contents across a hard reload, which is the correct
 * degradation: the visitor gets the sequence again, not an exception.
 */
const memoryStore = { session: {}, local: {} };

function storageFor(scope) {
  return scope === 'local' ? window.localStorage : window.sessionStorage;
}

export function readStored(scope, key) {
  try {
    const value = storageFor(scope).getItem(key);
    return value === null ? memoryStore[scope][key] ?? null : value;
  } catch {
    return memoryStore[scope][key] ?? null;
  }
}

export function writeStored(scope, key, value) {
  memoryStore[scope][key] = String(value);
  try {
    storageFor(scope).setItem(key, String(value));
  } catch {
    // Memory copy above is the fallback.
  }
}

export function removeStored(scope, key) {
  delete memoryStore[scope][key];
  try {
    storageFor(scope).removeItem(key);
  } catch {
    // Nothing to do.
  }
}

export function readNumber(scope, key) {
  const raw = readStored(scope, key);
  if (raw === null) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

const suppressionListeners = new Set();

/**
 * Whether a lead has been captured recently enough to keep the popup quiet.
 *
 * Safe to use as a `useSyncExternalStore` snapshot: it returns a boolean, so
 * React compares by value and an unchanged answer never forces a render. It
 * does depend on the clock, so a suppression window that expires while a tab
 * sits open goes unnoticed until something else re-renders — which is
 * immaterial at a seven-day horizon and self-corrects on the next load.
 */
export function isEnquirySuppressed() {
  const until = readNumber('local', ENQUIRY_STORAGE_KEYS.local.suppressedUntil);
  return until !== null && Date.now() < until;
}

/**
 * Silences the popup for `SUBMISSION_SUPPRESSION_MS`, and tells any mounted
 * controller immediately.
 *
 * Called by `EnquiryForm` on every successful submission, from either of its
 * two homes — so this is also what stops the popup from interrupting someone
 * seconds after they submitted the form on `/contact`.
 */
export function suppressEnquiryPopup() {
  writeStored('local', ENQUIRY_STORAGE_KEYS.local.suppressedUntil, Date.now() + SUBMISSION_SUPPRESSION_MS);
  suppressionListeners.forEach((listener) => listener());
}

/** Subscribe to suppression changes. Returns the unsubscribe function. */
export function subscribeToEnquirySuppression(listener) {
  suppressionListeners.add(listener);
  return () => suppressionListeners.delete(listener);
}
