import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from '@/i18n/useLanguage';
import {
  NAV_LINKS,
  LMS_LOGIN_URL,
  APPLY_NOW_URL,
  PROSPECTUS_URL,
  ACADEMIC_CALENDAR_URL,
} from '@/constants/navigation';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { FileRedirect } from '@/components/common/FileRedirect';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { AboutPage } from '@/pages/AboutPage';
import { AnnouncementsPage } from '@/pages/AnnouncementsPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProgrammePage } from '@/pages/ProgrammePage';
import { ProgrammesPage } from '@/pages/ProgrammesPage';
import { BlogListingPage } from '@/pages/BlogListingPage';
import { BlogArticlePage } from '@/pages/BlogArticlePage';
import { PageComingSoon } from '@/pages/PageComingSoon';

// Nav destinations that have a real page below, so the placeholder map must
// not also register them — two routes on one path is ambiguous.
const REAL_PAGES = new Set(['/', '/about', '/announcements', '/contact', '/programmes']);

const PLACEHOLDER_ROUTES = [
  // `newTab` links point at PDFs in public/, not routes — registering them
  // here would create a bogus /documents/....pdf route.
  ...NAV_LINKS.filter((link) => !REAL_PAGES.has(link.href) && !link.newTab),
  { label: 'LMS Login', href: LMS_LOGIN_URL },
  { label: 'Apply Now', href: APPLY_NOW_URL },
  { label: 'Student Support', href: '/student-support' },
  { label: 'Admissions', href: '/admissions' },
];

/**
 * Keeps `<html lang>` in step with the URL.
 *
 * It drives two things that are easy to forget are connected: the Kannada
 * font swap in index.css keys off `html[lang="kn"]`, and screen readers pick
 * pronunciation from the same attribute. Rendered inside BrowserRouter
 * because it reads the current location.
 */
function LanguageSync() {
  const language = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return null;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageSync />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Kannada tree. Only the pages that are actually translated get a
              /kn URL — see KANNADA_ROUTE_PATTERNS. Parking an untranslated
              English page behind a Kannada URL would create a duplicate that
              hreflang then asserts is a translation, which is worse for
              search than simply having no Kannada URL for that page.
              KANNADA_ROUTE_PATTERNS and these two routes must stay in step:
              the patterns decide which links get localised, these decide
              what actually renders. */}
          <Route path="/kn" element={<Home />} />
          <Route path="/kn/programmes" element={<ProgrammesPage />} />
          <Route path="/kn/programmes/:slug" element={<ProgrammePage />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Order is irrelevant to React Router v7 (it ranks routes by
              specificity, not source order), but the static path is listed
              first for readability. */}
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:slug" element={<ProgrammePage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/blogs/:slug" element={<BlogArticlePage />} />
          {PLACEHOLDER_ROUTES.map((route) => (
            <Route
              key={route.href}
              path={route.href}
              element={<PageComingSoon title={route.label} />}
            />
          ))}

          {/* Retired page routes — these are now the PDFs themselves. Kept
              so old bookmarks and indexed links still land somewhere. */}
          <Route path="/prospectus" element={<FileRedirect to={PROSPECTUS_URL} />} />
          <Route
            path="/academic-planner"
            element={<FileRedirect to={ACADEMIC_CALENDAR_URL} />}
          />

          {/* Without this, an unmatched URL matches no child route and the
              layout renders nothing at all — a blank white page with no nav
              to escape from. */}
          <Route path="*" element={<PageComingSoon title="Page not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
