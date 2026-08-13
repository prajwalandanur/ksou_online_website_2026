import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { ANNOUNCEMENTS_URL, TICKER_ANNOUNCEMENTS } from '@/constants/announcements';
import { useMarquee } from '@/hooks/useMarquee';
import { useContent } from '@/i18n/content';
import {
  HEADER_BAND_CARD,
  HEADER_BAND_CONTAINER,
  HEADER_BAND_TRAIL,
} from '@/components/layout/headerBands';
import { TickerItem } from './TickerItem';

/**
 * Slim "Latest Updates" strip that sits between the navbar and the page
 * content on every route.
 *
 * Reuses `useMarquee` — the same real-`scrollLeft` hook the accreditation
 * strip runs on — rather than adding a fourth bespoke scroll mechanism to
 * the codebase. That hook loops by wrapping scrollLeft past the width of one
 * of two identical halves, so each half must be at least as wide as the
 * visible track or the wrap shows a gap. The track is capped by the page's
 * max-w-7xl (~1130px of usable width once the fixed label is subtracted),
 * and one pass of the five ticker notices already exceeds that; the extra
 * repeat is headroom so the loop can't break if someone trims the list.
 */
const REPEATS_PER_HALF = 2;
const MARQUEE_HALF = Array.from({ length: REPEATS_PER_HALF }, () => TICKER_ANNOUNCEMENTS).flat();

const VIEW_ALL_CLASSES =
  'shrink-0 cursor-pointer whitespace-nowrap text-[13px] font-semibold tracking-tight text-primary-hover underline-offset-4 transition-colors duration-200 ease-out hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function AnnouncementTicker() {
  const { ui } = useContent();
  const { containerRef, pause, resume, scheduleResume, prefersReducedMotion } = useMarquee({
    // Deliberately slower than the accreditation strip's 40px/s — this is a
    // reading surface sitting under the navbar, not a logo wall.
    speedPxPerSec: 34,
  });

  if (!TICKER_ANNOUNCEMENTS.length) return null;

  return (
    // Bottom band of the navbar's rounded card, not a standalone strip: it
    // has a top hairline instead of a bottom one, no max-width of its own
    // (the card already caps it), and gutters matching the nav row above so
    // the three bands line up. The card's `overflow-hidden` rounds its
    // bottom corners. Height is fixed per breakpoint — the header must not
    // change height on scroll.
    <section aria-label={ui.ticker.regionLabel} className={HEADER_BAND_TRAIL}>
      <div className={HEADER_BAND_CONTAINER}>
        {/* `lg:overflow-hidden` so the marquee track and its edge-fade
            gradients are clipped by the card's rounded corners instead of
            running past them. Safe here in a way it would not be on the nav
            band: this section is a *sibling* of the sticky header, never an
            ancestor, so a non-visible overflow cannot break sticky. */}
        <div
          className={`bg-ticker max-lg:border-t max-lg:border-border/70 lg:overflow-hidden ${HEADER_BAND_CARD}`}
        >
          <div className="flex h-7 items-center gap-2 px-3 sm:h-9 sm:gap-3 sm:px-5 md:h-11 md:gap-4 md:px-6 lg:px-6 xl:px-5 2xl:px-6">
        {/* Fixed label. It is a flex sibling of the track, not an overlay, so
            the moving content is structurally unable to run underneath it. */}
        <p className="flex shrink-0 items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-navy sm:gap-2 sm:text-[12px] md:text-[12.5px] md:tracking-[0.08em]">
          <Megaphone className="h-3 w-3 text-gold sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" aria-hidden="true" />
          {/* Two variants rather than a conditional word: the uppercase
              tracking turns a trailing space into a visible gap. Only one is
              ever displayed, so screen readers still read a single label. */}
          <span className="hidden sm:inline">{ui.ticker.label}</span>
          <span className="sm:hidden">{ui.ticker.labelShort}</span>
        </p>

        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-navy/15" />

        {prefersReducedMotion ? (
          // The brief allows a static presentation in place of the animation.
          // A single notice reads cleanly and needs no scrolling at all,
          // which a motion-sensitive user would otherwise have to do by hand.
          <Link
            to={ANNOUNCEMENTS_URL}
            className="min-w-0 flex-1 cursor-pointer truncate text-[13px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[13.5px]"
          >
            {TICKER_ANNOUNCEMENTS[0].title}
          </Link>
        ) : (
          <div className="relative min-w-0 flex-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-ticker to-transparent sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-ticker to-transparent sm:w-10"
            />

            <div
              ref={containerRef}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onTouchStart={pause}
              onTouchEnd={scheduleResume}
              onFocus={pause}
              onBlur={resume}
              onWheel={() => {
                pause();
                scheduleResume();
              }}
              className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex shrink-0 items-center">
                {MARQUEE_HALF.map((announcement, i) => (
                  <TickerItem key={`${announcement.id}-${i}`} announcement={announcement} />
                ))}
              </ul>

              {/* Second half exists only so the wrap is seamless — it is a
                  duplicate, so it stays out of the accessibility tree. */}
              <ul aria-hidden="true" className="flex shrink-0 items-center">
                {MARQUEE_HALF.map((announcement, i) => (
                  <TickerItem
                    key={`dup-${announcement.id}-${i}`}
                    announcement={announcement}
                    isDuplicate
                  />
                ))}
              </ul>
            </div>
          </div>
        )}

        <Link to={ANNOUNCEMENTS_URL} className={`hidden sm:inline ${VIEW_ALL_CLASSES}`}>
          {ui.ticker.viewAll}
        </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
