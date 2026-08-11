import { mba } from './mba';
import { ba } from './ba';
import { bcom } from './bcom';
import { mcom } from './mcom';
import { mscMathematics } from './msc-mathematics';
import { ma } from './ma';

// Central programme registry — add each new programme's data module here.
// ProgrammePage looks up by slug; components render the same generic
// section set regardless of which programme is active.
export const PROGRAMMES = {
  mba,
  ba,
  bcom,
  mcom,
  'msc-mathematics': mscMathematics,
  ma,
};
