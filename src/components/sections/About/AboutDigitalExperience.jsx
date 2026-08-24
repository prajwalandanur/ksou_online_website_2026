import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import desktopShot from '@/assets/about/website-desktop.webp';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The section that has to answer "what does this direction actually look
 * like?", so its main visual is the site itself.
 *
 * The screenshot is a real capture of this codebase's homepage, produced by
 * `npm run shots:site` — not a mockup and not stock photography. That matters
 * for more than honesty: it means the only way this section can misrepresent
 * the product is by going stale, which re-running one script fixes. **Re-run
 * it after any visible homepage change.**
 *
 * Desktop frame only, by request (2026-08-21). An overlapping phone frame was
 * removed along with the `website-mobile.webp` capture it used and that
 * capture's entry in the screenshot script — if it is ever wanted back, both
 * have to come back together. The wrapper's bottom padding went with it: it
 * existed solely to reserve layout height for the phone, which was absolutely
 * positioned and contributed none of its own.
 */
export function AboutDigitalExperience() {
  const { about } = useContent();
  const digital = about.digital;

  return (
    <section
      aria-labelledby="about-digital-heading"
      className="bg-muted/40 px-6 py-10 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {digital.eyebrow}
            </span>
            <h2
              id="about-digital-heading"
              className="font-brand text-[2rem] leading-[1.12] tracking-tight text-navy sm:text-[2.5rem] lg:text-[3rem]"
            >
              {digital.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:pt-2">
            {digital.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative"
          >
            {/* Browser chrome, drawn rather than photographed: three dots and
                an address bar are enough to read as a desktop window, and a
                real screenshot of a real browser would date the section to
                whichever browser took it. */}
            <div className="overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_32px_64px_-32px_rgba(17,17,17,0.34)]">
              <div className="flex items-center gap-2 border-b border-border bg-muted/70 px-4 py-2.5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </span>
                <span
                  aria-hidden="true"
                  className="ml-2 h-4 flex-1 rounded-full bg-background/80"
                />
              </div>
              <img
                src={desktopShot}
                alt={digital.desktopAlt}
                loading="lazy"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <h3 className="font-brand text-[1.75rem] leading-[1.15] tracking-tight text-navy sm:text-[2.125rem]">
              {digital.websiteHeading}
            </h3>

            {digital.websiteBody.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <p className="text-sm font-semibold text-navy">{digital.websiteLead}</p>

            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {digital.capabilities.map((capability) => (
                <li key={capability.id} className="flex flex-col gap-1 border-t border-border pt-3">
                  <span className="font-brand text-lg text-navy">{capability.title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {capability.body}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 max-w-4xl rounded-[24px] border border-border bg-white px-6 py-6 text-base leading-relaxed text-navy sm:mt-14 sm:px-8 sm:py-7 sm:text-lg"
        >
          {digital.leadershipConnection}
        </motion.p>
      </div>
    </section>
  );
}
