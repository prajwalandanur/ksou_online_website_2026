import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

/**
 * Highlights the section currently in view as the reader scrolls. Runs
 * independently in both the sidebar and inline-mobile instances (two
 * observers instead of a shared one) — harmless since only one variant is
 * ever visible at a time (`hidden lg:block` / `lg:hidden`), and it avoids
 * threading observer state between two structurally separate DOM locations
 * (grid sidebar vs. inline in the article column).
 */
function useActiveSection(sections) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

function TocList({ sections, activeId, onNavigate }) {
  return (
    <ul className="flex flex-col gap-1">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={onNavigate}
            className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
              activeId === section.id
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {section.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ sections, variant = 'sidebar' }) {
  const activeId = useActiveSection(sections);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (sections.length === 0) return null;

  if (variant === 'sidebar') {
    return (
      <nav
        aria-label="Table of contents"
        className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-3 overflow-y-auto rounded-[20px] border border-border/80 bg-white p-5"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          On this page
        </span>
        <TocList sections={sections} activeId={activeId} />
      </nav>
    );
  }

  return (
    <div className="rounded-[20px] border border-border/80 bg-white">
      <button
        type="button"
        onClick={() => setIsMobileOpen((current) => !current)}
        aria-expanded={isMobileOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <List className="h-4 w-4 text-primary" aria-hidden="true" />
          Table of Contents
        </span>
      </button>
      {isMobileOpen && (
        <div className="px-3 pb-4">
          <TocList
            sections={sections}
            activeId={activeId}
            onNavigate={() => setIsMobileOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
