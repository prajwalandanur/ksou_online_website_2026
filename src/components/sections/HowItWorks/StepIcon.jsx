import { forwardRef } from 'react';

export const StepIcon = forwardRef(function StepIcon({ number, Icon, className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_8px_20px_-10px_rgba(17,17,17,0.15)] ${className}`}
    >
      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
        {number}
      </span>
    </div>
  );
});
