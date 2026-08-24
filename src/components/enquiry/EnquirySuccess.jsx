import { CircleCheck } from 'lucide-react';
import { useContent } from '@/i18n/content';

/**
 * The confirmation shown once a lead has been captured.
 *
 * Split out of `EnquiryModal` when the same form gained a second home on the
 * `/contact` page: the success message is part of the form's behaviour, not
 * of the popup, and two hand-kept copies of "Thank You!" is exactly how the
 * two surfaces start telling visitors different things.
 *
 * **Which state owns "submitted" stays with the container**, deliberately.
 * The modal has to know, because a submitted dialog closes without
 * rescheduling the next appearance; the contact card has to know, because it
 * swaps the form for this panel in place. Only the presentation is shared.
 *
 * `titleId`/`descriptionId` exist for the modal, which labels its dialog with
 * them; the contact card renders the same panel without them, because a card
 * in the page flow is not a labelled region.
 */
export function EnquirySuccess({ titleId, descriptionId, action }) {
  const { ui } = useContent();
  const copy = ui.enquiry.success;

  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <CircleCheck className="h-7 w-7 text-primary" aria-hidden="true" />
      </span>
      <h2 id={titleId} className="mt-4 font-brand text-[28px] leading-tight text-navy">
        {copy.title}
      </h2>
      <p id={descriptionId} className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {copy.description}
      </p>
      {action}
    </div>
  );
}
