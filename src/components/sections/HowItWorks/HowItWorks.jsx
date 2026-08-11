import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/constants/howItWorks';
import { JourneyDesktop } from './JourneyDesktop';
import { JourneyMobile } from './JourneyMobile';

const SUMMARY_STAGES = ['Admissions', 'Learning', 'Examinations', 'Degree'];

export function HowItWorks() {
  const [openStepId, setOpenStepId] = useState(null);

  const toggleStep = (id) => {
    setOpenStepId((current) => (current === id ? null : id));
  };

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="flex flex-col bg-muted/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto mb-10 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-12 lg:px-8">
        <h2
          id="how-it-works-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          How Online Learning Works
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          Everything you need to learn, complete your programme, and earn your degree — online.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <JourneyDesktop steps={HOW_IT_WORKS_STEPS} openStepId={openStepId} onToggle={toggleStep} />
        <JourneyMobile steps={HOW_IT_WORKS_STEPS} openStepId={openStepId} onToggle={toggleStep} />
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center gap-3 px-6 text-center sm:mt-8 lg:px-8">
        <p className="font-brand text-xl text-foreground sm:text-2xl">
          One platform. One journey. Your degree.
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-muted-foreground">
          {SUMMARY_STAGES.map((stage, i) => (
            <span key={stage} className="flex items-center gap-2">
              {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
              {stage}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
