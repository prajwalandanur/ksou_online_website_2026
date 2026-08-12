import { Phone } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { LanguageToggle } from './LanguageToggle';

/**
 * The header's utility band. Visible at every breakpoint — on mobile it
 * stacks the language toggle above the numbers instead of hiding, since
 * three 15-character numbers cannot share a 390px row with the toggle at any
 * readable size. The numbers themselves are allowed to wrap between
 * themselves but never inside one (`whitespace-nowrap`).
 *
 * Padding and type step down below `md` to keep the extra band from eating
 * the viewport: the header is sticky and its height is fixed, so every pixel
 * here is a pixel permanently unavailable to page content.
 */
export function TopBar() {
  return (
    <div className="flex flex-col gap-1 border-b border-border/70 bg-muted/60 px-5 py-1.5 text-[12.5px] text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4 md:px-7 md:py-2.5 lg:px-9">
      <LanguageToggle />

      {/* The numbers are the one thing in this bar people actually come
          looking for, so they step out of the bar's muted grey: navy at
          semibold against the language toggle's regular muted text, with the
          icon in KSOU blue. */}
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 md:flex-nowrap md:gap-5 lg:gap-7">
        {CONTACT_NUMBERS.map((number) => (
          <li key={number.href}>
            <a
              href={number.href}
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[12.5px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-[13.5px]"
            >
              <Phone className="h-3 w-3 shrink-0 text-primary md:h-3.5 md:w-3.5" aria-hidden="true" />
              {number.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
