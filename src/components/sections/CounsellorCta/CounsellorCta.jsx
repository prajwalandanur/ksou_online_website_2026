import { Button } from '@/components/ui/Button';
import { APPLY_NOW_URL } from '@/constants/navigation';

export function CounsellorCta() {
  return (
    <section aria-labelledby="counsellor-cta-heading" className="relative py-16 sm:py-20">
      <div className="flex max-w-[65%] flex-col items-start gap-5 sm:max-w-lg">
        <h2
          id="counsellor-cta-heading"
          className="font-brand text-3xl leading-[1.2] text-foreground sm:text-4xl lg:text-[2.75rem]"
        >
          Have Questions?
          <br />
          Connect With Our Counsellor
        </h2>

        <p className="text-base font-light text-muted-foreground sm:text-lg">
          Fill in your information, and our team will connect with you shortly.
        </p>

        <Button to={APPLY_NOW_URL} withArrow className="mt-2 py-3.5 text-base">
          Apply Now
        </Button>
      </div>
    </section>
  );
}
