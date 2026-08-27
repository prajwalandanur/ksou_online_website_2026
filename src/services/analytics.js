/**
 * Analytics events.
 *
 * ── Read this before assuming events are being collected ────────────────
 * **GA4 is not installed on this site.** There is no `gtag.js` snippet, no
 * GTM container and no `dataLayer` anywhere in `index.html` or in `src/` —
 * verified 2026-08-27. So `trackFormSubmit` below is, today, a no-op that
 * returns `false`.
 *
 * That is deliberate rather than an oversight. The integration brief asked
 * for the event to fire on a successful submission, and this is the half of
 * that which lives in application code; the other half is a measurement
 * decision (which GA4 property, and the consent question that comes with
 * loading a Google tag on a government university's site) that nobody has
 * made yet. Wiring the call now means the day the tag is added, conversions
 * start arriving with no further code change.
 *
 * ── Why it is wrapped at all ────────────────────────────────────────────
 * A bare `gtag(...)` call would throw `ReferenceError: gtag is not defined`
 * on every submission. That exception would land inside `EnquiryForm`'s
 * `try` block, *after* the lead had already been delivered — so a student
 * whose enquiry reached KSOU successfully would be shown "something went
 * wrong" and would submit again. An analytics call must never be able to
 * fail a form, which is why this swallows everything.
 */

/**
 * Reports a successful enquiry submission to GA4, if a tag is present.
 *
 * @param {string} programme The programme the visitor selected, used as the
 *                           event label so conversions can be broken down by
 *                           course. KSOU's own programme name is passed, so
 *                           it matches what lands in their CRM.
 * @returns {boolean} Whether an analytics tag actually received the event —
 *                    useful in the console when checking whether tracking is
 *                    live, and returned rather than logged so this stays
 *                    silent in production.
 */
export function trackFormSubmit(programme) {
  if (typeof window === 'undefined') return false;

  const gtag = window.gtag;
  if (typeof gtag !== 'function') return false;

  try {
    gtag('event', 'form_submit', {
      event_category: 'enquiry_form',
      event_label: programme,
    });
    return true;
  } catch {
    // An analytics failure is never worth failing a captured lead over.
    return false;
  }
}
