/**
 * No premium programme-specific photo exists yet for any course. Reserves a
 * large, uncontained visual footprint — bleeding slightly past the grid
 * column on large screens rather than sitting in a small conventional card
 * — so a real editorial photo can drop in later per programme:
 *
 *   <img
 *     src={programmeHeroPhoto}
 *     alt="KSOU Online [Programme] — students/professionals in context"
 *     className="h-full w-full rounded-[28px] object-cover"
 *   />
 */
export function ProgrammeHeroVisual({ Icon, label }) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] lg:mx-0 lg:aspect-[5/4] lg:max-w-none lg:-mr-6 xl:-mr-10">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        role="img"
        aria-label={label}
        className="relative flex h-full w-full items-center justify-center rounded-[28px] border border-border/70 bg-gradient-to-br from-primary/[0.06] via-muted to-muted"
      >
        <Icon className="h-16 w-16 text-primary/25 sm:h-20 sm:w-20" aria-hidden="true" />
      </div>
    </div>
  );
}
