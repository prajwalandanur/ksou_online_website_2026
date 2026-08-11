import { motion } from 'framer-motion';
import { ACCREDITATIONS } from '@/constants/accreditation';
import { useAutoScrollCarousel } from '@/hooks/useAutoScrollCarousel';

const EASE = [0.22, 1, 0.36, 1];

function AccreditationContent({ logo, alt, heading, description }) {
  return (
    <>
      <img
        src={logo}
        alt={alt}
        className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-[15px] font-bold tracking-tight text-foreground">
          {heading}
        </p>
        <p className="text-[13px] font-medium text-muted-foreground">
          {description}
        </p>
      </div>
    </>
  );
}

export function AccreditationStrip() {
  const { containerRef, pause } = useAutoScrollCarousel(ACCREDITATIONS.length, {
    intervalMs: 2000,
  });

  return (
    <div className="mx-auto mt-16 max-w-7xl border-t border-border/70 pt-10 sm:mt-20 sm:pt-12">
      {/* Mobile: single row, auto-advancing every 2s, swipeable, pauses on touch */}
      <ul
        ref={containerRef}
        onPointerDown={pause}
        onTouchStart={pause}
        onWheel={pause}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
      >
        {ACCREDITATIONS.map((item) => (
          <li
            key={item.heading}
            className="flex shrink-0 basis-[80%] snap-start flex-col items-center gap-3 text-center"
          >
            <AccreditationContent {...item} />
          </li>
        ))}
      </ul>

      {/* Tablet/desktop: static three-column row */}
      <ul className="hidden gap-8 sm:grid sm:grid-cols-3 sm:gap-10">
        {ACCREDITATIONS.map((item, i) => (
          <motion.li
            key={item.heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="flex flex-col items-center gap-3 rounded-2xl p-3 text-center transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <AccreditationContent {...item} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
