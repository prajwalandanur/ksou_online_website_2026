import bcomCareers from '@/assets/blog/career-options-after-bcom-degree.webp';
import chooseDegree from '@/assets/blog/how-to-choose-right-online-degree-after-graduation.webp';
import whileWorking from '@/assets/blog/online-degree-while-working-full-time.webp';
import learningGuide from '@/assets/blog/online-learning-guide-admission-to-graduation.webp';
import onlineVsTraditional from '@/assets/blog/online-degree-vs-traditional-degree.webp';

/**
 * One image per article, keyed by slug, shared by the listing card and the
 * article's hero so the two can never drift apart. `alt` describes the
 * photo rather than repeating the headline — the headline is already
 * adjacent in both places, so repeating it would just be read out twice.
 *
 * The same file serves both: the card crops it 4:3 and the hero 21:9, both
 * via `object-cover`. Sources were ~1.5-2MB PNGs, re-encoded to WebP at
 * 1600px (9.4MB -> 438KB total).
 */
export const BLOG_IMAGES = {
  'career-options-after-bcom-degree': {
    src: bcomCareers,
    alt: 'An accounting ledger, calculator and financial reports on a desk',
  },
  'how-to-choose-right-online-degree-after-graduation': {
    src: chooseDegree,
    alt: 'A decision checklist and flowchart beside a compass and a graduation cap',
  },
  'online-degree-while-working-full-time': {
    src: whileWorking,
    alt: 'A professional studying on a laptop at a desk in a busy office',
  },
  'online-learning-guide-admission-to-graduation': {
    src: learningGuide,
    alt: 'A student taking notes at a desk with course brochures and a calendar',
  },
  'online-degree-vs-traditional-degree': {
    src: onlineVsTraditional,
    alt: 'A balance scale weighing a briefcase against a graduation cap',
  },
};
