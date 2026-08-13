import { UI_TEXT } from '@/constants/ui';
import { FAQS } from '@/constants/faq';
import { WHY_CHOOSE_KSOU } from '@/constants/whyChooseKsou';
import { HOW_IT_WORKS_STEPS } from '@/constants/howItWorks';
import { UG_COURSES, PG_COURSES } from '@/constants/courses';
import { NAV_LINKS } from '@/constants/navigation';
import { ACCREDITATIONS } from '@/constants/accreditation';
import { PROGRAMMES } from '@/constants/programmes';
import { PROGRAMMES_PAGE } from '@/constants/programmesPage';
import { PROGRAMME_SHARED } from '@/constants/programmes/shared';
import { KN_CONTENT } from '@/locales/kn';
import { mergeContent } from './mergeContent';
import { useLanguage } from './useLanguage';
import { DEFAULT_LANGUAGE, KANNADA } from './language';

/**
 * The one place English content is paired with its Kannada counterpart.
 *
 * Components read everything through `useContent()` rather than importing
 * the constants directly, so a section is translated by adding a key here —
 * not by touching the component again.
 */
const EN_CONTENT = {
  ui: UI_TEXT,
  faqs: FAQS,
  whyChoose: WHY_CHOOSE_KSOU,
  howItWorks: HOW_IT_WORKS_STEPS,
  ugCourses: UG_COURSES,
  pgCourses: PG_COURSES,
  navLinks: NAV_LINKS,
  accreditations: ACCREDITATIONS,
  programmes: PROGRAMMES,
  programmesPage: PROGRAMMES_PAGE,
  programmeShared: PROGRAMME_SHARED,
};

/**
 * Merged once at module load, not per render. The result is a stable object
 * identity, which matters: these values flow into `useDocumentMeta`'s
 * dependency array and into memoised section components, and re-merging on
 * every render would re-fire both continuously.
 */
const BY_LANGUAGE = {
  [DEFAULT_LANGUAGE]: EN_CONTENT,
  [KANNADA]: mergeContent(EN_CONTENT, KN_CONTENT),
};

/** Content for the current language, with per-key fallback to English. */
export function useContent() {
  return BY_LANGUAGE[useLanguage()] ?? EN_CONTENT;
}
