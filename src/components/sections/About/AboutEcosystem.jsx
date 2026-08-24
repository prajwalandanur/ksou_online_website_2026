import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import { ArrowUpRight } from 'lucide-react';
import { KSOU_MAIN_WEBSITE_URL } from '@/constants/footer';
import { Button } from '@/components/ui/Button';
import { EcosystemDiagram } from './EcosystemDiagram';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Deliberately the shortest of the content sections. The leadership story is
 * already told by this point, so this shows what that direction is pointed
 * at — the ecosystem, a programme preview and the institutional foundation —
 * in three compact movements rather than three full-height sections.
 *
 * The programme preview lists names only. Fees, durations and eligibility
 * live on `/programmes` and the six detail pages; restating them here is
 * exactly how two pages end up quoting different fees for the same degree.
 *
 * The foundation strip states credentials that all predate the current
 * tenure, which is why `foundationNote` sits directly beneath it — the
 * credibility belongs to the institution, and the page has to say so rather
 * than let proximity to the leadership sections imply otherwise.
 */
export function AboutEcosystem() {
  const { about } = useContent();
  const ecosystem = about.ecosystem;

  return (
    <section
      aria-labelledby="about-ecosystem-heading"
      className="px-6 py-10 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col items-start gap-4"
          >
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {ecosystem.eyebrow}
            </span>
            <h2
              id="about-ecosystem-heading"
              className="font-brand text-[2rem] leading-[1.12] tracking-tight text-navy sm:text-[2.5rem] lg:text-[3rem]"
            >
              {ecosystem.heading}
            </h2>
            {ecosystem.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <EcosystemDiagram />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-14 grid gap-8 border-t border-border pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-brand text-[1.75rem] leading-[1.15] tracking-tight text-navy sm:text-[2.125rem]">
              {ecosystem.programmesHeading}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {ecosystem.programmesBody}
            </p>
            <Button to="/programmes" variant="primary" withArrow className="mt-2 w-fit">
              {ecosystem.programmesCta}
            </Button>
          </div>

          {/* `items-start` matters: this list is itself a grid item, so
              without it the three cards stretch to the height of the copy
              column beside them and each ends in ~120px of empty space. */}
          <ul className="grid items-start gap-5 sm:grid-cols-3">
            {ecosystem.programmeGroups.map((group) => (
              <li
                key={group.id}
                className="flex flex-col gap-3 rounded-[22px] border border-border bg-muted/40 px-5 py-5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {group.label}
                </span>
                <span className="flex flex-wrap gap-x-3 gap-y-1 font-brand text-xl text-navy">
                  {group.names.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-14 border-t border-border pt-10 sm:mt-16 sm:pt-12">
          <h3 className="max-w-2xl font-brand text-[1.75rem] leading-[1.15] tracking-tight text-navy sm:text-[2.125rem]">
            {ecosystem.foundationHeading}
          </h3>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.foundation.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex h-full flex-col gap-3 rounded-[24px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_36px_-20px_rgba(17,17,17,0.14)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-brand text-xl leading-tight text-navy">{item.credential}</span>
                <p className="flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                {item.linkLabel && (
                  <a
                    href={KSOU_MAIN_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    {item.linkLabel}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </motion.li>
            ))}
          </ul>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {ecosystem.foundationNote}
          </p>
        </div>
      </div>
    </section>
  );
}
