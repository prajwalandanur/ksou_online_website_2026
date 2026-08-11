import { motion } from 'framer-motion';
import { ABOUT_LEGACY } from '@/constants/about';
import { CountUpValue } from './CountUpValue';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Four statistics as equal peers. An earlier version set 115K+ several
 * steps larger than the rest, which read as unbalanced rather than
 * hierarchical — one number dominating made the other three look like
 * footnotes. Every entry now shares the same type scale and carries a
 * one-line description, so they read as a single system.
 *
 * `items-stretch` plus `h-full` keeps all four the same height even though
 * their descriptions wrap to different line counts.
 */
export function AboutLegacy() {
  return (
    <section aria-labelledby="about-legacy-heading" className="px-6 py-10 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <motion.h2
          id="about-legacy-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
        >
          {ABOUT_LEGACY.heading}
        </motion.h2>

        <ul className="mt-8 grid items-stretch gap-x-8 gap-y-10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {ABOUT_LEGACY.stats.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="flex h-full flex-col gap-2 border-t-2 border-primary/25 pt-5"
            >
              <CountUpValue
                value={stat.value}
                className="font-brand text-[3.25rem] leading-[0.95] tracking-tight text-primary sm:text-[3.75rem]"
              />
              <span className="text-sm font-semibold text-navy">{stat.label}</span>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{stat.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
