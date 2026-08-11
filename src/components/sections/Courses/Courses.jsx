import { UG_COURSES, PG_COURSES } from '@/constants/courses';
import { CourseCategorySection } from './CourseCategorySection';

export function Courses() {
  return (
    <div className="flex flex-col gap-12 px-6 py-10 sm:gap-16 sm:py-14 lg:gap-20 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <CourseCategorySection
          id="ug-courses-heading"
          title="Online Undergraduate Programmes"
          courses={UG_COURSES}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <CourseCategorySection
          id="pg-courses-heading"
          title="Online Postgraduate Programmes"
          courses={PG_COURSES}
        />
      </div>
    </div>
  );
}
