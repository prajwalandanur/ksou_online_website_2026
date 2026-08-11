import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NAV_LINKS, LMS_LOGIN_URL, APPLY_NOW_URL } from '@/constants/navigation';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { ProgrammePage } from '@/pages/ProgrammePage';
import { BlogListingPage } from '@/pages/BlogListingPage';
import { BlogArticlePage } from '@/pages/BlogArticlePage';
import { PageComingSoon } from '@/pages/PageComingSoon';

const PLACEHOLDER_ROUTES = [
  ...NAV_LINKS.filter((link) => link.href !== '/'),
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
