import { ImageIcon } from 'lucide-react';

/**
 * Reserved slot for real photography — none has been supplied for the blog
 * content yet. Swap in a real <img src="..." alt="..." loading="lazy" />
 * here once available; keep `aspectClass` so the surrounding layout doesn't
 * shift when the real image lands.
 */
export function ImagePlaceholder({
  label = 'Image placeholder',
  aspectClass = 'aspect-[16/9]',
  className = '',
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — image coming soon`}
      className={`flex ${aspectClass} w-full flex-col items-center justify-center gap-2 rounded-[24px] border border-dashed border-border bg-muted/60 text-muted-foreground ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-primary/30" aria-hidden="true" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
