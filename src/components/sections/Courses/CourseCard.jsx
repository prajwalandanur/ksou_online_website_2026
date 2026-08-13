import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonClasses';
import { APPLY_NOW_URL, PROSPECTUS_URL } from '@/constants/navigation';
import { useContent } from '@/i18n/content';
import { useLocalizedPath } from '@/i18n/useLanguage';
import { fill } from '@/i18n/format';

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
  const { ui } = useContent();

  if (!papers?.length) {
    return (
      <Button
        variant="secondary"
        aria-label={fill(ui.courses.previousQpsPendingAria, { name: courseName })}
        className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        {ui.courses.previousQps}
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
        aria-label={fill(ui.courses.previousQpsAria, { name: courseName })}
        className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        {ui.courses.previousQps}
      </Button>
    );
  }

  return (
    <details className="group/qp relative">
      <summary className={QP_TRIGGER_CLASSES}>
        <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
        {ui.courses.previousQps}
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
              aria-label={fill(ui.courses.previousQpsDisciplineAria, {
                name: courseName,
                discipline: paper.label,
              })}
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
 * The whole card navigates to the programme page, via a "stretched link":
 * the title link carries an `::after` pseudo-element pinned to the card's
 * bounds (`after:absolute after:inset-0`), so every pixel of the card's
 * informational area hit-tests as that link.
 *
 * It is done this way rather than wrapping the card in a <Link> or putting
 * an onClick on the <div> because the card also contains four of its own
 * actions. A wrapping link would nest <a> inside <a>, which is invalid HTML
 * and collapses into unusable screen-reader output; an onClick div would not
 * be keyboard-reachable and would need every child to stopPropagation.
 *
 * With the overlay, the child actions simply sit above it (`relative z-10`)
 * and receive their own clicks — no event plumbing, and the card exposes
 * exactly one tab stop (the title) instead of one per clickable region.
 * That is also why the image is no longer separately linked.
 *
 * Only courses with a `detailPath` (constants/courses.js) get any of this —
 * others stay non-interactive until their programme page exists.
 */
export function CourseCard({ course }) {
  const { name, description, duration, fee, Icon, image, detailPath, questionPapers } = course;
  const { ui } = useContent();
  // Without this the card is a one-way door out of Kannada: `detailPath` is
  // the English route, so every card on /kn navigated to /programmes/* and
  // silently switched the visitor's language mid-journey.
  const to = useLocalizedPath();

  const imageContent = image ? (
    <img
      src={image}
      alt={fill(ui.courses.imageAlt, { name })}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
    />
  ) : (
    <Icon className="h-12 w-12 text-primary/30" aria-hidden="true" />
  );

  return (
    // `relative` is what the title link's stretched ::after anchors to — it
    // must stay on this element, or the overlay escapes to the page.
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-14px_rgba(17,17,17,0.14)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(17,17,17,0.06),0_20px_40px_-16px_rgba(17,17,17,0.2)]">
      <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-[28px] bg-gradient-to-br from-primary/[0.07] via-muted to-muted">
        {imageContent}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-brand text-2xl text-foreground">
            {detailPath ? (
              // `group-hover:` rather than `hover:` only because it reads
              // clearer — the ::after covers the card, so hovering anywhere
              // already counts as hovering this link. That doubles as the
              // affordance: the title tints wherever the pointer is.
              <Link
                to={to(detailPath)}
                className="cursor-pointer transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-primary"
              >
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
              {ui.courses.duration}
            </span>
            <span className="text-sm font-semibold text-foreground">{duration}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {ui.courses.courseFee}
            </span>
            <span className="text-sm font-semibold text-primary">
              {fee} {ui.courses.perYear}
            </span>
          </div>
        </div>

        {/* `relative z-10` lifts these action rows above the title link's
            stretched ::after so they keep their own click targets. Every
            interactive child of this card needs to be inside one of these
            two wrappers, or the card-wide link will swallow it. */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {/* No per-course brochures exist; every card points at the one
              official prospectus, which covers all programmes. Same new-tab
              treatment as the question papers above. */}
          <Button
            as="a"
            href={PROSPECTUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            aria-label={fill(ui.courses.brochureAria, { name })}
            className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            {ui.courses.brochure}
          </Button>
          <QuestionPapersAction courseName={name} papers={questionPapers} />
        </div>

        <div className="relative z-10 mt-auto grid grid-cols-2 gap-3">
          {detailPath ? (
            <Button
              to={to(detailPath)}
              variant="secondary"
              className="justify-center py-2.5 text-sm"
            >
              {ui.common.learnMore}
            </Button>
          ) : (
            <Button
              variant="secondary"
              aria-label={fill(ui.courses.learnMorePendingAria, { name })}
              className="justify-center py-2.5 text-sm"
            >
              {ui.common.learnMore}
            </Button>
          )}
          <Button to={to(APPLY_NOW_URL)} className="justify-center py-2.5 text-sm">
            {ui.common.applyNow}
          </Button>
        </div>
      </div>
    </div>
  );
}
