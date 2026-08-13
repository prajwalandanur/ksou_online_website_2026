import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, Phone } from 'lucide-react';
import { CONTACT_NUMBERS, LMS_LOGIN_URL } from '@/constants/navigation';
import { useContent } from '@/i18n/content';
import { useLocalizedPath } from '@/i18n/useLanguage';
import { fill } from '@/i18n/format';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { LanguageToggle } from './LanguageToggle';

const MOBILE_LINK_BASE =
  'block cursor-pointer rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function MobileMenu({ isOpen, onClose }) {
  const { ui, navLinks } = useContent();
  // Matches DesktopNavLinks — routes keep the visitor in their current
  // language, `newTab` entries are PDFs and stay exactly as authored.
  const to = useLocalizedPath();
  const closeButtonRef = useRef(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={ui.nav.siteNavigation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[60] flex flex-col bg-background xl:hidden"
        >
          <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={ui.nav.closeMenu}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.04, ease: 'easeOut' }}
                >
                  {link.newTab ? (
                    // A PDF, not a route — see DesktopNavLinks.
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      aria-label={fill(ui.common.pdfNewTab, { label: link.label })}
                      className={`${MOBILE_LINK_BASE} text-foreground hover:bg-muted`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={to(link.href)}
                      end={link.href === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${MOBILE_LINK_BASE} ${
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 border-t border-border/70 pt-6">
              <Button
                to={LMS_LOGIN_URL}
                withArrow
                onClick={onClose}
                className="w-full py-3.5 text-base"
              >
                {ui.nav.lmsLogin}
              </Button>

              <ul className="flex flex-col gap-3">
                {CONTACT_NUMBERS.map((number) => (
                  <li key={number.href}>
                    {/* Matches the desktop utility bar's treatment — navy,
                        semibold, blue icon — so the numbers read the same
                        way on both. */}
                    <a
                      href={number.href}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[15px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {number.label}
                    </a>
                  </li>
                ))}
              </ul>

              <LanguageToggle className="text-sm" />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
