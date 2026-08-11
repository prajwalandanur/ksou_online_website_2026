import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { LMS_LOGIN_URL } from '@/constants/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { TopBar } from './TopBar';
import { DesktopNavLinks } from './DesktopNavLinks';
import { MobileMenu } from './MobileMenu';

const EASE = [0.22, 1, 0.36, 1];

export function Navbar() {
  const isScrolled = useScrolled(24);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={false}
        animate={{ paddingTop: isScrolled ? 10 : 20 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-border/70 bg-background/85 backdrop-blur-xl transition-shadow duration-500 ease-out ${
            isScrolled ? 'shadow-card-scrolled' : 'shadow-card-rest'
          }`}
        >
          <motion.div
            initial={false}
            animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <TopBar />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ paddingTop: isScrolled ? 12 : 16, paddingBottom: isScrolled ? 12 : 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="px-6 lg:px-8"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
              <Logo />

              <DesktopNavLinks />

              <div className="flex items-center gap-3">
                <Button to={LMS_LOGIN_URL} withArrow className="hidden lg:inline-flex">
                  LMS Login
                </Button>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  aria-haspopup="dialog"
                  aria-expanded={isMenuOpen}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
