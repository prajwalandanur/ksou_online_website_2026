import { useState } from 'react';
import { Menu } from 'lucide-react';
import { LMS_LOGIN_URL } from '@/constants/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { AnnouncementTicker } from '@/components/layout/AnnouncementTicker/AnnouncementTicker';
import { TopBar } from './TopBar';
import { DesktopNavLinks } from './DesktopNavLinks';
import { MobileMenu } from './MobileMenu';

/**
 * The whole header — utility bar, main nav row and announcement ticker — is
 * ONE sticky element wrapping three static bands inside a single rounded
 * card. Nothing inside it is independently sticky or fixed.
 *
 * This replaced an arrangement where the navbar was sticky and the ticker
 * was a separate block in normal flow below it. That produced the flicker
 * the redesign brief describes, from two separate causes:
 *
 *  1. The ticker was not part of the sticky element, so on scroll it slid
 *     up *behind* the navbar's semi-transparent frosted card instead of
 *     staying under it.
 *  2. The card animated its own height on scroll — the utility row
 *     collapsed to 0 and the paddings shrank, ~60px in total, keyed off a
 *     single `scrollY > 24` boolean. Scrolling anywhere near that threshold
 *     flipped it back and forth, and because a sticky element reserves its
 *     own flow space, every flip shoved the whole page up or down.
 *
 * Both are gone. The header's height is now a constant at any given
 * breakpoint, so it reserves the right space on first paint and never
 * changes it. `isScrolled` survives for one purpose only — swapping the
 * resting shadow for the lifted one — because a shadow costs no layout.
 * Do not reintroduce a scroll-driven height, padding or collapse here.
 */
export function Navbar() {
  const isScrolled = useScrolled(24);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-4">
      {/* Gutter narrows at xl and widens again at 2xl: 1280–1535 is the band
          where the seven-link row is tightest, and the card is capped at
          84rem from ~1400px up anyway, so a wider gutter there costs nothing.
          Without this the row has 0px of slack at exactly 1280. */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-8">
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
              {/* The inline nav switches to the drawer at xl. Seven links
                  plus the logo and this button need ~1.17k px of row; a
                  sub-xl row cannot supply that without shrinking the type,
                  which the brief rules out. */}
              <Button to={LMS_LOGIN_URL} withArrow className="hidden xl:inline-flex">
                LMS Login
              </Button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={isMenuOpen}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Third band of the same card, so it is carried by the header's
              sticky positioning rather than scrolling independently. */}
          <AnnouncementTicker />
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
