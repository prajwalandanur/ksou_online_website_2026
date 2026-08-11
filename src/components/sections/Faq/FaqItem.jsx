import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export function FaqItem({ faq, isOpen, onToggle }) {
  const { id, question, answer } = faq;
  const answerId = `faq-answer-${id}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-white transition-shadow duration-300 ease-out hover:shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_24px_-16px_rgba(17,17,17,0.12)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
      >
        <span className="text-base font-semibold text-foreground sm:text-lg">{question}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground'
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-8 sm:pb-7 sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
