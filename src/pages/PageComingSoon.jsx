export function PageComingSoon({ title }) {
  return (
    <main className="flex min-h-[160vh] flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {title}
      </p>
      <h1 className="font-brand text-4xl text-foreground">Coming soon</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        This section hasn't been built yet — scroll to preview the navigation
        bar's sticky and shrink-on-scroll behaviour.
      </p>
    </main>
  );
}
