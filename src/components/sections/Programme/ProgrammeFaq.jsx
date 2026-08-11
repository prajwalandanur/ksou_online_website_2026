import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APPLY_NOW_URL } from '@/constants/navigation';

const EASE = [0.22, 1, 0.36, 1];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border bg-white ${
        isOpen ? 'border-primary/40' : 'border-border/80'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProgrammeFaq({ programme }) {
  const { faqs, shortName } = programme;
  const defaultFaqs = faqs.defaultIds
    .map((id) => faqs.items.find((faq) => faq.id === id))
    .filter(Boolean);
  const remainingFaqs = faqs.items.filter((faq) => !faqs.defaultIds.includes(faq.id));

  const [openId, setOpenId] = useState(defaultFaqs[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section aria-labelledby="programme-faq-heading" className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-12 lg:px-8">
        <h2
          id="programme-faq-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          Answers to common questions about the KSOU Online {shortName} programme.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 lg:px-8">
        {defaultFaqs.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}

        <AnimatePresence initial={false}>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              {remainingFaqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {remainingFaqs.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="mx-auto mt-2 cursor-pointer text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className="mx-auto mt-10 w-full max-w-4xl px-6 sm:mt-14 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-[28px] bg-primary px-6 py-10 text-center sm:px-10 sm:py-12">
          <h3 className="font-brand text-2xl text-primary-foreground sm:text-3xl lg:text-4xl">
            Ready to Begin Your {shortName} Journey?
          </h3>
          <p className="max-w-xl text-sm text-primary-foreground/85 sm:text-base">
            Take the next step with KSOU Online.
          </p>
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <Button
              to={APPLY_NOW_URL}
              withArrow
              variant="onPrimary"
              className="justify-center py-3.5 text-base"
            >
              Apply Now
            </Button>
            <Button
              variant="outlineOnPrimary"
              aria-label="View programme prospectus — coming soon"
              className="justify-center gap-2 py-3.5 text-base"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              View Prospectus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
