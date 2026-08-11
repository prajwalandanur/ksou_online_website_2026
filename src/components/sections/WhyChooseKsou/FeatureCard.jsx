const ACCENT_CLASSES = {
  blue: 'bg-primary',
  gold: 'bg-amber-400',
};

export function FeatureCard({ feature, index }) {
  const { number, title, description, icon } = feature;
  const accent = index % 2 === 0 ? 'blue' : 'gold';

  return (
    <div className="flex w-[270px] shrink-0 flex-col gap-5 rounded-[24px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-16px_rgba(17,17,17,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(17,17,17,0.06),0_18px_36px_-16px_rgba(17,17,17,0.18)] sm:w-[300px]">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.08]">
          <img src={icon} alt="" aria-hidden="true" className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_CLASSES[accent]}`} aria-hidden="true" />
          <span className="font-brand text-sm text-muted-foreground">{number}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
