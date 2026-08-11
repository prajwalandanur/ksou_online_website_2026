import { motion } from 'framer-motion';
import { ABOUT_STORY } from '@/constants/about';

const EASE = [0.22, 1, 0.36, 1];

/**
 * One milestone list rendered once, restyled per breakpoint by CSS rather
 * than duplicated into separate desktop/mobile trees: the connecting line
 * runs horizontally behind the row at `lg` and vertically down the left at
 * smaller sizes. Keeping a single DOM tree means the content can't drift
 * between the two layouts.
 */
export function AboutStory() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className="bg-muted/40 px-6 py-10 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2
            id="about-story-heading"
            className="font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {ABOUT_STORY.heading}
          </h2>
          <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {ABOUT_STORY.intro}
          </p>
        </div>

        <div className="relative mt-12 sm:mt-14">
          {/* The rail: vertical under lg, horizontal from lg up. Drawn with
              scaleX/scaleY so it can animate in as a single stroke. */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-border lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute left-0 top-[13px] hidden h-px w-full origin-left bg-border lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {ABOUT_STORY.milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
                className="relative pl-11 lg:pl-0 lg:pt-11"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background lg:left-1.5 lg:top-1.5"
                />
                <span className="block font-brand text-2xl text-primary sm:text-[1.75rem]">
                  {m.year}
                </span>
                <span className="mt-1 block text-sm font-semibold text-navy">{m.title}</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
