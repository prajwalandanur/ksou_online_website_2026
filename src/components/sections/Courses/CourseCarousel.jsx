import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAutoScrollCarousel } from '@/hooks/useAutoScrollCarousel';
import { CourseCard } from './CourseCard';

export function CourseCarousel({ courses }) {
  const { containerRef, pause, next, prev } = useAutoScrollCarousel(courses.length, {
    intervalMs: 5000,
  });

  return (
    <div className="sm:hidden">
      <ul
        ref={containerRef}
        onPointerDown={pause}
        onTouchStart={pause}
        onWheel={pause}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <li key={course.id} className="shrink-0 basis-[85%] snap-start">
            <CourseCard course={course} />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous programme"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next programme"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
