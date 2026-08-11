import { Button } from '@/components/ui/Button';

export function ArticleCta({ heading, description }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[28px] bg-primary px-6 py-10 text-center sm:px-10 sm:py-12">
      <h3 className="font-brand text-2xl text-primary-foreground sm:text-3xl lg:text-4xl">{heading}</h3>
      <p className="max-w-xl text-sm text-primary-foreground/85 sm:text-base">{description}</p>
      <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
        <Button to="/programmes" withArrow variant="onPrimary" className="justify-center py-3.5 text-base">
          Explore Programmes
        </Button>
        <Button
          variant="outlineOnPrimary"
          aria-label="Talk to a counsellor — coming soon"
          className="justify-center py-3.5 text-base"
        >
          Talk to a Counsellor
        </Button>
      </div>
    </div>
  );
}
