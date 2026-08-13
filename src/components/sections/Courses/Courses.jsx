import { useContent } from '@/i18n/content';
import { CourseCategorySection } from './CourseCategorySection';

export function Courses() {
  // Course data and the two section headings both come from the language
  // registry, so /kn renders Kannada names and headings with no branching.
  const { ui, ugCourses, pgCourses } = useContent();

  return (
    <div className="flex flex-col gap-12 px-6 py-10 sm:gap-16 sm:py-14 lg:gap-20 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <CourseCategorySection
          id="ug-courses-heading"
          title={ui.courses.ugHeading}
          courses={ugCourses}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <CourseCategorySection
          id="pg-courses-heading"
          title={ui.courses.pgHeading}
          courses={pgCourses}
        />
      </div>
    </div>
  );
}
