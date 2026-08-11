import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
import { PROGRAMME_CAREER_SUPPORT } from '@/constants/programmes/shared';

const EASE = [0.22, 1, 0.36, 1];

// Chamfered rectangle: diagonal top edge + clipped corners, standing in for
// a "designed" section transition rather than a plain border-radius curve.
// The Y offsets are fixed px, not %: a %-based offset scales with the
// panel's own height, and on mobile this panel stacks into one tall
// single-column layout — a 5% cut on a ~900px-tall panel became a 45px+
// clip that chopped into the "Career Support" label sitting right below
// the padding. Fixed px keeps the cut a small, constant amount regardless
// of how tall the content stack gets. X offsets stay in % since the
// panel's width doesn't balloon the same way.
const PANEL_CLIP =
  'polygon(0 24px, 96% 0, 100% 32px, 100% calc(100% - 32px), 94% 100%, 4% 100%, 0 calc(100% - 32px))';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

const profileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export function ProgrammeCareerSupport({ programme }) {
  const { careerContext } = programme;

  return (
    <section aria-labelledby="programme-career-support-heading" className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-12 lg:px-8">
        <h2
          id="programme-career-support-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          Career &amp; Placement Assistance
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">{careerContext}</p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div
          style={{ clipPath: PANEL_CLIP }}
          className="relative overflow-hidden bg-primary px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Career Support
              </span>
              <h3 className="font-brand text-2xl leading-tight text-primary-foreground sm:text-3xl lg:text-[2.25rem]">
                Build your profile. Prepare for opportunities.
              </h3>

              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-col gap-4"
              >
                {PROGRAMME_CAREER_SUPPORT.map((feature) => (
                  <motion.li
                    key={feature.id}
                    variants={itemVariants}
                    className="flex items-start gap-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-foreground">
                      <feature.Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-sm font-semibold text-primary-foreground">
                        {feature.title}
                      </span>
                      <p className="text-xs leading-relaxed text-primary-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.35)] sm:p-8"
            >
              <span className="text-sm font-semibold text-foreground">Your Career Profile</span>
              <p className="mt-1 text-xs text-muted-foreground">
                A single profile connecting your preparation and opportunities.
              </p>

              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="mt-6 flex flex-col gap-3"
              >
                {PROGRAMME_CAREER_SUPPORT.map((feature) => (
                  <motion.div
                    key={feature.id}
                    variants={profileItemVariants}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{feature.title}</span>
                    <CircleCheckBig className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="mt-6 h-1 origin-left rounded-full bg-gold/70"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
