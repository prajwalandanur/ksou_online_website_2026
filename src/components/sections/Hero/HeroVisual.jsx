import { GraduationCap } from 'lucide-react';

/**
 * No approved KSOU student photo exists yet. This reserves the exact
 * footprint (aspect ratio, alignment) a full-height transparent PNG will
 * need, so dropping the real asset in later is a one-line swap:
 *
 *   <img
 *     src={studentPhoto}
 *     alt="KSOU Online student holding a laptop"
 *     className="relative h-full w-full object-contain object-bottom"
 *   />
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        role="img"
        aria-label="Placeholder area reserved for a KSOU Online student photo"
        className="relative flex h-full w-full items-end justify-center"
      >
        <GraduationCap
          className="mb-[14%] h-16 w-16 text-primary/25 sm:h-20 sm:w-20"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
