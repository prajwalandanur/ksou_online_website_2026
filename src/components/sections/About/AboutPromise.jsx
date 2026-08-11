import { motion } from 'framer-motion';
import campus from '@/assets/ksou-campus.webp';
import { ABOUT_PROMISE } from '@/constants/about';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The closing statement of the whole page — deliberately full-bleed rather
 * than a contained card, so it lands as a statement instead of one more
 * section. No cards, no statistics, no CTA: the global counsellor block
 * below it is the only call to action the page ends with.
 *
 * The image is decorative here (the same campus is described properly in
 * the hero), so it carries an empty alt rather than repeating that
 * description a second time.
 */
export function AboutPromise() {
  return (
    <section
      aria-labelledby="about-promise-heading"
      className="relative isolate overflow-hidden"
    >
      <img
        src={campus}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/[0.88]" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-24 lg:px-8 lg:py-32">
        <motion.h2
          id="about-promise-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-brand text-[2.25rem] leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
        >
          {ABOUT_PROMISE.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {ABOUT_PROMISE.body}
        </motion.p>
      </div>
    </section>
  );
}
