import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { ANNOUNCEMENTS_URL, TICKER_ANNOUNCEMENTS } from '@/constants/announcements';
import { useMarquee } from '@/hooks/useMarquee';
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
    <section aria-label="Latest updates" className="border-t border-border/70 bg-ticker">
      <div className="flex h-9 items-center gap-3 px-6 sm:h-11 sm:gap-4 2xl:px-7">
        {/* Fixed label. It is a flex sibling of the track, not an overlay, so
            the moving content is structurally unable to run underneath it. */}
        <p className="flex shrink-0 items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-navy sm:gap-2 sm:text-[12.5px]">
          <Megaphone className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" aria-hidden="true" />
          {/* Two variants rather than a conditional word: the uppercase
              tracking turns a trailing space into a visible gap. Only one is
              ever displayed, so screen readers still read a single label. */}
          <span className="hidden sm:inline">Latest Updates</span>
          <span className="sm:hidden">Updates</span>
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
          View all
        </Link>
      </div>
    </section>
  );
}
