import counsellor from '@/assets/counsellor.webp';

/**
 * The visual bridge between the CTA and the footer.
 *
 * Her bottom edge is aligned to land *exactly* on the footer card's top
 * edge — she is never covered by it, so her crossed arms, hands and watch
 * stay fully visible. That alignment is what the offsets below encode:
 *
 *   desktop — `lg:bottom-[-1rem]` drops her 16px past the CTA's bottom,
 *             which is precisely the footer's own `pt-4`, so her bottom
 *             lands on the card's top edge.
 *   mobile  — `-mb-4` pulls the flow 16px up, cancelling that same `pt-4`
 *             for the identical result while she sits in normal flow.
 *
 * `z-30` keeps her in front of the footer card (`z-20`), so she reads as a
 * foreground cutout the footer begins beneath. The CTA section itself
 * carries no z-index on purpose: that leaves the decorative arc at
 * `z-auto`, below the footer, so the arc's overhang still hides behind the
 * card while she alone sits on top of it.
 *
 * Widths are paired with the `min-h` on her positioning parent in
 * `CounsellorCta` — grow one and the other has to grow with it, or her head
 * pushes out through the top of the ice background.
 *
 * `ClosingSection` deliberately does not clip overflow — see the note there.
 */
export function CounsellorVisual() {
  return (
    <div className="pointer-events-none relative z-30 mx-auto -mb-4 mt-8 w-[16rem] select-none sm:w-[20rem] lg:absolute lg:bottom-[-1rem] lg:right-4 lg:mx-0 lg:mb-0 lg:mt-0 lg:w-[22rem] xl:right-24 xl:w-[31rem]">
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
