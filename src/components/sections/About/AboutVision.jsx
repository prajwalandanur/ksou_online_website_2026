import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Four priorities as large editorial blocks, not icon cards. The brief is
 * explicit about that distinction and it is the right one: an icon tile
 * makes four abstract commitments look like four product features. These are
 * numbered, oversized and separated by hairlines instead, so they read as
 * positions rather than as a feature grid.
 *
 * The closing statement carries no quotation marks and no attribution. It is
 * editorial positioning written for this page — the Vice-Chancellor has not
 * been quoted saying it, and setting it in quotes would manufacture a
 * statement from a real person.
 */
export function AboutVision() {
  const { about } = useContent();
  const vision = about.vision;

  return (
    <section aria-labelledby="about-vision-heading" className="px-6 py-10 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {vision.eyebrow}
            </span>
            <h2
              id="about-vision-heading"
              className="font-brand text-[2rem] leading-[1.12] tracking-tight text-navy sm:text-[2.5rem] lg:text-[3rem]"
            >
              {vision.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:pt-2">
            {vision.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Hairlines rather than card borders: the blocks share one grid, so
            a single set of top borders reads as a ruled editorial table
            instead of four floating tiles. */}
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {vision.priorities.map((priority, i) => (
            <motion.li
              key={priority.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: EASE }}
              className="flex flex-col gap-3 border-t-2 border-navy/10 pt-6"
            >
              {/* Primary, not gold. Gold measures ~2.4:1 on white — it is a
                  hairline and dot colour on light backgrounds throughout this
                  project and must not carry text there. */}
              <span className="font-brand text-2xl leading-none text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-brand text-[1.75rem] leading-tight tracking-tight text-navy sm:text-[2rem]">
                {priority.title}
              </h3>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                {priority.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 max-w-4xl border-l-2 border-gold pl-6 font-brand text-[1.75rem] leading-[1.25] tracking-tight text-navy sm:mt-16 sm:pl-8 sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {vision.statement.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
