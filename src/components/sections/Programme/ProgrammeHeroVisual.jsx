/**
 * The programme hero photograph — the same image the course card uses, wired
 * in by constants/programmes/index.js from courses.js so both come from one
 * source. A programme with no artwork keeps the original icon placeholder.
 *
 * Never lazy-loaded: this is the largest element above the fold on a
 * programme page, so deferring it just delays LCP.
 */
export function ProgrammeHeroVisual({ Icon, label, image, imageAlt }) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] lg:mx-0 lg:aspect-[5/4] lg:max-w-none lg:-mr-6 xl:-mr-10">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {image ? (
        <img
          src={image}
          alt={imageAlt ?? label}
          fetchPriority="high"
          className="relative h-full w-full rounded-[28px] border border-border/70 object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={label}
          className="relative flex h-full w-full items-center justify-center rounded-[28px] border border-border/70 bg-gradient-to-br from-primary/[0.06] via-muted to-muted"
        >
          <Icon className="h-16 w-16 text-primary/25 sm:h-20 sm:w-20" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
