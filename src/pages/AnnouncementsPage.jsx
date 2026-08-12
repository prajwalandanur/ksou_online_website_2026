import { useMemo, useState } from 'react';
import { ANNOUNCEMENTS } from '@/constants/announcements';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { AnnouncementCard } from '@/components/sections/Announcements/AnnouncementCard';
import { AnnouncementFilters } from '@/components/sections/Announcements/AnnouncementFilters';

const SEO = {
  title: 'Announcements — KSOU Online',
  description:
    'Important updates, academic notices and university information for KSOU Online learners — admissions, examinations and academic announcements.',
};

/**
 * "Important" is a prominence flag rather than a category (see the note in
 * constants/announcements.js), so its filter reads the flag while the rest
 * match on category.
 */
const FILTERS = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'admissions', label: 'Admissions', match: (a) => a.category === 'admissions' },
  { id: 'examination', label: 'Examination', match: (a) => a.category === 'examination' },
  { id: 'academic', label: 'Academic', match: (a) => a.category === 'academic' },
  { id: 'important', label: 'Important', match: (a) => a.isImportant },
];

export function AnnouncementsPage() {
  useDocumentMeta(SEO.title, SEO.description);

  const [activeId, setActiveId] = useState('all');

  const visible = useMemo(() => {
    const filter = FILTERS.find((f) => f.id === activeId) ?? FILTERS[0];
    return ANNOUNCEMENTS.filter(filter.match);
  }, [activeId]);

  return (
    <main className="flex flex-col gap-10 py-10 sm:gap-12 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 lg:px-8">
        <h1 className="font-brand text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Announcements
        </h1>
        <p className="max-w-2xl text-base font-light text-muted-foreground sm:text-lg">
          Important updates, academic notices and university information for KSOU Online learners.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <AnnouncementFilters
          filters={FILTERS}
          activeId={activeId}
          onChange={setActiveId}
          resultCount={visible.length}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {visible.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {visible.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <p className="rounded-[24px] border border-border bg-muted/60 px-6 py-10 text-center text-[15px] font-light text-muted-foreground">
            No announcements in this category right now.
          </p>
        )}
      </div>
    </main>
  );
}
