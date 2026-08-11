import { Phone } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { LanguageToggle } from './LanguageToggle';

export function TopBar() {
  return (
    <div className="hidden items-center justify-between border-b border-border/70 bg-muted/60 px-7 py-2.5 text-[12.5px] text-muted-foreground md:flex lg:px-9">
      <LanguageToggle />

      <ul className="flex items-center gap-6">
        {CONTACT_NUMBERS.map((number) => (
          <li key={number.href}>
            <a
              href={number.href}
              className="flex cursor-pointer items-center gap-1.5 font-medium tracking-tight transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              {number.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
