import { CounsellorCta } from '@/components/sections/CounsellorCta/CounsellorCta';
import { CounsellorVisual } from '@/components/sections/CounsellorCta/CounsellorVisual';
import { Footer } from './Footer/Footer';

/**
 * The Counsellor CTA and Footer share one ice-blue background and one
 * positioning context so the counsellor cutout can overlap both — poking
 * above the CTA's own top edge and extending down toward the footer —
 * without a hard color seam between the two.
 */
export function ClosingSection() {
  return (
    <div className="relative overflow-x-hidden bg-ice">
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <CounsellorCta />
        <CounsellorVisual />
      </div>

      <Footer />
    </div>
  );
}
