import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';
import { fill } from '@/i18n/format';

const EASE = [0.22, 1, 0.36, 1];

function WhyChooseCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
      className="group flex h-full flex-col gap-4 rounded-[24px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-16px_rgba(17,17,17,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-brand text-2xl text-gold">{item.number}</span>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ease-out group-hover:scale-110">
          <item.Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function ProgrammeWhyChoose({ programme }) {
  const { whyChoose, shortName } = programme;
  const { ui } = useContent();
  const heading = ui.programme.whyChoose;

  return (
    <section aria-labelledby="programme-why-heading" className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-12 lg:px-8">
        <h2
          id="programme-why-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {heading.headingLead}{' '}
          <span className="text-primary">
            {fill(heading.headingAccent, { name: shortName })}
          </span>
          {heading.headingTrail}
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          {whyChoose.intro}
        </p>
      </div>

      {/* Desktop/tablet: 3-column card grid — auto-rows-fr keeps every row (not just
          each row's own columns) the same height, so cards stay equal across the
          whole grid regardless of description length. */}
      <div className="mx-auto hidden w-full max-w-7xl auto-rows-fr grid-cols-2 gap-5 px-6 sm:grid lg:grid-cols-3 lg:gap-6 lg:px-8">
        {whyChoose.items.map((item, i) => (
          <WhyChooseCard key={item.number} item={item} index={i} />
        ))}
      </div>

      {/* Mobile: horizontal swipeable row */}
      <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {whyChoose.items.map((item, i) => (
          <div key={item.number} className="w-[78%] shrink-0 snap-start">
            <WhyChooseCard item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
