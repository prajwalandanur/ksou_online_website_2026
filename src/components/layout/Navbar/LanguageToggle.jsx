import { Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LANGUAGES } from '@/constants/navigation';
import { useLanguage } from '@/i18n/useLanguage';
import { localizePath } from '@/i18n/language';
import { useContent } from '@/i18n/content';

/**
 * Switches between the English and Kannada trees.
 *
 * These are real <Link>s, not buttons, because each language is a distinct
 * URL — so the pair is shareable, bookmarkable, opens in a new tab, and is
 * crawlable as the internal link between the two versions. The old version
 * held the choice in `useState`, which meant it changed nothing at all.
 *
 * `localizePath` resolves to the English URL for any page with no Kannada
 * counterpart, so pressing ಕನ್ನಡ from, say, a blog article lands on the
 * English article rather than a 404. The active language is still marked
 * with `aria-current` and the primary colour.
 */
export function LanguageToggle({ className = '' }) {
  const { pathname } = useLocation();
  const active = useLanguage();
  const { ui } = useContent();

  return (
    <div
      role="group"
      aria-label={ui.nav.selectLanguage}
      className={`flex shrink-0 items-center gap-1 text-[11px] font-medium md:gap-1.5 md:text-[12.5px] ${className}`}
    >
      {/* Hidden below 420px: those ~16px are what let the toggle and all
          three numbers share one utility row down to ~375px. The "EN / ಕನ್ನಡ"
          labels carry the meaning on their own. */}
      <Languages
        className="hidden h-3 w-3 shrink-0 text-muted-foreground min-[420px]:block md:h-3.5 md:w-3.5"
        aria-hidden="true"
      />
      {LANGUAGES.map((lang, i) => {
        const isActive = active === lang.code;
        return (
          <span key={lang.code} className="flex items-center gap-1 md:gap-1.5">
            <Link
              to={localizePath(pathname, lang.code)}
              hrefLang={lang.code}
              aria-current={isActive ? 'true' : undefined}
              className={`cursor-pointer rounded px-1 py-0.5 tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {/* Abbreviated at phone widths so the toggle and all three
                  numbers share one utility row; full label from md. */}
              <span className="md:hidden">{lang.short ?? lang.label}</span>
              <span className="hidden md:inline">{lang.label}</span>
            </Link>
            {i < LANGUAGES.length - 1 && (
              <span className="text-border" aria-hidden="true">
                /
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
