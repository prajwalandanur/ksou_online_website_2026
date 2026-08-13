/**
 * Copy for the /programmes listing page.
 *
 * Only the page's own framing lives here. **No course data** — the page
 * renders `UG_COURSES` / `PG_COURSES` through the same `useContent()`
 * registry the homepage uses, so the two can never list different fees,
 * durations or links. That single source of truth is the point of the page.
 *
 * This **is** in the i18n registry (`programmesPage` in `src/i18n/content.js`)
 * as of 2026-08-13. `/kn/programmes` exists, so the navbar's language toggle
 * does something on this page instead of linking back to itself — which is
 * what "the Programmes page has no language switcher" actually turned out to
 * mean: the control rendered (it lives in the shared `TopBar`) but had no
 * Kannada URL to point at.
 */
export const PROGRAMMES_PAGE = {
  headingLead: 'Explore KSOU Online',
  headingAccent: 'Programmes',
  description:
    'Browse every undergraduate and postgraduate programme offered by Karnataka State Open University online — with fees, duration and eligibility on each card, and the full syllabus a click away.',

  seo: {
    title: 'KSOU Online Programmes — UG & PG Courses, Fees & Eligibility',
    description:
      'Explore all KSOU Online undergraduate and postgraduate programmes — BA, B.Com, MBA, M.Com, MA and M.Sc Mathematics — with fees, duration, eligibility and admission details for 2026.',
  },
};
