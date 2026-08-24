import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useContent } from '@/i18n/content';
import { useLanguage } from '@/i18n/useLanguage';
import { localizePath } from '@/i18n/language';
import { JsonLd } from '@/components/common/JsonLd';
import { buildAboutPageSchema } from '@/utils/schema';
import { AboutHero } from '@/components/sections/About/AboutHero';
import { AboutLeadership } from '@/components/sections/About/AboutLeadership';
import { AboutVision } from '@/components/sections/About/AboutVision';
import { AboutDigitalExperience } from '@/components/sections/About/AboutDigitalExperience';
import { AboutEcosystem } from '@/components/sections/About/AboutEcosystem';
import { AboutRoadAhead } from '@/components/sections/About/AboutRoadAhead';

/**
 * Six sections, ordered so the visitor arrives at the leadership rather than
 * being handed it:
 *
 *   institution has a mission (hero) -> it is entering a new phase (hero) ->
 *   here is the leader and his documented background (leadership) -> here
 *   are the priorities of this phase (vision) -> here is what they look like
 *   in practice (digital) -> here is what a student can actually use
 *   (ecosystem) -> here is where it is going (road ahead).
 *
 * The leadership sections carry roughly 40% of the page. That is the point of
 * the design, not an accident of length — this replaced an eight-section
 * institutional About page whose sections each restated the university's
 * accessibility mission in a different arrangement.
 *
 * **Every biographical claim on this page is sourced.** See the header of
 * `constants/about.js` for the references and for the two claims from the
 * original brief that were dropped for lack of one. Directional copy is
 * written as institutional direction, never as personal authorship.
 *
 * Every section reads its copy through `useContent()`, so `/kn/about` renders
 * the Kannada mirror in `src/locales/kn/about.js` with no per-language
 * branching anywhere in the components.
 *
 * The page intentionally ends on `AboutRoadAhead` — `MainLayout` appends the
 * shared counsellor CTA and footer after it, which is why the closing panel
 * carries only Explore Programmes and Apply Now.
 */
export function AboutPage() {
  const { about } = useContent();
  const language = useLanguage();
  const path = localizePath('/about', language);

  useDocumentMeta({
    title: about.seo.title,
    description: about.seo.description,
    ogType: 'website',
    // Self-referencing canonical per language, with `alternates` keyed on the
    // English path so the en/kn/x-default trio derives from one value.
    canonicalPath: path,
    alternates: '/about',
  });

  return (
    <main>
      {/* Name, title and URL all come from the localised content and path,
          so the structured data on /kn/about describes the Kannada page in
          Kannada rather than claiming to describe the English one. */}
      <JsonLd data={buildAboutPageSchema(about.vc, path)} />
      <AboutHero />
      <AboutLeadership />
      <AboutVision />
      <AboutDigitalExperience />
      <AboutEcosystem />
      <AboutRoadAhead />
    </main>
  );
}
