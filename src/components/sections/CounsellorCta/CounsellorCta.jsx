import { Button } from '@/components/ui/Button';
import { CounsellorVisual } from './CounsellorVisual';

export function CounsellorCta() {
  return (
    <section
      aria-labelledby="counsellor-cta-heading"
      // No z-index here on purpose — see the note in CounsellorVisual.
      className="relative pt-14 sm:pt-16 lg:pt-20"
    >
      {/* One oversized architectural arc behind the counsellor — the only
          decoration in this section, kept at a near-invisible opacity so it
          reads as depth rather than ornament. `-2rem` is the furthest right
          it can sit without pushing past the viewport at exactly
          1024px/1280px, so don't increase it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4rem] right-[-2rem] hidden h-[30rem] w-[30rem] rounded-full border border-navy/[0.07] lg:block"
      />

      <div className="lg:relative">
        {/* The generous bottom padding is what opens the gap between the
            text column and the footer — the counsellor stays pinned to the
            footer's top edge, so this padding sets the CTA's height and
            therefore how much breathing room sits under the button. */}
        <div className="flex flex-col items-start gap-5 lg:max-w-xl lg:pb-32">
          <h2
            id="counsellor-cta-heading"
            className="font-brand text-4xl leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            Have Questions?
            <br />
            <span className="text-primary">We&rsquo;re Here to Help</span>
          </h2>

          <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            Have questions about programmes, admissions or online learning? Our counsellors are
            here to help.
          </p>

          <Button to="/contact" withArrow className="mt-1 py-3.5 text-base">
            Talk to a Counsellor
          </Button>
        </div>

        <CounsellorVisual />
      </div>
    </section>
  );
}
