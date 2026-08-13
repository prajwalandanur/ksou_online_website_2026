import certificateSample from '@/assets/certificate-sample.webp';
import { useContent } from '@/i18n/content';
import { fill } from '@/i18n/format';
import { ProgrammeCertificateVisual } from './ProgrammeCertificateVisual';

export function ProgrammeDegreeShowcase({ programme }) {
  const { degree, shortName } = programme;
  const { ui, programmeShared } = useContent();
  const heading = ui.programme.degree;

  return (
    <section aria-labelledby="programme-degree-heading" className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {programmeShared.degreeTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            id="programme-degree-heading"
            className="font-brand text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            {heading.headingLead} <span className="text-primary">{degree.titleAccent}</span>
            {heading.headingTrail}
          </h2>

          <p className="max-w-md text-base font-light text-muted-foreground sm:text-lg">
            {degree.description}
          </p>
        </div>

        <div className="lg:-mr-6 xl:-mr-10">
          {/* One sample certificate serves all six programmes by explicit
              instruction, even though it names Master of Commerce. It is
              watermarked "SAMPLE / NOT A VALID ACADEMIC CREDENTIAL" on the
              artwork itself, and `certificateAlt` repeats that caveat for
              anyone who cannot see it. */}
          <ProgrammeCertificateVisual
            label={fill(heading.certificateLabel, { name: shortName })}
            src={certificateSample}
            alt={heading.certificateAlt}
          />
        </div>
      </div>
    </section>
  );
}
