import { useState } from 'react';
import { ProgrammeStructureCard } from './ProgrammeStructureCard';

export function ProgrammeStructure({ programme }) {
  const { structure } = programme;
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggleGroup = (id) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const gridColsClass = structure.groups.length > 6 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section aria-labelledby="programme-structure-heading" className="bg-muted/40 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-10 lg:px-8">
        <h2
          id="programme-structure-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {structure.heading}
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          {structure.subheading}
        </p>
      </div>

      {/* Desktop/tablet: grid — auto-rows-fr keeps every card the same height across
          the whole grid regardless of title/description length. */}
      <div
        className={`mx-auto hidden w-full max-w-7xl auto-rows-fr grid-cols-2 gap-5 px-6 sm:grid lg:px-8 ${gridColsClass}`}
      >
        {structure.groups.map((group) => (
          <ProgrammeStructureCard
            key={group.id}
            group={group}
            isOpen={openIds.has(group.id)}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </div>

      {/* Mobile: horizontal swipeable row */}
      <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {structure.groups.map((group) => (
          <div key={group.id} className="w-[80%] shrink-0 snap-start">
            <ProgrammeStructureCard
              group={group}
              isOpen={openIds.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
