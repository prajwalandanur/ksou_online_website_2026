import { UserRound } from 'lucide-react';

/**
 * The Vice-Chancellor's portrait, or the slot reserved for it.
 *
 * No official photograph has been supplied. Rather than substitute a stock
 * image or a likeness lifted from elsewhere — either of which would
 * misrepresent a real, serving public official — this renders an editorial
 * reserved frame at the exact size and shape the real photograph will take,
 * so nothing about the layout moves when it lands. Set
 * `ABOUT_LEADERSHIP.portrait` to a real import and this switches to an
 * `<img>` with no other change.
 *
 * Deliberately not the blog's dashed `ImagePlaceholder`: this frame is
 * roughly half a section wide and a dashed box at that scale reads as a
 * broken image. It is a portrait-proportioned panel in the page's own visual
 * language instead — soft tint, hairline border, the same 28px radius the
 * rest of the site uses.
 */
export function ProfilePortrait({ src, alt, label, className = '' }) {
  const frame =
    'aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-[0_1px_2px_rgba(17,17,17,0.04),0_32px_64px_-32px_rgba(17,17,17,0.36)]';

  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`${frame} object-cover ${className}`} />;
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — photograph to be added`}
      className={`${frame} flex flex-col items-center justify-center gap-3 border border-border bg-gradient-to-b from-muted to-muted/40 ${className}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary/50">
        <UserRound className="h-8 w-8" aria-hidden="true" strokeWidth={1.5} />
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
