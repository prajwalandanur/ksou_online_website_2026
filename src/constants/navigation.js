// Real PDFs served straight from public/documents/ (static, not bundled —
// they're multi-MB documents). Both open in a new tab in the browser's PDF
// viewer rather than downloading; see the note in CourseCard for why there
// must be no `download` attribute on the anchors that use these.
export const PROSPECTUS_URL = '/documents/ksou-online-prospectus.pdf';
export const ACADEMIC_CALENDAR_URL = '/documents/academic-calendar.pdf';

// `newTab: true` marks a link that points at a file rather than a route —
// it renders as a plain <a target="_blank">, and AppRoutes skips it when
// building placeholder routes (there is no /prospectus page to render).
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Prospectus', href: PROSPECTUS_URL, newTab: true },
  { label: 'Academic Planner', href: ACADEMIC_CALENDAR_URL, newTab: true },
];

export const LMS_LOGIN_URL = '/lms-login';

export const APPLY_NOW_URL = '/apply';

// The real admissions lines. `label` is the display form and `href` the
// dial-able one — they must stay in sync; the digits differing between the
// two is the bug this pairing exists to prevent.
//
// This is the single source of truth for admissions numbers: the utility
// bar, the mobile drawer, the footer's Get in Touch column and the /contact
// page all read it. Withdrawing +91 91411 81241 on 2026-08-13 therefore
// took one edit here and removed it from every surface at once — do not
// re-declare a number anywhere else.
export const CONTACT_NUMBERS = [
  { label: '+91 97407 40340', href: 'tel:+919740740340' },
  { label: '+91 81231 75590', href: 'tel:+918123175590' },
];

// `short` is the phone-width form. Fitting the toggle and the numbers on one
// utility row needs ~55px back from "English"; "ಕನ್ನಡ" is already short, so
// it is its own abbreviation rather than a transliteration.
export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'ಕನ್ನಡ' },
];
