import { useContent } from '@/i18n/content';
import { fill } from '@/i18n/format';
import { ProgrammeInfoCard } from './ProgrammeInfoCard';

export function ProgrammeFeeDurationEligibility({ programme }) {
  const { feeDurationEligibility, shortName } = programme;
  const { ui } = useContent();

  return (
    <section aria-labelledby="programme-fee-heading" className="bg-muted/40 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-10 lg:px-8">
        <h2
          id="programme-fee-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {fill(ui.programme.fee.heading, { name: shortName })}
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          {fill(ui.programme.fee.subheading, { name: shortName })}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 sm:grid-cols-3 lg:px-8">
        {feeDurationEligibility.map((card) => (
          <ProgrammeInfoCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
