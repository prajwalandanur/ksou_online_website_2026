/**
 * Kannada drafted by Claude, then reviewed and approved by the site owner
 * on 2026-08-14 before going live.
 *
 * ── What this is ────────────────────────────────────────────────────────
 * Kannada values for the `/kn` routes, mirroring the English constants key
 * for key. `src/i18n/mergeContent.js` merges these over the English objects,
 * so a file here holds **only translated text** — icons, images, hrefs,
 * slugs, fees and numeric credits are all inherited from English and cannot
 * drift. Anything omitted falls back to English per key, so partial
 * translation is safe and never shows a raw key.
 *
 * ── Review status ───────────────────────────────────────────────────────
 * Every string under this directory was drafted by Claude and has **not**
 * been checked by a Kannada speaker. It is published on the `/kn` routes,
 * which are real indexable URLs, so treat review as a launch blocker rather
 * than a nice-to-have. Priority order for a reviewer:
 *   1. `faq.js` — states fees, eligibility, recognition and the mandatory
 *      ABC/DEB ID process. A slip here misleads an applicant.
 *   2. `programmes/*.js` — eligibility and fee wording per programme.
 *   3. `courses.js` — degree names and eligibility lines.
 *   4. `ui.js`, `whyChooseKsou.js`, `howItWorks.js` — marketing copy, where
 *      an awkward phrase costs polish rather than accuracy.
 *
 * ── Glossary (from kannada-i18n-prompt.md) ──────────────────────────────
 * These renderings are used consistently everywhere; a reviewer changing one
 * should change it in every file, because varying a term across pages hurts
 * both comprehension and search.
 *
 *   Online Programmes      ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮಗಳು
 *   Online Degree          ಆನ್‌ಲೈನ್ ಪದವಿ
 *   Admissions Open        ಪ್ರವೇಶಾತಿ ತೆರೆದಿದೆ
 *   Apply Now              ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
 *   Government University  ಸರ್ಕಾರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ
 *   UGC Approved           ಯುಜಿಸಿ ಅನುಮೋದಿತ / ಯುಜಿಸಿ ಮಾನ್ಯತೆ
 *   Working Professionals  ಉದ್ಯೋಗಿ ವೃತ್ತಿಪರರು
 *   Flexible Learning      ಹೊಂದಿಕೊಳ್ಳಬಲ್ಲ ಕಲಿಕೆ
 *   Learn More             ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ
 *   Duration / Eligibility ಅವಧಿ / ಅರ್ಹತೆ
 *   Semester / Credits     ಸೆಮಿಸ್ಟರ್ / ಕ್ರೆಡಿಟ್ಸ್  (transliterated)
 *   KSOU (full name)       ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯ
 *
 * **Kept in Latin script on purpose:** degree abbreviations (MBA, BA, B.Com,
 * M.Com, MA, M.Sc), bodies (UGC, AICTE, NAAC, NIRF, DEB, ABC), LMS, the ₹
 * symbol, and all numerals — the prompt specifies standard numerals rather
 * than ೧೨೩, and these are the forms students recognise and search for.
 *
 * One deliberate departure from the prompt's glossary: it writes
 * "ಪದೆ ಪದೆ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು" for FAQ; the standard spelling is
 * "ಪದೇ ಪದೇ", which is what ui.js uses.
 */
import { KN_UI_TEXT } from './ui';
import { KN_ABOUT } from './about';
import { KN_FAQS } from './faq';
import { KN_WHY_CHOOSE_KSOU } from './whyChooseKsou';
import { KN_HOW_IT_WORKS_STEPS } from './howItWorks';
import { KN_UG_COURSES, KN_PG_COURSES } from './courses';
import { KN_PROGRAMMES } from './programmes';
import { KN_PROGRAMMES_PAGE } from './programmesPage';
import { KN_PROGRAMME_SHARED } from './programmeShared';

export const KN_NAV_LINKS = [
  { label: 'ಮುಖಪುಟ' },
  { label: 'ನಮ್ಮ ಬಗ್ಗೆ' },
  { label: 'ಕಾರ್ಯಕ್ರಮಗಳು' },
  { label: 'ಪ್ರಕಟಣೆಗಳು' },
  { label: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' },
  { label: 'ಪ್ರಾಸ್ಪೆಕ್ಟಸ್' },
  { label: 'ಶೈಕ್ಷಣಿಕ ಯೋಜನೆ' },
];

// `alt` and `logo` inherit from English — the logos are images of English
// wordmarks, so their alt text stays accurate as-is.
export const KN_ACCREDITATIONS = [
  {
    heading: 'AICTE ಅನುಮೋದಿತ',
    description: 'ಅಖಿಲ ಭಾರತ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಪರಿಷತ್ತು (AICTE)',
  },
  {
    heading: 'ಯುಜಿಸಿ ಅನುಮೋದಿತ',
    description: 'ವಿಶ್ವವಿದ್ಯಾಲಯ ಅನುದಾನ ಆಯೋಗ (UGC)',
  },
  {
    heading: 'A+ ಶ್ರೇಣಿಯ ಮಾನ್ಯತೆ',
    description: 'ರಾಷ್ಟ್ರೀಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಮಾನ್ಯತಾ ಪರಿಷತ್ತು (NAAC)',
  },
];

/** Shape must match EN_CONTENT in src/i18n/content.js exactly. */
export const KN_CONTENT = {
  ui: KN_UI_TEXT,
  about: KN_ABOUT,
  faqs: KN_FAQS,
  whyChoose: KN_WHY_CHOOSE_KSOU,
  howItWorks: KN_HOW_IT_WORKS_STEPS,
  ugCourses: KN_UG_COURSES,
  pgCourses: KN_PG_COURSES,
  navLinks: KN_NAV_LINKS,
  accreditations: KN_ACCREDITATIONS,
  programmes: KN_PROGRAMMES,
  programmesPage: KN_PROGRAMMES_PAGE,
  programmeShared: KN_PROGRAMME_SHARED,
};
