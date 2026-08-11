import campus from '@/assets/hero-campus.webp';

/**
 * The KSOU campus photo is a 16:9 landscape, so this slot is landscape too
 * — the previous placeholder was `aspect-[4/5]` portrait (shaped for a
 * cutout of a student), and cropping the photo into that would have thrown
 * away most of the building. `object-cover` at 4:3 trims the sides only
 * slightly, keeping both the campus and the student in frame.
 *
 * Presented as a rounded card with the site's usual soft elevation so it
 * reads as composed rather than a raw photo dropped into the layout.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[36px] bg-primary/[0.07] blur-2xl"
      />
      <img
        src={campus}
        alt="A KSOU Online student holding a laptop outside the Karnataka State Open University campus"
        // Above the fold on the landing page — never lazy-load this.
        fetchPriority="high"
        className="relative aspect-[4/3] w-full rounded-[28px] object-cover shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_48px_-24px_rgba(17,17,17,0.28)]"
      />
    </div>
  );
}
