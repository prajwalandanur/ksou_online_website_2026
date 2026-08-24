import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import { ProfilePortrait } from './ProfilePortrait';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The largest section on the page, and intentionally so — the brief puts
 * roughly 40% of the page's visual weight here. Three movements: the
 * portrait paired with the name and introduction, then the documented
 * career as a timeline, then a short editorial reading of what that career
 * adds up to.
 *
 * Every biographical line comes from `leadership.journey`, which is
 * sourced against primary references listed in `constants/about.js`. This
 * component states nothing of its own about the person.
 *
 * The timeline is one DOM tree restyled per breakpoint — vertical rail below
 * `lg`, horizontal above it — rather than two trees behind media queries.
 * That is the same approach the page's previous story timeline used, and the
 * reason is unchanged: two trees let the content drift apart.
 */
export function AboutLeadership() {
  const { about } = useContent();
  const leadership = about.leadership;

  return (
    <section
      aria-labelledby="about-leadership-heading"
      className="bg-muted/40 px-6 py-14 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex max-w-3xl flex-col items-start gap-4"
        >
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {leadership.eyebrow}
          </span>
          <h2
            id="about-leadership-heading"
            className="font-brand text-[2rem] leading-[1.12] tracking-tight text-navy sm:text-[2.5rem] lg:text-[3.25rem]"
          >
            {leadership.heading}
          </h2>
        </motion.div>

        {/* 0.85fr of 2fr puts the portrait at ~43% of the section width, the
            editorial scale the brief asks for — large enough to anchor the
            section, not so large it crowds the introduction beside it. */}
        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[36px] bg-primary/[0.07] blur-2xl"
            />
            <ProfilePortrait
              src={leadership.portrait}
              alt={leadership.portraitAlt}
              label={leadership.portraitLabel}
              className="relative"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-brand text-[2rem] leading-[1.1] tracking-tight text-navy sm:text-[2.5rem]">
                {leadership.name}
              </h3>
              <p className="flex flex-col text-sm font-semibold uppercase tracking-[0.14em] text-primary sm:text-[15px]">
                {leadership.designation.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>

            <span aria-hidden="true" className="h-px w-16 bg-gold" />

            {leadership.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {leadership.journeyHeading}
          </h3>

          <div className="relative mt-8 sm:mt-10">
            {/* The rail. Vertical below lg, horizontal from lg up; drawn with
                scaleY/scaleX so each animates in as a single stroke. */}
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

            <ol className="grid gap-9 lg:grid-cols-5 lg:gap-6">
              {leadership.journey.map((step, i) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
                  className="relative pl-11 lg:pl-0 lg:pr-4 lg:pt-11"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"
                  />
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {step.era}
                  </span>
                  <span className="mt-2 block font-brand text-xl leading-snug text-navy">
                    {step.title}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 grid gap-6 border-t border-border pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <h3 className="font-brand text-[1.75rem] leading-[1.15] tracking-tight text-navy sm:text-[2.125rem]">
            {leadership.profileHeading}
          </h3>
          <div className="flex flex-col gap-4">
            {leadership.profile.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
