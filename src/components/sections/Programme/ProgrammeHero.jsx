import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APPLY_NOW_URL } from '@/constants/navigation';
import { ProgrammeHeroVisual } from './ProgrammeHeroVisual';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function ProgrammeHero({ programme }) {
  const { hero, infoStrip } = programme;

  return (
    <section
      aria-labelledby="programme-hero-heading"
      className="px-6 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:gap-6">
          <motion.p
            {...fadeUp(0)}
            className="text-sm font-semibold uppercase tracking-wide text-primary"
          >
            {hero.kicker}
          </motion.p>

          <motion.h1
            id="programme-hero-heading"
            {...fadeUp(0.05)}
            className="font-brand text-[2.5rem] leading-[1.14] text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            {hero.titleLead} <span className="text-primary">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.1)} className="text-lg font-medium text-foreground/75 sm:text-xl">
            {hero.supporting}
          </motion.p>

          <motion.p {...fadeUp(0.15)} className="max-w-lg text-base text-muted-foreground sm:text-lg">
            {hero.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row"
          >
            <Button to={APPLY_NOW_URL} withArrow className="justify-center py-3.5 text-base">
              Apply Now
            </Button>
            <Button
              variant="secondary"
              aria-label="View prospectus — coming soon"
              className="justify-center gap-2 py-3.5 text-base"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              View Prospectus
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ProgrammeHeroVisual Icon={hero.Icon} label={hero.visualLabel} />
        </motion.div>
      </div>

      <dl className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 rounded-[24px] bg-muted/60 px-6 py-6 sm:mt-12 sm:grid-cols-3 sm:gap-8 sm:px-8 sm:py-7 lg:mt-14 lg:grid-cols-6">
        {infoStrip.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {item.label}
            </dt>
            <dd className="text-base font-semibold text-foreground sm:text-lg">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
