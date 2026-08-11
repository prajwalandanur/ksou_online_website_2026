import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ABOUT_CREDIBILITY } from '@/constants/about';
import { KSOU_MAIN_WEBSITE_URL } from '@/constants/footer';

const EASE = [0.22, 1, 0.36, 1];

export function AboutCredibility() {
  return (
    <section
      aria-labelledby="about-credibility-heading"
      className="px-6 py-10 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="about-credibility-heading"
          className="max-w-2xl font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
        >
          {ABOUT_CREDIBILITY.heading}
        </h2>

        <ul className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-6">
          {ABOUT_CREDIBILITY.panels.map((panel, i) => (
            <motion.li
              key={panel.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
              className="flex flex-col gap-4 rounded-[28px] border border-border/80 bg-white p-7 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_36px_-20px_rgba(17,17,17,0.16)] sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <panel.Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <span className="font-brand text-2xl leading-tight text-navy">
                {panel.credential}
              </span>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{panel.body}</p>

              {panel.linkLabel && (
                <a
                  href={KSOU_MAIN_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  {panel.linkLabel}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
