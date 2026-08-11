export function StatCardRow({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 rounded-[18px] border border-border/80 bg-white px-4 py-4 text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </span>
          <span className="font-brand text-xl text-primary">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
