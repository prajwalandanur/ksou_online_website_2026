import { withBase } from './basePath';
import { ACADEMIC_CALENDAR_URL, PROSPECTUS_URL } from './navigation';

// Real notices, served straight from public/ so Vite doesn't hash or inline
// them. Same rule as the question papers: NO `download` attribute on the
// anchors that use these, or the browser saves the file instead of opening
// it in its built-in PDF viewer. Filenames were slugified on the way in —
// the originals had spaces and parentheses, which need URL-encoding.
export const ADMISSION_NOTIFICATION_URL =
  withBase('/documents/announcements/admission-notification-2026-27-july.pdf');
export const ABC_DEB_ID_PROCESS_URL =
  withBase('/documents/announcements/abc-deb-id-creation-process.pdf');
export const RENEWAL_NOTIFICATION_URL =
  withBase('/documents/announcements/renewal-notification-aug-2026.pdf');

/**
 * University notifications — the single source for both the slim ticker
 * below the navbar and the full /announcements page. Replacing or updating
 * a notice is a change to this file only; no component needs touching.
 *
 * ⚠ Five entries point at a real document: the admission notification, the
 * ABC/DEB ID process and the renewal notification (supplied 2026-08-12, in
 * public/documents/announcements/), plus the academic calendar and the
 * prospectus. The remaining four are PLACEHOLDERS — their titles come from
 * the source brief and their `date` values are illustrative, not real
 * published dates. Entries with no `href` render an honest "Details coming
 * soon" action rather than a dead or invented link.
 *
 * The three supplied PDFs are scanner output with no text layer, so their
 * dates could not be read off the notice itself. Two carry a trustworthy
 * scan timestamp in their PDF metadata (13 Jul 2026 and 10 Aug 2026, the
 * latter matching its filename) and use it. The ABC/DEB guide's only
 * timestamp is a 2025 iLovePDF processing date, which says nothing about
 * when the process was published, so that entry has NO date rather than a
 * misleading one — `date` is optional and the card omits the line.
 *
 * Category vs. importance are deliberately separate axes: `category` says
 * what kind of notice it is, `isImportant` is a prominence flag that can sit
 * on a notice of any category (an urgent Admissions notice is still
 * Admissions). The page's "Important" filter reads the flag, not a category.
 */

export const ANNOUNCEMENT_CATEGORIES = {
  admissions: { id: 'admissions', label: 'Admissions' },
  examination: { id: 'examination', label: 'Examination' },
  academic: { id: 'academic', label: 'Academic' },
  general: { id: 'general', label: 'General' },
};

const ANNOUNCEMENT_ENTRIES = [
  {
    id: 'admissions-2026-27-july-cycle',
    category: 'admissions',
    title: 'Online Admissions Notification for 2026–27 July Cycle',
    date: '2026-07-13',
    description:
      'Important information regarding the upcoming admission cycle, in Kannada and English.',
    isImportant: true,
    href: ADMISSION_NOTIFICATION_URL,
    isDocument: true,
    actionLabel: 'View PDF',
    inTicker: true,
  },
  {
    id: 'academic-calendar-2025-26',
    category: 'academic',
    title: 'Academic Calendar 2025–26 July Cycle',
    date: '2026-08-05',
    description: 'View the latest academic schedule and important dates.',
    isImportant: false,
    href: ACADEMIC_CALENDAR_URL,
    isDocument: true,
    actionLabel: 'View Calendar',
    inTicker: true,
  },
  {
    id: 'examination-notification',
    category: 'examination',
    title: 'Examination Notification',
    date: '2026-07-28',
    description: 'Schedule and instructions for the upcoming term-end examinations.',
    isImportant: false,
    href: null,
    inTicker: true,
  },
  {
    id: 'abc-deb-id-creation',
    category: 'general',
    title: 'ABC ID / DEB ID Creation Process',
    // No date: see the note at the top of this file — the document carries
    // no published date and inventing one would misrepresent it.
    description: 'Step-by-step guide to creating the IDs every online learner needs.',
    isImportant: true,
    href: ABC_DEB_ID_PROCESS_URL,
    isDocument: true,
    actionLabel: 'View PDF',
    inTicker: true,
  },
  {
    id: 'renewal-notification',
    category: 'admissions',
    title: 'Renewal Notification',
    date: '2026-08-10',
    description: 'Guidance for continuing learners renewing their registration.',
    isImportant: false,
    href: RENEWAL_NOTIFICATION_URL,
    isDocument: true,
    actionLabel: 'View PDF',
    inTicker: true,
  },
  {
    id: 'important-admission-update',
    category: 'admissions',
    title: 'Important Admission Update',
    date: '2026-07-02',
    description: 'Revised information for applicants to the current cycle.',
    isImportant: true,
    href: null,
    inTicker: false,
  },
  {
    id: 'online-programmes-prospectus',
    category: 'academic',
    title: 'Online Programmes Prospectus',
    date: '2026-06-24',
    description: 'Full programme details, eligibility, fees and curriculum in one document.',
    isImportant: false,
    href: PROSPECTUS_URL,
    isDocument: true,
    actionLabel: 'View PDF',
    inTicker: false,
  },
  {
    id: 'examination-fee-payment',
    category: 'examination',
    title: 'Examination Fee Payment Window',
    date: '2026-06-11',
    description: 'Payment instructions and the window for the current examination cycle.',
    isImportant: false,
    href: null,
    inTicker: false,
  },
  {
    id: 'lms-access-guidance',
    category: 'general',
    title: 'LMS Access Guidance for New Learners',
    date: '2026-05-30',
    description: 'How to sign in and find your study material after admission.',
    isImportant: false,
    href: null,
    inTicker: false,
  },
];

/**
 * Newest first, undated entries last. Sorting here rather than relying on
 * the array's authored order means editing a `date` can't leave the notice
 * board reading out of sequence. Prominence is a separate concern —
 * `isImportant` draws the eye with its badge, so nothing needs pinning to
 * the top. ISO dates compare correctly as plain strings, no Date needed.
 */
export const ANNOUNCEMENTS = [...ANNOUNCEMENT_ENTRIES].sort((a, b) => {
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
});

/** §12 of the brief: the ticker is a quick notification layer, not the archive. */
export const TICKER_ANNOUNCEMENTS = ANNOUNCEMENTS.filter((item) => item.inTicker);

export const ANNOUNCEMENTS_URL = '/announcements';

/**
 * Where an announcement actually leads, and what its action should be called.
 *
 * Only entries with a real `href` link out; the rest resolve to the
 * announcements page (a real destination that lists the notice) rather than
 * a fabricated document URL. `isPlaceholder` lets the page render a disabled
 * "coming soon" action instead of linking /announcements to itself.
 */
export function announcementTarget(announcement) {
  if (announcement.href) {
    return {
      href: announcement.href,
      label: announcement.actionLabel ?? (announcement.isDocument ? 'View PDF' : 'View Details'),
      isDocument: Boolean(announcement.isDocument),
      isPlaceholder: false,
    };
  }

  return {
    href: ANNOUNCEMENTS_URL,
    label: 'View Details',
    isDocument: false,
    isPlaceholder: true,
  };
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats an ISO date as "12 Aug 2026" by string surgery rather than `new
 * Date()` — a bare "YYYY-MM-DD" parses as UTC midnight, which renders as the
 * previous day for anyone west of Greenwich.
 */
export function formatAnnouncementDate(iso) {
  const [year, month, day] = iso.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
