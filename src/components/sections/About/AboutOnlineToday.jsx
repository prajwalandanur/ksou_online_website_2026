import { motion } from 'framer-motion';
import { ABOUT_ONLINE_TODAY } from '@/constants/about';
import { CountUpValue } from './CountUpValue';

const EASE = [0.22, 1, 0.36, 1];

/**
 * This is the page's introduction to KSOU Online, not another stat block —
 * the copy leads and the four platform figures sit beside it in support.
 * An earlier version led with the statistics and added a second row of
 * Learn/Access/Engage/Progress cards; both were cut, since the page already
 * explains accessible and flexible learning elsewhere.
 */
export function AboutOnlineToday() {
  return (
    <section
      aria-labelledby="about-online-heading"
      className="bg-muted/40 px-6 py-10 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col gap-4"
        >
          <h2
            id="about-online-heading"
            className="font-brand text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {ABOUT_ONLINE_TODAY.heading}
          </h2>
          <p className="text-base font-medium text-navy/80 sm:text-lg">
            {ABOUT_ONLINE_TODAY.subtitle}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            {ABOUT_ONLINE_TODAY.body}
          </p>
        </motion.div>

        <ul className="grid grid-cols-2 items-stretch gap-4 sm:gap-5">
          {ABOUT_ONLINE_TODAY.stats.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: EASE }}
              className="flex h-full flex-col gap-1 rounded-[22px] border border-border/80 bg-white px-5 py-6"
            >
              <CountUpValue
                value={stat.value}
                className="font-brand text-4xl leading-none text-primary"
              />
              <span className="text-[13px] font-medium leading-snug text-muted-foreground">
                {stat.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
