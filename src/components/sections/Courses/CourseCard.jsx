import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonClasses';
import { APPLY_NOW_URL, PROSPECTUS_URL } from '@/constants/navigation';

// Tighter padding/gap than the sibling Brochure button so the extra chevron
// still fits on one line at the card's width — otherwise the label wraps and
// this button grows taller than the one beside it.
const QP_TRIGGER_CLASSES = buttonClasses(
  'secondary',
  'w-full list-none justify-center gap-1 whitespace-nowrap px-3 py-2.5 text-xs sm:text-sm [&::-webkit-details-marker]:hidden',
);

/**
 * Renders the "Previous QPs" action. Most programmes have one combined
 * paper and get a single link; MA's are published per discipline, so it
 * gets a small disclosure instead of arbitrarily picking one file.
 *
 * These open in a new tab (the browser's built-in PDF viewer) rather than
 * saving to disk — students want to read a paper, not collect it, and it
 * matches how the main KSOU site serves them. Note there is deliberately
 * no `download` attribute: that attribute is what forces a save, and
 * adding it back would silently undo this.
 *
 * The panel opens *upward* on purpose: the card wrapper is `overflow-hidden`
 * (it clips the image's rounded top), so a downward panel would be cut off.
 */
function QuestionPapersAction({ courseName, papers }) {
  if (!papers?.length) {
    return (
      <Button
        variant="secondary"
        aria-label={`View previous question papers for ${courseName} — coming soon`}
        className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        Previous QPs
      </Button>
    );
  }

  if (papers.length === 1) {
    return (
      <Button
        as="a"
        href={papers[0].href}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        aria-label={`View previous question papers for ${courseName} (PDF, opens in a new tab)`}
        className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        Previous QPs
      </Button>
    );
  }

  return (
    <details className="group/qp relative">
      <summary className={QP_TRIGGER_CLASSES}>
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        Previous QPs
        <ChevronDown
          className="h-3 w-3 shrink-0 transition-transform duration-200 group-open/qp:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <ul className="absolute bottom-full left-0 z-20 mb-2 w-full min-w-[9rem] rounded-2xl border border-border bg-white p-1.5 shadow-[0_12px_28px_-10px_rgba(17,17,17,0.28)]">
        {papers.map((paper) => (
          <li key={paper.href}>
            <a
              href={paper.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${courseName} ${paper.label} previous question papers (PDF, opens in a new tab)`}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {paper.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * The image/title link to a real detail page only for courses that have one
 * (`detailPath` in constants/courses.js) — others stay non-interactive until
 * their own programme page exists.
 */
export function CourseCard({ course }) {
  const { name, description, duration, fee, Icon, image, detailPath, questionPapers } = course;

  const imageContent = image ? (
    <img
      src={image}
      alt={`${name} students`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
    />
  ) : (
    <Icon className="h-12 w-12 text-primary/30" aria-hidden="true" />
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-14px_rgba(17,17,17,0.14)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(17,17,17,0.06),0_20px_40px_-16px_rgba(17,17,17,0.2)]">
      {detailPath ? (
        <Link
          to={detailPath}
          aria-label={`View ${name} programme details`}
          className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-[28px] bg-gradient-to-br from-primary/[0.07] via-muted to-muted"
        >
          {imageContent}
        </Link>
      ) : (
        <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-[28px] bg-gradient-to-br from-primary/[0.07] via-muted to-muted">
          {imageContent}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-brand text-2xl text-foreground">
            {detailPath ? (
              <Link to={detailPath} className="transition-colors duration-200 hover:text-primary">
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Duration
            </span>
            <span className="text-sm font-semibold text-foreground">{duration}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Course Fee
            </span>
            <span className="text-sm font-semibold text-primary">{fee} / Year</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* No per-course brochures exist; every card points at the one
              official prospectus, which covers all programmes. Same new-tab
              treatment as the question papers above. */}
          <Button
            as="a"
            href={PROSPECTUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            aria-label={`View the KSOU Online prospectus, which covers ${name} (PDF, opens in a new tab)`}
            className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            Brochure
          </Button>
          <QuestionPapersAction courseName={name} papers={questionPapers} />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          {detailPath ? (
            <Button to={detailPath} variant="secondary" className="justify-center py-2.5 text-sm">
              Learn More
            </Button>
          ) : (
            <Button
              variant="secondary"
              aria-label={`Learn more about ${name} — coming soon`}
              className="justify-center py-2.5 text-sm"
            >
              Learn More
            </Button>
          )}
          <Button to={APPLY_NOW_URL} className="justify-center py-2.5 text-sm">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
