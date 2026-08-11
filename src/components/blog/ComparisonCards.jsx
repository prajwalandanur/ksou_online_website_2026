export function ComparisonCards({ left, right }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[left, right].map((column) => (
        <div
          key={column.title}
          className="flex flex-col gap-3 rounded-[20px] border border-border/80 bg-white p-5 sm:p-6"
        >
          <span className="font-brand text-lg text-foreground">{column.title}</span>
          <ul className="flex flex-col gap-2.5">
            {column.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
