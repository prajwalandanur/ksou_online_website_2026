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
        <div className="flex flex-col items-start gap-8 lg:gap-9">
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
            Government Recognized Online UG &amp; PG Degrees
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="w-full pt-2 sm:w-auto">
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
