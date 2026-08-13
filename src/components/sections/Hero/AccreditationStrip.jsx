import { useMarquee } from '@/hooks/useMarquee';
import { useContent } from '@/i18n/content';

/**
 * `useMarquee` loops by wrapping scrollLeft past the width of one of two
 * identical halves, so each half has to be at least as wide as the viewport
 * — otherwise the track runs out of content and the loop shows a gap. There
 * are only three accreditations, so each half repeats them to guarantee it
 * overflows even on a very wide screen.
 */
const REPEATS_PER_HALF = 3;

function AccreditationItem({ logo, alt, heading, description }) {
  return (
    <li className="flex shrink-0 items-center gap-3.5 pr-10 sm:pr-14">
      <img src={logo} alt={alt} className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
      <div className="flex flex-col gap-0.5">
        <p className="whitespace-nowrap text-[15px] font-bold tracking-tight text-foreground">
          {heading}
        </p>
        <p className="whitespace-nowrap text-[13px] font-medium text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
}

export function AccreditationStrip() {
  // `KN_ACCREDITATIONS` has existed since the first Kannada pass; this
  // component just never read it, so the strip stayed English on /kn. The
  // repeated half is built per render rather than at module scope because it
  // now depends on the language.
  const { accreditations } = useContent();
  const marqueeHalf = Array.from({ length: REPEATS_PER_HALF }, () => accreditations).flat();

  const { containerRef, pause, resume, scheduleResume, prefersReducedMotion } = useMarquee({
    speedPxPerSec: 40,
  });

  return (
    <div className="mx-auto mt-12 max-w-7xl border-t border-border/70 pt-8 sm:mt-14 sm:pt-10">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20"
        />

        <div
          ref={containerRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={scheduleResume}
          onWheel={() => {
            pause();
            scheduleResume();
          }}
          className="flex overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex shrink-0">
            {marqueeHalf.map((item, i) => (
              <AccreditationItem key={`${item.heading}-${i}`} {...item} />
            ))}
          </ul>

          {/* The second half only exists to make the wrap seamless — with
              reduced motion there's no wrap, so it's just noise. */}
          {!prefersReducedMotion && (
            <ul aria-hidden="true" className="flex shrink-0">
              {marqueeHalf.map((item, i) => (
                <AccreditationItem key={`dup-${item.heading}-${i}`} {...item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
