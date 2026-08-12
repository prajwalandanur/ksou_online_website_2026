import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { APPLY_NOW_URL } from '@/constants/navigation';
import { HeroVisual } from './HeroVisual';
import { AccreditationStrip } from './AccreditationStrip';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="px-6 py-10 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-16">
        {/* Five stacked items now, so the spacing steps down from the old
            gap-8/9 to the same gap-5/6 the programme heroes use — the wider
            gap was tuned for three. */}
        <div className="flex flex-col items-start gap-5 lg:gap-6">
          <motion.h1
            id="hero-heading"
            {...fadeUp(0)}
            className="font-brand text-[2.75rem] leading-[1.12] text-foreground sm:text-6xl lg:text-[4rem] xl:text-[4.25rem]"
          >
            UGC Approved <span className="text-primary">KSOU Online Programmes</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="text-lg font-medium text-foreground/75 sm:text-xl"
          >
            Recognized Degrees. Flexible Learning. Real Opportunities.
          </motion.p>

          <motion.p
            {...fadeUp(0.15)}
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Explore online undergraduate and postgraduate programmes from Karnataka State Open
            University, designed for students and working professionals seeking flexible,
            accessible and career-focused higher education.
          </motion.p>

          {/* Deliberately a pill plus a line of supporting text, not a
              bordered panel — the brief asks for a highlight row, not a card.
              The gold dot + hairline + navy text is the same restrained
              treatment the announcement cards' IMPORTANT badge uses, so this
              reads as part of the system rather than a one-off. */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col items-start gap-2">
            {/* Natural case, not the uppercase the smaller category pills
                use: at 31 characters uppercase reads shouty rather than
                subtle, and it would render the supplied wording in a casing
                that isn't the one specified. */}
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.07] px-3.5 py-1.5 text-[13px] font-semibold tracking-tight text-navy">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              Admissions Open • July 2026 Cycle
            </p>
            <p className="text-sm text-muted-foreground">
              Applications are now open for the July 2026 admission cycle.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.25)} className="w-full pt-1 sm:w-auto">
            <Button
              to={APPLY_NOW_URL}
              withArrow
              className="w-full py-3.5 text-base sm:w-auto"
            >
              Apply Now
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <AccreditationStrip />
    </section>
  );
}
