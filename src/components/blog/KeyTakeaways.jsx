import { CircleCheckBig } from 'lucide-react';

export function KeyTakeaways({ points }) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-border/80 bg-muted/50 p-6 sm:p-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">Key Takeaways</span>
      <ul className="flex flex-col gap-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
