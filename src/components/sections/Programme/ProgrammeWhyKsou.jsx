import { motion } from 'framer-motion';
import { PROGRAMME_UNIVERSITY_MILESTONES, PROGRAMME_UNIVERSITY_VISION } from '@/constants/programmes/shared';

const EASE = [0.22, 1, 0.36, 1];

/**
 * University story — same across every KSOU Online programme, so this
 * section is intentionally content-static rather than taking a `programme`
 * prop. Per the source spec: "This section is about KSOU as the
 * university, not the individual course... Do not rewrite this
 * unnecessarily for every programme."
 */
export function ProgrammeWhyKsou() {
  return (
    <section aria-labelledby="programme-why-ksou-heading" className="bg-muted/40 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Institutional Legacy
          </span>
          <h2
            id="programme-why-ksou-heading"
            className="font-brand text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            A Legacy of Accessible <span className="text-primary">Higher Education</span>
          </h2>
          <p className="max-w-md text-base font-light italic leading-relaxed text-foreground/75 sm:text-lg">
            &ldquo;{PROGRAMME_UNIVERSITY_VISION}&rdquo;
          </p>
        </div>

        <ol className="flex flex-col">
          {PROGRAMME_UNIVERSITY_MILESTONES.map((milestone, i) => (
            <motion.li
              key={milestone.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              className="flex items-start gap-5 sm:gap-6"
            >
              <div className="flex flex-col items-center self-stretch">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {i < PROGRAMME_UNIVERSITY_MILESTONES.length - 1 && (
                  <span aria-hidden="true" className="my-1 w-px flex-1 bg-border" />
                )}
              </div>
              <div className="flex flex-col gap-1 pb-10">
                <span className="font-brand text-2xl text-primary sm:text-3xl">
                  {milestone.year}
                </span>
                <h3 className="text-base font-semibold text-foreground">{milestone.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
