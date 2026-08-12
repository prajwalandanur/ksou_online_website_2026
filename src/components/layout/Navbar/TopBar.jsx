import { Phone } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { LanguageToggle } from './LanguageToggle';

/**
 * The header's utility band — language toggle and the three admissions
 * lines — visible at every breakpoint.
 *
 * Mobile aims for the single row "Language | number | number | number" and
 * gets there by shedding weight rather than by hiding anything: 11px type,
 * one leading phone icon for the whole group instead of three, dot
 * separators instead of gaps, and 12px gutters. Below the width where even
 * that fits, the numbers wrap to a second slim line — the brief's "compress
 * gracefully rather than a large vertical block". They never wrap *inside* a
 * number (`whitespace-nowrap`), so a wrapped row is one extra 16px line, not
 * a block.
 *
 * On mobile this band is ordinary flow content, not part of the sticky
 * element, so it scrolls away on the first scroll and returns at the top.
 */
export function TopBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-1.5 gap-y-0 border-b border-border/70 bg-muted/60 px-2.5 py-1 text-[12.5px] leading-tight text-muted-foreground sm:px-5 sm:py-1.5 md:gap-4 md:px-7 md:py-2.5 md:leading-normal lg:px-9">
      <LanguageToggle />

      {/* The numbers step out of the bar's muted grey — navy, semibold, blue
          icon — because they are what people come to this bar for. */}
      <ul className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0 sm:gap-x-3 md:gap-5 lg:gap-7">
        {CONTACT_NUMBERS.map((number, i) => (
          <li key={number.href} className="flex items-center gap-1 sm:gap-3 md:gap-5 lg:gap-7">
            {/* Dot separators on mobile only; from md each number carries its
                own icon and the dots would be clutter. */}
            {i > 0 && (
              <span aria-hidden="true" className="text-border md:hidden">
                &bull;
              </span>
            )}
            <a
              href={number.href}
              className="flex cursor-pointer items-center gap-0.5 whitespace-nowrap text-[10.5px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-1 sm:text-[11.5px] md:gap-1.5 md:text-[13.5px]"
            >
              <Phone
                className={`h-2.5 w-2.5 shrink-0 text-primary sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 ${
                  i > 0 ? 'hidden md:block' : ''
                }`}
                aria-hidden="true"
              />
              {number.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
