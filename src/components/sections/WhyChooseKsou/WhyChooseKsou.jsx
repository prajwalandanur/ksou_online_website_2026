import { FeatureMarquee } from './FeatureMarquee';

export function WhyChooseKsou() {
  return (
    <section
      aria-labelledby="why-choose-ksou-heading"
      className="flex flex-col gap-10 py-16 sm:gap-12 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 text-center lg:px-8">
        <h2
          id="why-choose-ksou-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          Why Choose <span className="text-primary">KSOU Online?</span>
        </h2>
        <p className="mx-auto max-w-xl text-base font-light text-muted-foreground sm:text-lg">
          A flexible, recognized degree designed around your ambitions.
        </p>
      </div>

      <FeatureMarquee />
    </section>
  );
}
