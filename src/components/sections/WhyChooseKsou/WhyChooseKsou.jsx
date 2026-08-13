import { useContent } from '@/i18n/content';
import { FeatureMarquee } from './FeatureMarquee';

export function WhyChooseKsou() {
  const { ui } = useContent();

  return (
    <section
      aria-labelledby="why-choose-ksou-heading"
      className="flex flex-col gap-8 py-10 sm:gap-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 text-center lg:px-8">
        <h2
          id="why-choose-ksou-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {ui.whyChoose.headingLead}
          {ui.whyChoose.headingLead && ' '}
          <span className="text-primary">{ui.whyChoose.headingAccent}</span>
          {ui.whyChoose.headingTrail}
        </h2>
        <p className="mx-auto max-w-xl text-base font-light text-muted-foreground sm:text-lg">
          {ui.whyChoose.subtitle}
        </p>
      </div>

      <FeatureMarquee />
    </section>
  );
}
