import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APPLY_NOW_URL } from '@/constants/navigation';

/**
 * The image/title link to a real detail page only for courses that have one
 * (`detailPath` in constants/courses.js) — others stay non-interactive until
 * their own programme page exists.
 */
export function CourseCard({ course }) {
  const { name, description, duration, fee, Icon, image, detailPath } = course;

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
          <Button
            variant="secondary"
            aria-label={`Download brochure for ${name} — coming soon`}
            className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            Brochure
          </Button>
          <Button
            variant="secondary"
            aria-label={`Download previous question papers for ${name} — coming soon`}
            className="justify-center gap-1.5 py-2.5 text-xs sm:text-sm"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            Previous QPs
          </Button>
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
