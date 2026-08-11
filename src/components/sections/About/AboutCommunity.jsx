import { motion } from 'framer-motion';
import { ABOUT_COMMUNITY } from '@/constants/about';
import { useMarquee } from '@/hooks/useMarquee';
import { CountUpValue } from './CountUpValue';

const EASE = [0.22, 1, 0.36, 1];

// useMarquee wraps scrollLeft past one of two identical halves, so each half
// must overflow the viewport or the loop shows a gap. Seven short discipline
// pills aren't wide enough on their own — see AccreditationStrip for the
// same constraint.
const REPEATS_PER_HALF = 3;
const HALF = Array.from({ length: REPEATS_PER_HALF }, () => ABOUT_COMMUNITY.disciplines).flat();

function DisciplineTrack({ ariaHidden = false }) {
  return (
    <ul className="flex shrink-0" {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
      {HALF.map((d, i) => (
        <li key={`${d}-${i}`} className="pr-3">
          <span className="block whitespace-nowrap rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-navy">
            {d}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AboutCommunity() {
  const { containerRef, pause, resume, scheduleResume, prefersReducedMotion } = useMarquee({
    speedPxPerSec: 32,
  });

  return (
    <section aria-labelledby="about-community-heading" className="py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* The 85+ figure is already stated in the Legacy section, so it is
            a supporting note here rather than a second giant number — the
            new information in this section is the spread of disciplines. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex max-w-3xl flex-col gap-4"
        >
          <h2
            id="about-community-heading"
            className="font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {ABOUT_COMMUNITY.heading}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {ABOUT_COMMUNITY.body}
          </p>
          <p className="flex items-baseline gap-2 pt-1">
            <CountUpValue
              value={ABOUT_COMMUNITY.anchor.value}
              className="font-brand text-3xl leading-none text-primary"
            />
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {ABOUT_COMMUNITY.anchor.label}
            </span>
          </p>
        </motion.div>
      </div>

      <div className="relative mt-10 sm:mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24"
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
          <DisciplineTrack />
          {!prefersReducedMotion && <DisciplineTrack ariaHidden />}
        </div>
      </div>
    </section>
  );
}
