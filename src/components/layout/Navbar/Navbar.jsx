import { useState } from 'react';
import { Menu } from 'lucide-react';
import { APPLY_NOW_URL, LMS_LOGIN_URL } from '@/constants/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useContent } from '@/i18n/content';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { AnnouncementTicker } from '@/components/layout/AnnouncementTicker/AnnouncementTicker';
import { HEADER_BAND_CARD, HEADER_BAND_CONTAINER } from '@/components/layout/headerBands';
import { TopBar } from './TopBar';
import { DesktopNavLinks } from './DesktopNavLinks';
import { MobileMenu } from './MobileMenu';

/**
 * One header for every breakpoint.
 *
 * **This replaced a pair of headers swapped by `useMediaQuery`** (a
 * `DesktopHeader` whose whole three-band card was sticky, and a `MobileHeader`
 * that stuck only the nav row). They were merged because the brief asked for
 * the mobile behaviour everywhere — utility bar and ticker scrolling away,
 * only the nav row pinned — at which point the two structures were identical
 * and the swap bought nothing. Merging also removes the mount/unmount at
 * 1024px that the brief specifically asked to stop doing.
 *
 * **The fragment is load-bearing.** `position: sticky` is bounded by its
 * parent, so wrapping these three in a container would unstick the nav row
 * the moment that container scrolled past — that was an early failed attempt.
 * As direct children of the unstyled `#root`, the nav's containing block is
 * the document and it stays pinned for the whole page.
 *
 * **Nothing animates on scroll and no element ever changes size.** An earlier
 * version collapsed bands on a `scrollY > 24` boolean; because a sticky
 * element reserves its own flow space, each collapse shortened the document
 * and shoved the page, which could re-cross the threshold and oscillate.
 * `useScrolled` survives for exactly one thing — swapping a shadow, which
 * costs no layout. **Do not reintroduce a scroll-driven height, padding or
 * collapse.**
 *
 * Two constraints the sticky row depends on:
 *  - it must be fully opaque (`bg-background`), or the ticker shows through
 *    as it scrolls underneath;
 *  - no ancestor may have a non-visible `overflow`, which kills sticky. The
 *    floating card is a *descendant* of the sticky strip, not an ancestor of
 *    it, so it may carry `overflow-hidden` safely — but nothing above
 *    <header> may.
 */
export function Navbar() {
  const { ui } = useContent();
  const isScrolled = useScrolled(24);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Ordinary flow content: scrolls away going down, returns at the top. */}
      <TopBar />

      {/*
        The sticky element is this full-bleed strip, and it is **opaque**
        (`bg-background`) even though the visible navbar inside it is an inset
        floating card from `lg` up.

        That opacity is the whole trick. The previous floating card was itself
        the sticky element with `pt-4`, so page content scrolled through the
        16px above it and past its rounded corners — read as "a gap / thin
        line / opening above the navbar". Painting the strip instead means the
        card can float with real padding on every side while nothing ever
        shows through around it.

        Below `lg` the strip *is* the navbar: a phone has no width to spend on
        gutters, so the card styling starts at `lg` and a plain bottom hairline
        does the job under it.
      */}
      <header
        className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ease-out max-lg:border-b max-lg:border-border/70 lg:py-3 ${
          isScrolled
            ? 'shadow-[0_6px_18px_-10px_rgba(17,17,17,0.32)] lg:shadow-none'
            : 'lg:shadow-none'
        }`}
      >
        <div className={HEADER_BAND_CONTAINER}>
          {/* The card. Its own border + shadow are what separate it from the
              white strip behind it, so both must stay. The shadow lifts on
              scroll — a paint-only change, never a size one.

              This band is the only one of the three that carries a shadow:
              it is the one that stays pinned, and the lift is what tells the
              reader the other two have slid underneath it. */}
          <div
            className={`flex items-center justify-between gap-1.5 bg-background py-2.5 sm:gap-3 lg:px-6 lg:py-2 lg:transition-shadow lg:duration-300 lg:ease-out xl:gap-2 xl:px-5 2xl:gap-4 2xl:px-6 ${HEADER_BAND_CARD} ${
              isScrolled ? 'lg:shadow-card-scrolled' : 'lg:shadow-card-rest'
            }`}
          >
            <Logo />
            <DesktopNavLinks />

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-2.5">
              {/* Both CTAs stay visible at every width, including 320px. They
                shrink rather than hide — `size="nav"` is what actually makes
                that happen (a `className` padding override does not; see
                SIZE_CLASSES). The arrows drop below `sm` on top of that: they
                were 40px of pure decoration in the tightest row on the site. */}
              <Button
                to={APPLY_NOW_URL}
                variant="gold"
                size="nav"
                withArrow
                className="gap-1 [&>svg]:hidden sm:gap-1.5 sm:[&>svg]:block"
              >
                {/* Two spans, not a conditional string — swapping the text in
                  JS would reflow the row at the breakpoint. */}
                <span className="sm:hidden">{ui.nav.applyNowLoginShort}</span>
                <span className="hidden sm:inline">{ui.nav.applyNowLogin}</span>
              </Button>

              {/* href, not `to` — the LMS is an external site, so this has
                to render a real <a>; see LMS_LOGIN_URL. */}
              <Button
                href={LMS_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.nav.lmsLoginAria}
                size="nav"
                withArrow
                className="gap-1 [&>svg]:hidden sm:gap-1.5 sm:[&>svg]:block"
              >
                {ui.nav.lmsLogin}
              </Button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label={ui.nav.openMenu}
                aria-haspopup="dialog"
                aria-expanded={isMenuOpen}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-10 sm:w-10 xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Also ordinary flow, so it scrolls away under the pinned nav row
          rather than staying stuck to it. */}
      <AnnouncementTicker />

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
