import { useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGES } from '@/constants/navigation';

export function LanguageToggle({ className = '' }) {
  const [active, setActive] = useState(LANGUAGES[0].code);

  return (
    <div
      role="group"
      aria-label="Select language"
      className={`flex items-center gap-1.5 text-[12.5px] font-medium ${className}`}
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1.5">
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
            {lang.label}
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
