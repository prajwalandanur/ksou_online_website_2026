import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { ClosingSection } from '@/components/layout/ClosingSection';
import { FloatingActions } from '@/components/common/FloatingActions';

export function MainLayout() {
  return (
    <>
      {/* The announcement ticker is the third band inside <Navbar />, not a
          sibling here — the whole header has to be one sticky element or the
          ticker scrolls independently and slides behind the navbar card. */}
      <Navbar />
      <Outlet />
      <ClosingSection />
      {/* Rendered here, once, so the WhatsApp and back-to-top controls exist
          on every route — including the PageComingSoon placeholders and the
          404 — without any page opting in. */}
      <FloatingActions />
    </>
  );
}
