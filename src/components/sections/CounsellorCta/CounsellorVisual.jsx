import { Headset } from 'lucide-react';

/**
 * No counsellor cutout exists yet. This reserves the overflow footprint a
 * transparent-background PNG will need — head poking above the CTA's own
 * top edge, body extending down toward the footer — so dropping the real
 * asset in later is a one-line swap:
 *
 *   <img
 *     src={counsellorCutout}
 *     alt="KSOU Online admissions counsellor"
 *     className="h-full w-full object-contain object-bottom"
 *   />
 *
 * The exact overlap depth (top/bottom offsets below) was tuned for this
 * placeholder's proportions — re-check it once the real cutout drops in,
 * since a transparent PNG's internal padding will differ.
 */
export function CounsellorVisual() {
  return (
    <div
      role="img"
      aria-label="Placeholder area reserved for a KSOU Online counsellor photo"
      className="pointer-events-none absolute right-0 top-[-2rem] z-20 h-[22rem] w-[10rem] sm:top-[-2.5rem] sm:h-[28rem] sm:w-[15rem] lg:top-[-3rem] lg:h-[32rem] lg:w-[19rem]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-12 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative flex h-full w-full items-start justify-center pt-14 sm:pt-16">
        <Headset className="h-12 w-12 text-primary/35 sm:h-14 sm:w-14" aria-hidden="true" />
      </div>
    </div>
  );
}
