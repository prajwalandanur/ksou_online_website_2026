/**
 * Trigger rules and session state for the automatic enquiry popup.
 *
 * ── The sequence ────────────────────────────────────────────────────────
 * A visitor sees the enquiry modal at most three times, each on a different
 * kind of trigger, and never again after that:
 *
 *   1. 50% scroll depth **or** 60s after entering the site, whichever first
 *   2. 60s after dismissing the first
 *   3. exit intent — the cursor leaves the viewport past the top edge
 *
 * The escalation is deliberate: engagement first (they read half a page, or
 * stayed a minute), then a follow-up, then one last attempt only at the
 * moment someone is leaving anyway. Nothing here fires on a fixed interval,
 * so a visitor who ignores the site is never interrupted on a timer alone
 * past the first minute.
 *
 * **The 60s of trigger 2 is measured from dismissal, not from appearance.**
 * Measuring from appearance would fire the second popup the instant a
 * visitor who actually read the first one closed it.
 *
 * ── Why it is session-wide ──────────────────────────────────────────────
 * The sequence belongs to the visitor, not the page. `EnquiryPopup` mounts
 * once in `MainLayout` and never unmounts across client-side routes, so
 * in-app navigation cannot restart it. A hard reload (a direct URL, a
 * refresh, an external link back into the site) *does* remount it, which is
 * why the pending due-time and the count are mirrored into `sessionStorage`:
 * the sequence picks up where it left off instead of starting over.
 * sessionStorage rather than localStorage because "session" is exactly the
 * scope for the sequence — the one thing that must outlive the session is
 * the post-submission suppression below, and that uses localStorage.
 */

/**
 * The three appearances, in order. `useEnquiryPopup` reads the descriptor at
 * index `shownCount`, so this array *is* the schedule — arming code branches
 * on which fields are present rather than on a name.
 *
 * - `delayMs`     — arm a timer for this long (persisted, so a reload resumes)
 * - `scrollDepth` — also arm on this proportion of the document being seen
 * - `exitIntent`  — also arm on the cursor leaving past the top of the window
 *
 * A descriptor with two triggers is a race: whichever fires first opens the
 * modal and disarms the other.
 */
export const POPUP_TRIGGERS = [
  { delayMs: 60_000, scrollDepth: 0.5 },
  { delayMs: 60_000 },
  { exitIntent: true },
];

/** Total automatic appearances per session. Derived, never hand-maintained. */
export const MAX_POPUP_APPEARANCES = POPUP_TRIGGERS.length;

/**
 * Floor applied whenever a timer is armed with a due-time that has already
 * passed — after a hard reload, or after the visitor leaves a page where the
 * popup is suppressed. Without it, refreshing at minute three would throw the
 * modal up during first paint: "do not show it immediately when the page
 * loads" applies to every load, not just the first one.
 */
export const MIN_DELAY_AFTER_LOAD_MS = 5_000;

/**
 * How long to wait after the second popup is dismissed before listening for
 * exit intent.
 *
 * Not padding — closing the modal usually means moving the cursor *up* to the
 * ✕ in its top-right corner, and a visitor who keeps travelling in that same
 * direction would otherwise be handed the third popup within a second of
 * dismissing the second one. Exit intent is meant to catch someone leaving,
 * not someone who just closed a dialog.
 */
export const EXIT_INTENT_ARM_DELAY_MS = 5_000;

/**
 * How long a captured lead silences the popup for. Seven days, and therefore
 * **localStorage** — a session-scoped flag would forget by the visitor's next
 * visit and ask someone who already applied for their details all over again.
 *
 * Set by `EnquiryForm` on every successful submission, which means the form
 * on `/contact` silences the popup exactly like the popup's own copy does.
 * That is the point of putting it in the form rather than in the popup's
 * controller: a third surface would inherit it for free.
 */
export const SUBMISSION_SUPPRESSION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Route prefixes the popup never appears on, matched against the
 * language-stripped pathname so `/kn/programmes/mba` is covered too.
 *
 * The trailing slash is load-bearing: it suppresses the six programme
 * *detail* pages without touching `/programmes`, the listing.
 *
 * ⚠ The stated reason for this is that programme pages carry their own
 * inline enquiry form. As of 2026-08-19 they do not —
 * `ProgrammeLeadGeneration` is still the empty placeholder `<div
 * id="programme-enquiry" />` reserved for it. Until that slot is filled,
 * this rule leaves the six highest-intent pages on the site with no lead
 * capture at all.
 */
export const SUPPRESSED_PATH_PREFIXES = ['/programmes/'];

/**
 * How long the success panel stays up before the modal closes itself. Long
 * enough to read the confirmation, short enough that it does not become a
 * second thing to dismiss — the Close button is there for anyone faster.
 */
export const SUCCESS_AUTO_CLOSE_MS = 3_000;

/**
 * Storage keys, split by the lifetime each value needs. Namespaced because
 * both storage areas are shared with anything else served from this origin.
 */
export const ENQUIRY_STORAGE_KEYS = {
  session: {
    /** Timestamp (ms) the pending timed trigger is due. Survives a reload. */
    nextPopupAt: 'ksou.enquiry.nextPopupAt',
    /** How many times the modal has been shown this session (0-3). */
    shownCount: 'ksou.enquiry.popupShownCount',
  },
  local: {
    /** Timestamp (ms) before which no popup may appear. See SUBMISSION_SUPPRESSION_MS. */
    suppressedUntil: 'ksou.enquiry.suppressedUntil',
  },
};

/**
 * Where a lead was captured, sent as the payload's `source`.
 *
 * The same `EnquiryForm` is rendered in two places — the timed popup and the
 * permanent card on `/contact` — and a counsellor working the inbox needs to
 * tell an interruption-driven lead from someone who sought the form out. The
 * form's `page` field records *which* page; this records *which surface*.
 *
 * Values are the strings that reach the endpoint, so treat them as a wire
 * contract: renaming one silently reclassifies every lead downstream.
 */
export const ENQUIRY_SOURCES = {
  popup: 'website-enquiry-popup',
  contactPage: 'contact-page-form',
};
