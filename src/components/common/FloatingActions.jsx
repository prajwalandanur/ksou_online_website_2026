import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { useContent } from '@/i18n/content';
import { WHATSAPP } from '@/constants/contact';
import { WhatsappIcon } from '@/components/sections/Contact/WhatsappIcon';

/**
 * Show the back-to-top control only once the user is meaningfully down the
 * page. 400px is roughly one viewport on a phone — below that the top of the
 * page is still a flick away and the button is just clutter.
 */
const BACK_TO_TOP_THRESHOLD = 400;

/**
 * The two persistent floating controls, rendered once by `MainLayout` so they
 * appear on every route without any page opting in.
 *
 * **They are deliberately at different anchors, not stacked.** WhatsApp is
 * pinned to the vertical middle and back-to-top to the bottom, which is what
 * the brief asked for and also what guarantees they can never overlap: the
 * only way to collide would be a viewport short enough for the centre and the
 * bottom inset to meet, which needs roughly 180px of height.
 *
 * Both sit at `right-4` on phones rather than flush to the edge, so neither
 * is clipped by a rounded display corner or a browser's gesture area.
 *
 * z-40 puts them above page content but **below the navbar (z-50) and the
 * mobile menu (z-60)** — a chat bubble floating over an open nav drawer would
 * be both ugly and a tap target the user didn't ask for.
 */
export function FloatingActions() {
  const { ui } = useContent();
  const showBackToTop = useScrolled(BACK_TO_TOP_THRESHOLD);

  const scrollToTop = () => {
    // Honour reduced motion explicitly: this is a scripted scroll, not a
    // Framer Motion animation, so <MotionConfig reducedMotion="user"> does
    // not cover it.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* A pill flush to the viewport's right edge, not a detached circle:
          `right-0` with only the left corners rounded, so it reads as one
          tab anchored to the edge. The icon and "Chat" sit in a single <a>,
          so the whole control is one target rather than two.

          `-translate-y-1/2` has to be repeated in the hover class — a hover
          `transform` replaces the resting one outright rather than adding to
          it, so omitting it makes the pill jump by half its height. */}
      <a
        href={WHATSAPP.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui.floating.whatsapp}
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 cursor-pointer items-center gap-1.5 rounded-l-full bg-whatsapp py-2 pl-3 pr-2.5 text-[12px] font-semibold tracking-tight text-white shadow-[0_4px_10px_-2px_rgba(17,17,17,0.2),0_12px_28px_-10px_rgba(37,211,102,0.65)] transition-all duration-300 ease-out hover:-translate-y-1/2 hover:bg-whatsapp-hover hover:pl-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:gap-2 sm:py-2.5 sm:pl-4 sm:pr-3.5 sm:text-[13.5px]"
      >
        <WhatsappIcon className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5" />
        {ui.floating.chat}
      </a>

      {/* Kept mounted and faded/lifted out rather than unmounted, so it can
          animate in both directions. `pointer-events-none` while hidden stops
          it swallowing clicks on whatever is underneath. */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={ui.floating.backToTop}
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        className={`fixed bottom-5 right-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-navy shadow-[0_1px_2px_rgba(17,17,17,0.06),0_10px_24px_-10px_rgba(17,17,17,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 ${
          showBackToTop ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
}
