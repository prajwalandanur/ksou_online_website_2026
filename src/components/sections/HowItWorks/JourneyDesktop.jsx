import { motion, useReducedMotion } from 'framer-motion';
import { StepIcon } from './StepIcon';
import { StepCard } from './StepCard';

export function JourneyDesktop({ steps, openStepId, onToggle }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol className="relative hidden lg:grid lg:grid-cols-5 lg:items-start lg:gap-6">
      <span
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-7 z-0 h-px bg-border"
      />
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute top-7 z-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(65,105,225,0.15)]"
          animate={{ left: ['10%', '90%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {steps.map((step) => (
        <li key={step.id} className="relative z-10 flex flex-col items-center gap-5">
          <StepIcon number={step.number} Icon={step.Icon} />
          <StepCard
            step={step}
            isOpen={openStepId === step.id}
            onToggle={() => onToggle(step.id)}
            className="w-full text-left"
          />
        </li>
      ))}
    </ol>
  );
}
