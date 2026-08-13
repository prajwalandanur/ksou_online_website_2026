import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useContent } from '@/i18n/content';
import { useLanguage } from '@/i18n/useLanguage';
import { localizePath } from '@/i18n/language';
import { CourseCategorySection } from '@/components/sections/Courses/CourseCategorySection';

/**
 * The /programmes listing.
 *
 * Deliberately thin: it reuses `CourseCategorySection`, which already pairs
 * `CourseGrid` (desktop) with `CourseCarousel` (mobile) and renders the same
 * `CourseCard` the homepage does. Nothing about a course is re-declared here,
 * so fees, images, brochure links, question papers and the whole-card
 * navigation stay identical to the homepage by construction rather than by
 * anyone remembering to update two places.
 *
 * Card click behaviour therefore also comes for free: `CourseCard` uses a
 * stretched link on the title (`after:absolute after:inset-0`) with its four
 * actions lifted above it in `relative z-10` wrappers, so the informational
 * area navigates to the course page while Brochure / Previous QPs / Learn
 * More / Apply Now keep their own destinations — with no event plumbing.
 */
export function ProgrammesPage() {
  const { ui, ugCourses, pgCourses, programmesPage } = useContent();
  const language = useLanguage();

  useDocumentMeta({
    title: programmesPage.seo.title,
    description: programmesPage.seo.description,
    // Self-referencing canonical per language, and `alternates` keyed on the
    // English path so the en/kn/x-default trio is derived from one value.
    canonicalPath: localizePath('/programmes', language),
    alternates: '/programmes',
  });

  return (
    <main>
      <section aria-labelledby="programmes-heading" className="px-6 pt-10 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <h1
            id="programmes-heading"
            className="max-w-3xl font-brand text-4xl leading-[1.12] text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            {programmesPage.headingLead}{' '}
            <span className="text-primary">{programmesPage.headingAccent}</span>
          </h1>

          <span aria-hidden="true" className="block h-[2px] w-10 rounded-full bg-gold" />

          <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {programmesPage.description}
          </p>
        </div>
      </section>

      {/* Same rhythm as the homepage's Courses block, minus its top padding —
          the hero above already supplies that, and doubling it left a visible
          dead band between the intro and the first heading. */}
      <div className="flex flex-col gap-12 px-6 pb-10 pt-10 sm:gap-16 sm:pb-14 lg:gap-20 lg:px-8 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <CourseCategorySection
            id="programmes-ug-heading"
            title={ui.courses.ugHeading}
            courses={ugCourses}
          />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <CourseCategorySection
            id="programmes-pg-heading"
            title={ui.courses.pgHeading}
            courses={pgCourses}
          />
        </div>
      </div>
    </main>
  );
}
