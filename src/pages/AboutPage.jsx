import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { ABOUT_SEO } from '@/constants/about';
import { AboutHero } from '@/components/sections/About/AboutHero';
import { AboutLegacy } from '@/components/sections/About/AboutLegacy';
import { AboutValues } from '@/components/sections/About/AboutValues';
import { AboutStory } from '@/components/sections/About/AboutStory';
import { AboutOnlineToday } from '@/components/sections/About/AboutOnlineToday';
import { AboutCredibility } from '@/components/sections/About/AboutCredibility';
import { AboutCommunity } from '@/components/sections/About/AboutCommunity';
import { AboutPromise } from '@/components/sections/About/AboutPromise';

/**
 * Ordered as one institutional story rather than a stack of sections:
 * who KSOU is (hero) -> its scale (legacy) -> why it exists (values) ->
 * how it evolved into online education (story, then today) -> why it can
 * be trusted (credibility, community) -> what it stands for (promise).
 *
 * Four sections were cut in a refinement pass because each restated a
 * point another section already made better:
 *  - "Learning Beyond the Conventional Classroom" (accessibility, already
 *    the whole point of the values section)
 *  - "The Classroom Has Changed" (a second evolution timeline alongside
 *    the 1969-today one)
 *  - "KSOU at a Glance" (four of its five figures were the legacy stats)
 *  - the final blue CTA (the global counsellor block already closes every
 *    page, and two CTAs back to back read as filler)
 * Don't reintroduce them without new information to justify the space.
 *
 * The page intentionally ends on `AboutPromise` — `MainLayout` appends the
 * shared counsellor CTA and footer after it.
 */
export function AboutPage() {
  useDocumentMeta(ABOUT_SEO.title, ABOUT_SEO.description);

  return (
    <main>
      <AboutHero />
      <AboutLegacy />
      <AboutValues />
      <AboutStory />
      <AboutOnlineToday />
      <AboutCredibility />
      <AboutCommunity />
      <AboutPromise />
    </main>
  );
}
