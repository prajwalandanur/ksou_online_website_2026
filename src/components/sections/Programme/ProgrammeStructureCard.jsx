import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useContent } from '@/i18n/content';

const EASE = [0.22, 1, 0.36, 1];

export function ProgrammeStructureCard({ group, isOpen, onToggle }) {
  const { id, title, description, meta, subjects, note, Icon } = group;
  const { ui } = useContent();
  const listId = `programme-structure-${id}`;

  return (
    <div
      className={`flex h-full flex-col rounded-[24px] border bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-16px_rgba(17,17,17,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 ${
        isOpen ? 'border-primary/40' : 'border-border/80'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={listId}
        className="flex w-full flex-1 cursor-pointer flex-col items-start gap-4 text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <ChevronDown
            className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-brand text-xl text-foreground">{title}</h3>
          {meta && (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              {meta}
            </span>
          )}
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-primary">
          {isOpen ? ui.programme.structure.hideDetails : ui.programme.structure.showDetails}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-2 border-t border-border/70 pt-4">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {subject}
                </div>
              ))}
              {note && <p className="pt-1 text-xs italic text-muted-foreground">{note}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
