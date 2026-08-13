import { Award } from 'lucide-react';
import { useContent } from '@/i18n/content';

/**
 * Editorial-scale frame for the degree certificate — shadow + depth so it
 * reads as a real credential rather than a small generic card.
 *
 * `src` is optional and the placeholder branch is deliberately kept: only one
 * sample certificate exists (a Master of Commerce), and if a per-programme
 * scan ever arrives for some pages but not others, those pages should fall
 * back to the honest "to be added" state rather than showing another
 * programme's document.
 *
 * The frame is 4:3 because that is the artwork's own ratio — the supplied
 * image carries its own decorative border, ribbons and cap out to the edges,
 * so letterboxing it inside the old 7:5 card would have framed a frame.
 */
export function ProgrammeCertificateVisual({ label, src, alt }) {
  const { ui } = useContent();

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 hidden aspect-[4/3] w-full rounded-[20px] border border-gold/30 bg-gold/5 sm:block"
      />

      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="relative aspect-[4/3] w-full rounded-[20px] border border-border bg-white object-cover shadow-[0_1px_2px_rgba(17,17,17,0.04),0_32px_64px_-24px_rgba(17,17,17,0.28)]"
        />
      ) : (
        <div
          role="img"
          aria-label={label}
          className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-border bg-white p-8 text-center shadow-[0_1px_2px_rgba(17,17,17,0.04),0_32px_64px_-24px_rgba(17,17,17,0.28)]"
        >
          <Award className="h-12 w-12 text-primary/30" aria-hidden="true" />
          <p className="text-sm font-medium text-muted-foreground">
            {ui.programme.degree.certificatePending}
          </p>
        </div>
      )}
    </div>
  );
}
