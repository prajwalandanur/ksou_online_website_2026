import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { ClosingSection } from '@/components/layout/ClosingSection';
import { FloatingActions } from '@/components/common/FloatingActions';
import { EnquiryPopup } from '@/components/enquiry/EnquiryPopup';
import { captureUtmParameters } from '@/services/utm';

export function MainLayout() {
  /**
   * Campaign attribution is read once, here, on the landing URL.
   *
   * It has to happen at mount rather than at submission: a visitor arrives on
   * `/?utm_source=google&...`, browses for a few minutes and only then opens
   * the enquiry form, by which point React Router has replaced the URL and
   * the parameters are gone. Captured here they are held for the visit. The
   * call is a no-op when the URL carries no UTMs, and first touch wins, so
   * running it again on a later load cannot overwrite the real source.
   */
  useEffect(() => {
    captureUtmParameters();
  }, []);

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
      {/* Also mounted here, once, and for a stricter reason than the floating
          controls: this one owns a timer. Living above <Outlet /> is what
          keeps the 25s → 60s → 30s sequence attached to the visit rather than
          restarting on every client-side route change. */}
      <EnquiryPopup />
    </>
  );
}
