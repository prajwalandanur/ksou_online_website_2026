import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { ProgrammePage } from '@/pages/ProgrammePage';
import { BlogListingPage } from '@/pages/BlogListingPage';
import { BlogArticlePage } from '@/pages/BlogArticlePage';
import { PageComingSoon } from '@/pages/PageComingSoon';

// Nav destinations that have a real page below, so the placeholder map must
// not also register them — two routes on one path is ambiguous.
const REAL_PAGES = new Set(['/', '/about']);

const PLACEHOLDER_ROUTES = [
  // `newTab` links point at PDFs in public/, not routes — registering them
  // here would create a bogus /documents/....pdf route.
  ...NAV_LINKS.filter((link) => !REAL_PAGES.has(link.href) && !link.newTab),
  { label: 'LMS Login', href: LMS_LOGIN_URL },
  { label: 'Apply Now', href: APPLY_NOW_URL },
  { label: 'Student Support', href: '/student-support' },
  { label: 'Admissions', href: '/admissions' },
];

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
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
