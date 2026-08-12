import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { ClosingSection } from '@/components/layout/ClosingSection';

export function MainLayout() {
  return (
    <>
      {/* The announcement ticker is the third band inside <Navbar />, not a
          sibling here — the whole header has to be one sticky element or the
          ticker scrolls independently and slides behind the navbar card. */}
      <Navbar />
      <Outlet />
      <ClosingSection />
    </>
  );
}
