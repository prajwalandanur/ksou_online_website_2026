import counsellor from '@/assets/counsellor.webp';

/**
 * The visual bridge between the CTA and the footer. On desktop she is
 * absolutely positioned against the CTA's right edge and hangs below its
 * bottom edge so the footer card *occludes* her lower body — she reads as
 * standing behind the footer rather than pasted on top of it. That
 * occlusion is the whole point of the effect: the source photo ends in a
 * hard crop at the forearms, and letting the card cover that crop is what
 * keeps her from looking like a sticker. It depends on the CTA sitting at a
 * lower z-index than the footer (see ClosingSection).
 *
 * Below `lg` she drops into normal flow beneath the button (per the source
 * spec's stacking order) at a size that stays present without taking over
 * the screen. The negative bottom margin there does the same job the
 * absolute offset does on desktop: pulls her far enough down that the
 * footer card still covers her cropped edge.
 *
 * `ClosingSection` deliberately does not clip overflow — see the note there.
 */
export function CounsellorVisual() {
  return (
    <div className="pointer-events-none relative mx-auto -mb-12 mt-8 w-[13.5rem] select-none sm:-mb-16 sm:w-[14.5rem] lg:absolute lg:bottom-[-5.5rem] lg:right-0 lg:mx-0 lg:mb-0 lg:mt-0 lg:w-[17rem] xl:w-[19rem]">
      {/* Soft halo so the cutout sits on the ice background instead of
          floating on it — kept well under the figure's own contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 bottom-6 top-10 rounded-[999px] bg-primary/10 blur-3xl"
      />
      <img
        src={counsellor}
        alt="A KSOU Online admissions counsellor wearing a headset"
        loading="lazy"
        className="relative block w-full object-contain"
      />
    </div>
  );
}
