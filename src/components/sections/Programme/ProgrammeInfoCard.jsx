import { useContent } from '@/i18n/content';

export function ProgrammeInfoCard({ card }) {
  const { label, value, meta, description, Icon, breakdown, note, examFees } = card;
  const { programmeShared } = useContent();

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-16px_rgba(17,17,17,0.12)] sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {label}
        </span>
        <span className="font-brand text-3xl text-foreground">{value}</span>
        {meta && <span className="text-sm font-semibold text-primary">{meta}</span>}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

      {breakdown && (
        <div className="flex flex-col gap-2 rounded-2xl bg-muted/50 px-4 py-3">
          {breakdown.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-3 ${i > 0 ? 'border-t border-border/70 pt-2' : ''}`}
            >
              <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
              <span className="text-sm font-semibold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {note && (
        <div className="flex flex-col gap-1.5 border-t border-border/70 pt-4">
          <p className="text-xs text-muted-foreground">{note}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {examFees.map((fee) => (
              <li key={fee.label} className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground/70">
                  {programmeShared.examFeeLabels[fee.label] ?? fee.label}:
                </span>{' '}
                {fee.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
