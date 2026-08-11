import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export function StepCard({ step, isOpen, onToggle, className = '' }) {
  const { id, title, tagline, description, detail } = step;
  const detailId = `how-it-works-detail-${id}`;

  return (
    <div
      className={`flex flex-col rounded-[20px] border border-border/80 bg-white p-5 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_24px_-16px_rgba(17,17,17,0.12)] ${className}`}
    >
      <div className="flex min-h-[128px] flex-col gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={detailId}
          className="flex w-full cursor-pointer items-start justify-between gap-2 text-left"
        >
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">{title}</span>
            <span className="text-xs font-semibold text-primary">{tagline}</span>
          </span>
          <ChevronDown
            className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={detailId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pt-1 text-sm leading-relaxed text-foreground/80">{detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
