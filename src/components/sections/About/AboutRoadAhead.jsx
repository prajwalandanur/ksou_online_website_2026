import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import campus from '@/assets/ksou-campus.webp';
import { Button } from '@/components/ui/Button';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Brings the story back to the leadership and closes the page.
 *
 * The background is the same campus photograph the hero at the top of this
 * page uses, which is deliberate. The alternative in this project's assets is
 * `hero-campus.webp`, and it puts a student's face at close to full height
 * directly behind the closing copy — at any overlay light enough to read as a
 * photograph, a large face competes with the text. Under a 92% navy wash the
 * campus architecture reads as texture rather than as a repeat, so it carries
 * an empty alt: the hero already describes this building properly, and
 * describing it twice on one page tells a screen-reader user nothing new.
 *
 * The brief asks for a second photograph of the Vice-Chancellor here. None
 * exists, so the panel runs campus-only and renders the portrait the moment
 * `roadAhead.portrait` is set. There is deliberately no dashed
 * placeholder on this one: at this size, over a dark photograph, a reserved
 * slot reads as a failed image rather than as a promise.
 *
 * Only two CTAs. `MainLayout` appends the global counsellor block directly
 * below, which is already the page's "talk to a counsellor" route — putting
 * a third button here would stack the same ask twice on one screen.
 */
export function AboutRoadAhead() {
  const { about } = useContent();
  const roadAhead = about.roadAhead;

  const { portrait, portraitAlt } = roadAhead;

  return (
    <section aria-labelledby="about-road-ahead-heading" className="relative isolate overflow-hidden">
      <img
        src={campus}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/[0.92]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div
          className={
            portrait
              ? 'grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16'
              : 'max-w-3xl'
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-start gap-5"
          >
            <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {roadAhead.eyebrow}
            </span>

            <h2
              id="about-road-ahead-heading"
              className="font-brand text-[2rem] leading-[1.12] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]"
            >
              {roadAhead.heading}
            </h2>

            {roadAhead.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-white/75 sm:text-lg">
                {paragraph}
              </p>
            ))}

            <p className="text-base leading-relaxed text-white/75 sm:text-lg">
              {roadAhead.leadershipLine.prefix}{' '}
              <strong className="font-semibold text-white">
                {roadAhead.leadershipLine.name}
              </strong>
              {roadAhead.leadershipLine.suffix}
            </p>

            {/* One of the few places gold carries text: on `--color-navy` it
                measures 6.11:1, comfortably past AA. On white or the ticker's
                tinted bed it is ~2.4:1 and stays decorative — don't move this
                treatment to a light background. */}
            <p className="pt-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              {roadAhead.objectiveLead}
            </p>
            <ul className="flex flex-col gap-1.5">
              {roadAhead.objectives.map((objective) => (
                <li
                  key={objective}
                  className="font-brand text-xl leading-snug text-white sm:text-2xl"
                >
                  {objective}
                </li>
              ))}
            </ul>
          </motion.div>

          {portrait && (
            <motion.img
              src={portrait}
              alt={portraitAlt}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)] ring-1 ring-white/15"
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex flex-col items-start gap-5 border-t border-white/15 pt-10 sm:mt-16 sm:pt-12"
        >
          <h3 className="max-w-3xl font-brand text-[2rem] leading-[1.1] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            {roadAhead.closingHeading}
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {roadAhead.closingBody}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button to={roadAhead.primaryCta.to} variant="onPrimary" withArrow>
              {roadAhead.primaryCta.label}
            </Button>
            <Button to={roadAhead.secondaryCta.to} variant="outlineOnPrimary">
              {roadAhead.secondaryCta.label}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
