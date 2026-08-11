import { motion, useReducedMotion } from 'framer-motion';
import { useVerticalTimelineTrack } from '@/hooks/useVerticalTimelineTrack';
import { StepIcon } from './StepIcon';
import { StepCard } from './StepCard';

export function JourneyMobile({ steps, openStepId, onToggle }) {
  const prefersReducedMotion = useReducedMotion();
  const { containerRef, firstItemRef, lastItemRef, track } = useVerticalTimelineTrack();
  const trackHeight = Math.max(track.bottom - track.top, 0);

  return (
    <ol ref={containerRef} className="relative flex flex-col lg:hidden">
      <span
        aria-hidden="true"
        className="absolute left-7 z-0 w-px -translate-x-1/2 bg-border"
        style={{ top: track.top, height: trackHeight }}
      />
      {!prefersReducedMotion && trackHeight > 0 && (
        <motion.span
          aria-hidden="true"
          className="absolute left-7 z-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(65,105,225,0.15)]"
          animate={{ top: [track.top, track.bottom] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {steps.map((step, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;

        return (
          <li key={step.id} className={`relative flex gap-4 ${isLast ? '' : 'pb-8'}`}>
            <StepIcon
              ref={isFirst ? firstItemRef : isLast ? lastItemRef : undefined}
              number={step.number}
              Icon={step.Icon}
            />
            <StepCard
              step={step}
              isOpen={openStepId === step.id}
              onToggle={() => onToggle(step.id)}
              className="flex-1"
            />
          </li>
        );
      })}
    </ol>
  );
}
