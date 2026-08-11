import { CounsellorCta } from '@/components/sections/CounsellorCta/CounsellorCta';
import { Footer } from './Footer/Footer';

/**
 * The Counsellor CTA and Footer share one ice-blue background so the page
 * ends as a single block rather than two stacked sections. The CTA sits at
 * z-10 and the footer at z-20, so the footer card paints *over* the
 * counsellor cutout hanging below the CTA — hiding the photo's hard bottom
 * crop and making her read as standing behind the footer.
 *
 * Deliberately no `overflow-x-hidden` here: per the CSS Overflow spec a
 * non-`visible` value on one axis forces the other axis to compute to
 * `auto`, which would clip exactly the vertical overflow this layout
 * depends on. Nothing in this section overflows horizontally — the
 * counsellor and the decorative arc are both bounded to the container's
 * right edge — and that is verified by the mobile QA overflow check.
 */
export function ClosingSection() {
  return (
    <div className="relative bg-ice">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <CounsellorCta />
      </div>

      <Footer />
    </div>
  );
}
