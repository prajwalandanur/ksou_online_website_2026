import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import campus from '@/assets/ksou-campus.webp';

const EASE = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

/**
 * Establishes the institution first and the leadership second. The portrait
 * is deliberately held back until the next section: putting a face on the
 * first screen turns an About page into a personal profile, which is the one
 * thing the brief for this page rules out.
 *
 * The leadership cue sits *below* the image rather than above it, so it
 * reads as a caption on the institution rather than as a subtitle on the
 * headline — visible immediately, but subordinate.
 */
export function AboutHero() {
  const { about } = useContent();
  const hero = about.hero;

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="px-6 pb-10 pt-10 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <motion.span
            {...rise(0)}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            id="about-hero-heading"
            {...rise(0.08)}
            className="font-brand text-[2.5rem] leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.75rem]"
          >
            {hero.heading}
          </motion.h1>

          {hero.body.map((paragraph, i) => (
            <motion.p
              key={paragraph}
              {...rise(0.16 + i * 0.06)}
              className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.p
            {...rise(0.3)}
            className="font-brand text-xl leading-snug text-primary sm:text-2xl"
          >
            {hero.motto}
          </motion.p>
        </div>

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
            alt={hero.imageAlt}
            fetchPriority="high"
            className="relative aspect-[16/9] w-full rounded-[28px] object-cover shadow-[0_1px_2px_rgba(17,17,17,0.04),0_28px_56px_-28px_rgba(17,17,17,0.32)] sm:aspect-[21/9]"
          />
        </motion.div>

        {/* The gold hairline is the same restrained treatment the hero's
            admissions pill uses — enough to mark the line as significant
            without competing with the headline above it. */}
        <motion.p
          {...rise(0.42)}
          className="mt-6 flex flex-col gap-1 border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:text-[15px]"
        >
          {/* Four parts, not one sentence: English puts "Under the leadership
              of" before the name, Kannada puts "ಅವರ ನೇತೃತ್ವದಲ್ಲಿ" after it.
              Each language fills the slot on its own side and leaves the
              other empty — see the note on `leadershipCue` in the data. */}
          <span>
            {hero.leadershipCue.prefix}{' '}
            <strong className="font-semibold text-navy">{hero.leadershipCue.name}</strong>
            {hero.leadershipCue.nameSuffix}
          </span>
          <span>{hero.leadershipCue.suffix}</span>
        </motion.p>
      </div>
    </section>
  );
}
