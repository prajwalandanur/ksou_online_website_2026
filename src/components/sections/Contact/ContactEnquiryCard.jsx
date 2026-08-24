import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { ENQUIRY_SOURCES } from '@/constants/enquiry';
import { useContent } from '@/i18n/content';
import { Button } from '@/components/ui/Button';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import { EnquirySuccess } from '@/components/enquiry/EnquirySuccess';

/**
 * The contact page's right-hand column: the site's enquiry form, permanently
 * available instead of waiting on the popup's timer.
 *
 * **It renders `EnquiryForm`, the very same component the popup renders** —
 * not a copy of it. Fields, labels, placeholders, validation rules, the
 * payload, the endpoint and the error handling all live in that one
 * component and its service, so there is nothing here that can drift out of
 * step with the popup. The only thing this file decides is the container: the
 * card, the heading above the form, and what happens after a successful
 * submission.
 *
 * It replaced a "Talk to a Counsellor" card of WhatsApp/Call buttons. Both of
 * those routes still exist on the page — the helpline numbers are rows in the
 * left column, and the WhatsApp bubble is a global floating control — so the
 * card's slot buys a lead-capture form rather than a third copy of the same
 * two links.
 */
export function ContactEnquiryCard() {
  const { ui } = useContent();
  const copy = ui.enquiry;

  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Bumped when the visitor asks for a fresh form, which remounts
   * `EnquiryForm` and therefore throws away every field value, touched flag
   * and error it held. The same trick the popup gets for free by unmounting
   * on close — and the reason neither surface needs reset logic to maintain.
   */
  const [formKey, setFormKey] = useState(0);

  return (
    <div className="relative rounded-[28px] border border-border/80 bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_56px_-28px_rgba(17,17,17,0.22)] sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-[28px] bg-gradient-to-b from-ice to-transparent"
      />

      {/* min-w-0 so the two comboboxes, whose listboxes are the widest thing
          in this column, can never push the grid track past its track size
          and take the page with it at 320-390px. */}
      <div className="relative min-w-0">
        {isSubmitted ? (
          <EnquirySuccess
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setFormKey((key) => key + 1);
                  setIsSubmitted(false);
                }}
                className="mt-6"
              >
                {copy.success.again}
              </Button>
            }
          />
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </span>

            {/* The popup's own heading and description, reused rather than
                reworded: this is the same invitation, and a second wording
                would need a second Kannada translation to keep in step. */}
            <h2 className="mt-4 font-brand text-2xl leading-[1.15] tracking-tight text-navy sm:text-[1.75rem]">
              {copy.title}
            </h2>
            <p className="mt-2 text-[15px] font-light leading-relaxed text-muted-foreground">
              {copy.description}
            </p>

            <EnquiryForm
              key={formKey}
              // Distinguishes a lead from someone who came looking for the
              // form from one captured by the timed popup.
              source={ENQUIRY_SOURCES.contactPage}
              onSuccess={() => setIsSubmitted(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
