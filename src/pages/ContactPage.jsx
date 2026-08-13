import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { CONTACT_COPY } from '@/constants/contact';
import { ContactSection } from '@/components/sections/Contact/ContactSection';

/**
 * Deliberately a single section.
 *
 * The brief asked for a clean institutional contact page rather than a
 * landing page: no form, no FAQ, no map, no testimonials, no newsletter and
 * no second CTA. Adding any of those later means re-reading that decision,
 * not just adding a component.
 *
 * `ClosingSection` normally appends the counsellor CTA above the footer on
 * every route. It suppresses that block here — "Talk to a Counsellor" is
 * already the right-hand card on this page, so the global one would be the
 * same call to action twice on one screen. See the note in
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
