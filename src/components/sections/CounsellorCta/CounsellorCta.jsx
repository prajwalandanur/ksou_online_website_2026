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
          reads as depth rather than ornament. Unchanged in size and style;
          the xl offset only re-centres it on the counsellor after she moved
          inboard. `-2rem` is the furthest right it can sit without pushing
          past the viewport at exactly 1024px/1280px, so that value stays. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4rem] right-[-2rem] hidden h-[30rem] w-[30rem] rounded-full border border-navy/[0.07] lg:block xl:right-[6.5rem]"
      />

      {/* min-h reserves the height the (absolutely positioned) counsellor
          needs, since she no longer contributes to layout height. */}
      <div className="lg:relative lg:min-h-[28rem] xl:min-h-[41rem]">
        <div className="flex flex-col items-start gap-5 lg:max-w-xl lg:pb-24">
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
