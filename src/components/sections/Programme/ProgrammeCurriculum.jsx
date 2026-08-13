import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useContent } from '@/i18n/content';
import { fill } from '@/i18n/format';

const EASE = [0.22, 1, 0.36, 1];

function SubjectList({ term }) {
  const { ui } = useContent();
  const { subjectTypes, creditsShort } = ui.programme.curriculum;

  return (
    <div className="flex flex-col gap-2">
      {term.subjects.map((subject) => (
        <div
          key={subject.title}
          className="flex items-center justify-between gap-3 rounded-2xl bg-muted/50 px-4 py-3"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">{subject.title}</span>
            {subject.type && (
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {subjectTypes[subject.type] ?? subject.type}
              </span>
            )}
          </div>
          {subject.credits && (
            <span className="shrink-0 text-sm font-semibold text-primary">
              {subject.credits} {creditsShort}
            </span>
          )}
        </div>
      ))}
      {term.electiveNote && (
        <p className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
          {term.electiveNote}
        </p>
      )}
    </div>
  );
}

export function ProgrammeCurriculum({ programme }) {
  const { curriculum, shortName } = programme;
  const { ui } = useContent();
  const [activeTabId, setActiveTabId] = useState(curriculum.terms[0].id);
  const [openMobileId, setOpenMobileId] = useState(null);
  const activeTerm = curriculum.terms.find((term) => term.id === activeTabId);

  return (
    <section aria-labelledby="programme-curriculum-heading" className="bg-muted/40 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-10 lg:px-8">
        <h2
          id="programme-curriculum-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {fill(ui.programme.curriculum.heading, { name: shortName })}
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          {curriculum.subtitle}
        </p>
        {curriculum.note && (
          <p className="text-xs italic text-muted-foreground">{curriculum.note}</p>
        )}
      </div>

      {/* Desktop/tablet: horizontal term selector + panel */}
      <div className="mx-auto hidden w-full max-w-4xl px-6 sm:block lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 rounded-full border border-border/80 bg-white p-1.5">
          {curriculum.terms.map((term) => (
            <button
              key={term.id}
              type="button"
              onClick={() => setActiveTabId(term.id)}
              aria-pressed={activeTabId === term.id}
              className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                activeTabId === term.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {term.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTerm.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-6 rounded-[24px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-16px_rgba(17,17,17,0.12)] sm:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-brand text-xl text-foreground">{activeTerm.label}</h3>
              {activeTerm.credits && (
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {fill(ui.programme.curriculum.credits, { count: activeTerm.credits })}
                </span>
              )}
            </div>
            <SubjectList term={activeTerm} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: accordion */}
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 sm:hidden">
        {curriculum.terms.map((term) => {
          const isOpen = openMobileId === term.id;
          return (
            <div
              key={term.id}
              className={`overflow-hidden rounded-[20px] border bg-white ${
                isOpen ? 'border-primary/40' : 'border-border/80'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenMobileId(isOpen ? null : term.id)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{term.label}</span>
                  {term.credits && (
                    <span className="text-xs text-muted-foreground">
                      {fill(ui.programme.curriculum.credits, { count: term.credits })}
                    </span>
                  )}
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
                    <div className="px-5 pb-5">
                      <SubjectList term={term} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
