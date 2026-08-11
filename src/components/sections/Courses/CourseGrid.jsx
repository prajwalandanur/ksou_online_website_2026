import { motion } from 'framer-motion';
import { CourseCard } from './CourseCard';

const EASE = [0.22, 1, 0.36, 1];

export function CourseGrid({ courses }) {
  return (
    <ul className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {courses.map((course, i) => (
        <motion.li
          key={course.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
        >
          <CourseCard course={course} />
        </motion.li>
      ))}
    </ul>
  );
}
