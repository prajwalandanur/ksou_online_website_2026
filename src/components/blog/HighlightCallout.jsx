import { Lightbulb, ShieldAlert, MessageCircleQuestion, BookmarkCheck } from 'lucide-react';
import { renderInlineText } from './inlineText';

const VARIANTS = {
  keyTakeaway: { label: 'Key Takeaway', Icon: Lightbulb },
  important: { label: 'Important', Icon: ShieldAlert },
  quickAnswer: { label: 'Quick Answer', Icon: MessageCircleQuestion },
  remember: { label: 'Remember', Icon: BookmarkCheck },
};

export function HighlightCallout({ variant = 'keyTakeaway', text }) {
  const { label, Icon } = VARIANTS[variant];

  return (
    <div className="flex gap-3.5 rounded-2xl border-l-4 border-primary bg-primary/5 px-5 py-4 sm:px-6 sm:py-5">
      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</span>
        <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
          {renderInlineText(text)}
        </p>
      </div>
    </div>
  );
}
