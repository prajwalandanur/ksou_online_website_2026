import { useLocation } from 'react-router-dom';
import { stripLanguage } from '@/i18n/language';
import { CounsellorCta } from '@/components/sections/CounsellorCta/CounsellorCta';
import { Footer } from './Footer/Footer';

/**
 * Routes that are themselves a "talk to us" surface, where the counsellor
 * block would be the same call to action twice on one screen.
 *
 * Compared against the language-stripped pathname so a future `/kn/contact`
 * matches without needing a second entry.
 */
const NO_COUNSELLOR_CTA = new Set(['/contact']);

/**
 * The Counsellor CTA and Footer share one ice-blue background so the page
 * ends as a single block rather than two stacked sections. The counsellor
 * (z-30) sits in front of the footer card (z-20), which in turn sits in
 * front of the CTA's decorative arc (z-auto) — so the arc's overhang hides
 * behind the card while she stays fully visible, her bottom edge meeting
 * the card's top edge exactly.
 *
 * Deliberately no `overflow-x-hidden` here: per the CSS Overflow spec a
 * non-`visible` value on one axis forces the other axis to compute to
 * `auto`, which would clip exactly the vertical overflow this layout
 * depends on. Nothing in this section overflows horizontally — the
 * counsellor and the decorative arc are both bounded to the container's
 * right edge — and that is verified by the mobile QA overflow check.
 */
export function ClosingSection() {
  const showCounsellorCta = !NO_COUNSELLOR_CTA.has(stripLanguage(useLocation().pathname));

  return (
    <div className="relative bg-ice">
      {showCounsellorCta && (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <CounsellorCta />
        </div>
      )}

      <Footer />
    </div>
  );
}
