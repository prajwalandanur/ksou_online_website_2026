import { UG_COURSES, PG_COURSES } from '@/constants/courses';
import { mba } from './mba';
import { ba } from './ba';
import { bcom } from './bcom';
import { mcom } from './mcom';
import { mscMathematics } from './msc-mathematics';
import { ma } from './ma';

// The programme hero reuses the same photograph as the course card, so a
// visitor arriving from the homepage lands on the image they just clicked.
// It is read out of courses.js rather than re-imported per programme file so
// the artwork keeps a single home — swap a course's `image` there and both
// the card and its detail page follow. Alt text matches the card's wording
// for the same reason: it is the same photo.
const COURSE_ARTWORK = Object.fromEntries(
  [...UG_COURSES, ...PG_COURSES]
    .filter((course) => course.detailPath && course.image)
    .map((course) => [
      course.detailPath.replace('/programmes/', ''),
      { image: course.image, imageAlt: `${course.name} students` },
    ]),
);

// A programme with no matching course artwork keeps the icon placeholder
// ProgrammeHeroVisual falls back to, rather than rendering a broken <img>.
const withArtwork = (programme, slug) => {
  const artwork = COURSE_ARTWORK[slug];
  if (!artwork) return programme;
  return { ...programme, hero: { ...programme.hero, ...artwork } };
};

// Central programme registry — add each new programme's data module here.
// ProgrammePage looks up by slug; components render the same generic
// section set regardless of which programme is active.
export const PROGRAMMES = {
  mba: withArtwork(mba, 'mba'),
  ba: withArtwork(ba, 'ba'),
  bcom: withArtwork(bcom, 'bcom'),
  mcom: withArtwork(mcom, 'mcom'),
  'msc-mathematics': withArtwork(mscMathematics, 'msc-mathematics'),
  ma: withArtwork(ma, 'ma'),
};
