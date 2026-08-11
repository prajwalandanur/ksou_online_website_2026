export function StepTimeline({ steps }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col gap-3 rounded-[20px] border border-border/80 bg-white p-5"
        >
          <span className="font-brand text-2xl text-primary">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-sm font-semibold text-foreground">{step.title}</span>
          {step.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
