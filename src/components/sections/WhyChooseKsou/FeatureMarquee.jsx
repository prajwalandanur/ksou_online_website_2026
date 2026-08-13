import { useContent } from '@/i18n/content';
import { useMarquee } from '@/hooks/useMarquee';
import { FeatureCard } from './FeatureCard';

export function FeatureMarquee() {
  const { whyChoose } = useContent();
  const { containerRef, pause, resume, scheduleResume, prefersReducedMotion } = useMarquee({
    speedPxPerSec: 48,
  });

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20 lg:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20 lg:w-28"
      />

      <div
        ref={containerRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={scheduleResume}
        onWheel={() => {
          pause();
          scheduleResume();
        }}
        className="flex overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">
          {whyChoose.map((feature, i) => (
            <li key={feature.id} className="shrink-0">
              <FeatureCard feature={feature} index={i} />
            </li>
          ))}
        </ul>

        {!prefersReducedMotion && (
          <ul aria-hidden="true" className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">
            {whyChoose.map((feature, i) => (
              <li key={`dup-${feature.id}`} className="shrink-0">
                <FeatureCard feature={feature} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
