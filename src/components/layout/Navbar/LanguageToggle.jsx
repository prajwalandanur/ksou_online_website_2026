import { useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGES } from '@/constants/navigation';

export function LanguageToggle({ className = '' }) {
  const [active, setActive] = useState(LANGUAGES[0].code);

  return (
    <div
      role="group"
      aria-label="Select language"
      className={`flex shrink-0 items-center gap-1 text-[11px] font-medium md:gap-1.5 md:text-[12.5px] ${className}`}
    >
      {/* Hidden below 420px: those ~16px are what let the toggle and all
          three numbers share one utility row down to ~375px. The "EN / ಕನ್ನಡ"
          labels carry the meaning on their own. */}
      <Languages
        className="hidden h-3 w-3 shrink-0 text-muted-foreground min-[420px]:block md:h-3.5 md:w-3.5"
        aria-hidden="true"
      />
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1 md:gap-1.5">
          <button
            type="button"
            onClick={() => setActive(lang.code)}
            aria-pressed={active === lang.code}
            className={`cursor-pointer rounded px-1 py-0.5 tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === lang.code
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {/* Abbreviated at phone widths so the toggle and all three
                numbers share one utility row; full label from md. */}
            <span className="md:hidden">{lang.short ?? lang.label}</span>
            <span className="hidden md:inline">{lang.label}</span>
          </button>
          {i < LANGUAGES.length - 1 && (
            <span className="text-border" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
