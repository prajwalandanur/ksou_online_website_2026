import { Link, useLocation } from 'react-router-dom';
import crest from '@/assets/ksou-crest.jpeg';
import wordmark from '@/assets/ksou-title.webp';
import { useContent } from '@/i18n/content';
import { useLocalizedPath } from '@/i18n/useLanguage';

export function Logo({ className = '' }) {
  const { ui } = useContent();
  // The crest is on every page, so an un-localised "/" here is a language
  // exit on every route in the Kannada tree.
  const to = useLocalizedPath();
  const { pathname } = useLocation();

  const home = to('/');

  /**
   * Clicking the logo while already on the homepage scrolls back to the hero
   * instead of navigating.
   *
   * Router navigation to the path you are already on is a no-op *and*
   * `ScrollToTop` is keyed on `pathname`, so its effect never re-runs — the
   * click would otherwise do nothing at all from halfway down the page.
   * Preventing the default and scrolling by hand also avoids a pointless
   * re-render of the whole route.
   *
   * From any other page this handler does nothing and the <Link> navigates
   * normally, with `ScrollToTop` landing the new route at the top as usual.
   */
  const onClick = (event) => {
    if (pathname !== home) return;

    event.preventDefault();
    // Scripted scroll, so reduced motion has to be checked here —
    // <MotionConfig reducedMotion="user"> only covers Framer Motion.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <Link
      to={home}
      onClick={onClick}
      aria-label={ui.nav.logo}
      /* `min-w-0`, and deliberately no `shrink-0`: that pairing is what lets
         the wordmark below scale itself down at 320px instead of pushing the
         nav row into horizontal overflow. */
      className={`flex min-w-0 items-center gap-1.5 sm:gap-3 lg:gap-3.5 ${className}`}
    >
      {/* Both images are decorative here: the <Link> carries the accessible
          name via aria-label, so alt text on either would be announced twice
          (or, worse, override the label). */}
      <img
        src={crest}
        alt=""
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
      />

      {/* The supplied bilingual wordmark, now shown at *every* width — it used
          to be hidden below `sm` in favour of a "KSOU Online" text lockup, and
          the request was for the university title beside the crest on mobile
          too, in both the header and the footer.

          It is 536x102 (5.25:1), so height drives width, and width is the
          binding constraint in the nav row. Room for it on a phone came from
          shrinking the two header CTAs — `size="nav"` in buttonClasses.js —
          not from dropping one of them; both stay visible at every width.

          `max-w-full` + `min-w-0` + `object-contain` are the safety net below
          390px, where h-7 is wider than the leftover space: the box narrows
          and the artwork scales down inside it, letterboxed rather than
          stretched (126px at 360, 86px at 320). From 390px up it renders at
          its full h-7.

          h-7 rather than h-8 through `xl` buys back 21px in the 1280-1535
          band, where the row is tightest with seven links and two CTAs; 2xl
          restores the larger mark. */}
      <img
        src={wordmark}
        alt=""
        width={536}
        height={102}
        className="h-7 w-auto min-w-0 max-w-full shrink object-contain 2xl:h-8"
      />
    </Link>
  );
}
