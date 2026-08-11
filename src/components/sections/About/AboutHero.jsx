import { motion } from 'framer-motion';
import campus from '@/assets/ksou-campus.webp';
import { ABOUT_HERO } from '@/constants/about';

const EASE = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="px-6 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <motion.span
            {...rise(0)}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
          >
            {ABOUT_HERO.eyebrow}
          </motion.span>

          <motion.h1
            id="about-hero-heading"
            {...rise(0.08)}
            className="font-brand text-[2.5rem] leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.75rem]"
          >
            {ABOUT_HERO.heading}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
          >
            {ABOUT_HERO.body}
          </motion.p>
        </div>

        {/* Reveals from the side rather than fading in place, so it reads as
            one editorial composition with the copy above it. */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="relative mt-10 sm:mt-12"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[36px] bg-primary/[0.06] blur-2xl"
          />
          <img
            src={campus}
            alt={ABOUT_HERO.imageAlt}
            fetchPriority="high"
            className="relative aspect-[16/9] w-full rounded-[28px] object-cover shadow-[0_1px_2px_rgba(17,17,17,0.04),0_28px_56px_-28px_rgba(17,17,17,0.32)] sm:aspect-[21/9]"
          />
        </motion.div>
      </div>
    </section>
  );
}
