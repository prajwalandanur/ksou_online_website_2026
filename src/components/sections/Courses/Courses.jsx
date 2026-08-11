import { UG_COURSES, PG_COURSES } from '@/constants/courses';
import { CourseCategorySection } from './CourseCategorySection';

export function Courses() {
  return (
    <div className="flex flex-col gap-20 px-6 py-16 sm:gap-24 sm:py-20 lg:gap-28 lg:px-8 lg:py-24">
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
