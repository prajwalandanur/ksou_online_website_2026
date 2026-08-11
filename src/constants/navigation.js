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
  { label: 'Contact Us', href: '/contact' },
  { label: 'Prospectus', href: PROSPECTUS_URL, newTab: true },
  { label: 'Academic Planner', href: ACADEMIC_CALENDAR_URL, newTab: true },
];

export const LMS_LOGIN_URL = '/lms-login';

export const APPLY_NOW_URL = '/apply';

export const CONTACT_NUMBERS = [
  { label: '+91 80 1234 5678', href: 'tel:+918012345678' },
  { label: '+91 80 2345 6789', href: 'tel:+918023456789' },
  { label: '+91 80 3456 7890', href: 'tel:+918034567890' },
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
];
