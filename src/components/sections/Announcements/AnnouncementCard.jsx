import {
  ANNOUNCEMENT_CATEGORIES,
  announcementTarget,
  formatAnnouncementDate,
} from '@/constants/announcements';
import { Button } from '@/components/ui/Button';

/**
 * One notice on the announcements page. Importance is a restrained gold-on-
 * white badge rather than a red warning block — the brief asks for premium,
 * not alarming. The gold is a border/dot accent only; the badge's own text
 * stays navy, since --color-gold is far too light to read at this size.
 */
export function AnnouncementCard({ announcement }) {
  const category = ANNOUNCEMENT_CATEGORIES[announcement.category];
  const target = announcementTarget(announcement);

  return (
    <article className="flex flex-col rounded-[24px] border border-border bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-scrolled sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.07em] text-primary-hover">
          {category?.label ?? 'General'}
        </span>

        {announcement.isImportant && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.07em] text-navy">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            Important
          </span>
        )}

        {/* Optional by design — a notice whose document states no date shows
            none rather than a fabricated one. */}
        {announcement.date && (
          <time
            dateTime={announcement.date}
            className="ml-auto text-[13px] font-medium text-muted-foreground"
          >
            {formatAnnouncementDate(announcement.date)}
          </time>
        )}
      </div>

      <h2 className="mt-4 font-brand text-xl leading-snug text-foreground sm:text-[1.4rem]">
        {announcement.title}
      </h2>

      {announcement.description && (
        <p className="mt-2 text-[15px] font-light leading-relaxed text-muted-foreground">
          {announcement.description}
        </p>
      )}

      {/* mt-auto so the action sits on the card's baseline — cards in a grid
          row stretch to equal height, and ragged buttons read as sloppy. */}
      <div className="mt-auto pt-6">
        {target.isPlaceholder ? (
          // No document has been connected for this notice yet. The brief is
          // explicit that URLs must not be invented, so this says so plainly
          // instead of linking somewhere that doesn't answer the question.
          <Button
            variant="secondary"
            disabled
            aria-label={`${announcement.title} — details coming soon`}
            className="cursor-not-allowed opacity-60 hover:translate-y-0 hover:border-border hover:bg-white hover:shadow-none"
          >
            Details coming soon
          </Button>
        ) : (
          <Button
            variant="secondary"
            withArrow
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${announcement.title} — ${target.label} (PDF, opens in a new tab)`}
          >
            {target.label}
          </Button>
        )}
      </div>
    </article>
  );
}
