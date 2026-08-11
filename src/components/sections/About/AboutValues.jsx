import { motion } from 'framer-motion';
import { ABOUT_VALUES } from '@/constants/about';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The five objectives are set as oversized type, not five cards — the
 * source brief is explicit about that. They highlight from muted to navy
 * as they enter the viewport, which is the section's only motion.
 */
function ValueWord({ word, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 14, color: 'var(--color-muted-foreground)' }}
      whileInView={{ opacity: 1, y: 0, color: 'var(--color-navy)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      className="block font-brand text-[2.5rem] leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]"
    >
      {word}
    </motion.span>
  );
}

export function AboutValues() {
  return (
    <section aria-labelledby="about-values-heading" className="px-6 py-10 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="about-values-heading"
          className="max-w-3xl font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
        >
          {ABOUT_VALUES.heading}
        </h2>

        {/* Both blocks share one layout, so the right column is never empty
            and the two rows line up on the same grid. */}
        {ABOUT_VALUES.blocks.map((block, blockIndex) => (
          <div
            key={block.id}
            className={
              blockIndex === 0
                ? 'mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16'
                : 'mt-10 grid gap-8 border-t border-border pt-10 sm:mt-12 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16'
            }
          >
            <div>
              {block.words.map((word, i) => (
                <ValueWord key={word} word={word} index={i} />
              ))}
            </div>

            <div className="flex flex-col gap-5 lg:pt-3">
              {block.body.map((p) => (
                <p key={p} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-8 max-w-xl text-sm text-muted-foreground">{ABOUT_VALUES.note}</p>
      </div>
    </section>
  );
}
