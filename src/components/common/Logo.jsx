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
      className={`flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-3.5 ${className}`}
    >
      {/* Both images are decorative here: the <Link> carries the accessible
          name via aria-label, so alt text on either would be announced twice
          (or, worse, override the label). */}
      <img
        src={crest}
        alt=""
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
      />

      {/* Phone-width wordmark: live text, not the image.
          The bilingual image is 5.25:1 with two stacked lines, so at a height
          that fits a mobile row each line renders around 9px — present but
          not readable, which is what "the title is cropped / not visible"
          was describing. Text at 15px is both legible and ~40px narrower,
          and 40px is the difference between fitting and not at 320px.
          This is the same "KSOU Online" lockup the header used before the
          image landed, kept for exactly this breakpoint. */}
      <span className="whitespace-nowrap font-brand text-[15px] leading-none text-foreground sm:hidden">
        KSOU <span className="text-primary">Online</span>
      </span>
      {/* The supplied bilingual wordmark. It is 536x102 (5.25:1), so height
          drives width — and width is the constraint that matters, because the
          nav row now carries seven links and *two* CTAs.

          Hidden below `sm`, where the text lockup above takes its place: at
          320-414px the crest plus both CTAs plus the hamburger need every
          pixel, and this image is both wider and less legible than the text
          at that size.

          `xl:h-7` rather than h-8 buys back 21px in the 1280-1535 band, which
          is where the row is tightest; 2xl restores the larger mark. */}
      <img
        src={wordmark}
        alt=""
        width={536}
        height={102}
        className="hidden h-6 w-auto shrink-0 object-contain sm:block sm:h-7 xl:h-7 2xl:h-8"
      />
    </Link>
  );
}
