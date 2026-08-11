import { CourseGrid } from './CourseGrid';
import { CourseCarousel } from './CourseCarousel';

export function CourseCategorySection({ id, title, courses }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-8 sm:gap-10">
      <h2 id={id} className="font-brand text-3xl text-foreground sm:text-4xl">
        {title}
      </h2>

      <CourseGrid courses={courses} />
      <CourseCarousel courses={courses} />
    </section>
  );
}
