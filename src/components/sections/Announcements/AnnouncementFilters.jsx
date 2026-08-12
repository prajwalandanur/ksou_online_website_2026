/**
 * Lightweight category filter for the announcements page. Deliberately a
 * plain row of toggle buttons rather than a search system — the brief asks
 * for the quickest possible path to the right notice, nothing more.
 *
 * Rendered as a tablist so keyboard and screen-reader users get the same
 * "which view am I on" signal that the pill styling gives sighted users.
 */
export function AnnouncementFilters({ filters, activeId, onChange, resultCount }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Filter announcements by category"
        className="flex flex-wrap items-center gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter.id === activeId;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(filter.id)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[13.5px] font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground/70 hover:border-primary/40 hover:bg-muted hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Announces the filtered count to screen readers, which otherwise get
          no feedback that pressing a filter changed the list below. */}
      <p aria-live="polite" className="text-[13.5px] font-medium text-muted-foreground">
        {resultCount === 1 ? '1 announcement' : `${resultCount} announcements`}
      </p>
    </div>
  );
}
