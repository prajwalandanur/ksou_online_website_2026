import { useState } from 'react';
import { Menu } from 'lucide-react';
import { LMS_LOGIN_URL } from '@/constants/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { AnnouncementTicker } from '@/components/layout/AnnouncementTicker/AnnouncementTicker';
import { TopBar } from './TopBar';
import { DesktopNavLinks } from './DesktopNavLinks';
import { MobileMenu } from './MobileMenu';

const DESKTOP_QUERY = '(min-width: 1024px)';

function MenuButton({ isMenuOpen, onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open menu"
      aria-haspopup="dialog"
      aria-expanded={isMenuOpen}
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/**
 * Desktop (≥1024px) — unchanged. One floating rounded card holding all three
 * bands, and the card itself is the sticky element, so nothing ever moves
 * relative to anything else and the height is constant.
 */
function DesktopHeader({ isScrolled, isMenuOpen, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="px-8 xl:px-4 2xl:px-8">
        <div
          className={`mx-auto max-w-[84rem] overflow-hidden rounded-[26px] border border-border/70 bg-background/85 backdrop-blur-xl transition-shadow duration-500 ease-out ${
            isScrolled ? 'shadow-card-scrolled' : 'shadow-card-rest'
          }`}
        >
          <TopBar />

          <div className="flex items-center justify-between gap-6 px-6 py-4 xl:gap-4 2xl:px-7">
            <Logo />
            <DesktopNavLinks />

            <div className="flex items-center gap-3">
              <Button to={LMS_LOGIN_URL} withArrow className="hidden xl:inline-flex">
                LMS Login
              </Button>
              <MenuButton
                isMenuOpen={isMenuOpen}
                onOpen={onOpenMenu}
                className="h-10 w-10 xl:hidden"
              />
            </div>
          </div>

          <AnnouncementTicker />
        </div>
      </div>
    </header>
  );
}

/**
 * Mobile / small tablet (<1024px) — three siblings, only the middle one
 * sticky.
 *
 * This returns a **fragment on purpose**. `position: sticky` is bounded by
 * the sticky element's parent, so a nav row wrapped inside a 142px-tall
 * header card unsticks the instant that card scrolls past — which is exactly
 * what happened on the first attempt. Returning a fragment makes these three
 * direct children of the unstyled `#root`, so the nav's containing block is
 * the whole document and it stays pinned for the entire page.
 *
 * The utility bar and ticker are ordinary flow content, so they scroll away
 * on the way down and come back at the top with no JS, no height animation
 * and no threshold. **No element ever changes size**, which is why there is
 * nothing left to flicker: the previous implementation collapsed bands on a
 * `scrollY > 24` boolean, and because a sticky element reserves its own flow
 * space, each collapse shortened the document and shoved the page — which
 * could re-cross the threshold and oscillate.
 *
 * `useScrolled` drives only the pinned row's shadow, a paint-only property
 * that cannot cause layout.
 */
function MobileHeader({ isScrolled, isMenuOpen, onOpenMenu }) {
  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-50 border-b border-border/70 bg-background transition-shadow duration-300 ease-out ${
          isScrolled ? 'shadow-[0_6px_18px_-10px_rgba(17,17,17,0.32)]' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
          <Logo />

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* A compact sibling of the desktop button rather than the same
                button with responsive padding — at this size it is a
                different shape, and the label must never wrap. */}
            <Button
              to={LMS_LOGIN_URL}
              withArrow
              className="gap-1 px-2.5 py-1.5 text-[12px] sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-[13.5px]"
            >
              LMS Login
            </Button>

            <MenuButton
              isMenuOpen={isMenuOpen}
              onOpen={onOpenMenu}
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
          </div>
        </div>
      </header>

      <AnnouncementTicker />
    </>
  );
}

/**
 * Exactly one of the two headers is mounted at a time — chosen by
 * `matchMedia`, not by CSS `hidden` — so the ticker's marquee never runs on
 * an invisible duplicate and there is only ever one of each landmark in the
 * accessibility tree.
 */
export function Navbar() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const isScrolled = useScrolled(24);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const shared = {
    isScrolled,
    isMenuOpen,
    onOpenMenu: () => setIsMenuOpen(true),
  };

  return (
    <>
      {isDesktop ? <DesktopHeader {...shared} /> : <MobileHeader {...shared} />}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
