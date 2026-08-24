import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { CONTACT_COPY } from '@/constants/contact';
import { ContactSection } from '@/components/sections/Contact/ContactSection';

/**
 * Deliberately a single section.
 *
 * The brief asked for a clean institutional contact page rather than a
 * landing page: no FAQ, no map, no testimonials, no newsletter and no second
 * CTA. Adding any of those later means re-reading that decision, not just
 * adding a component.
 *
 * The one thing that *did* change is the right-hand column: it carried a
 * "Talk to a Counsellor" card of WhatsApp/Call buttons and now carries the
 * site's enquiry form — the same `EnquiryForm` the timed popup renders, not a
 * second implementation of it. See `ContactEnquiryCard`. Both helpline
 * routes survive elsewhere on the page (the numbers are rows in the left
 * column, the WhatsApp bubble is a global floating control).
 *
 * `ClosingSection` normally appends the counsellor CTA above the footer on
 * every route. It suppresses that block here — the page now *is* the
 * enquiry surface, so a second "talk to us" call to action directly beneath
 * the form would compete with it. See the note in
 * `components/layout/ClosingSection.jsx`; the footer itself is unchanged and
 * shared, as the brief requires.
 */
export function ContactPage() {
  useDocumentMeta({
    title: CONTACT_COPY.seo.title,
    description: CONTACT_COPY.seo.description,
    canonicalPath: '/contact',
  });

  return (
    <main>
      <ContactSection />
    </main>
  );
}
