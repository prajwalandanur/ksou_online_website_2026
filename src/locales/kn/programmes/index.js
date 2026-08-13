/**
 * Kannada drafted by Claude, then reviewed and approved by the site owner
 * on 2026-08-14 before going live.
 *
 * Kannada for the six programme pages, keyed by the same slugs as
 * src/constants/programmes/index.js. Merged over the English programme
 * objects, so anything absent here renders in English.
 *
 * ── What is deliberately NOT translated ─────────────────────────────────
 * **Curriculum and elective subject titles stay in English.** They are the
 * paper names printed in the prospectus and on the student's mark sheet
 * ("Advanced Corporate Finance", "Statistics and Optimization Techniques").
 * A Kannada rendering would read more naturally but would no longer match
 * the document a student is holding, which is worse than useful. The same
 * applies to credit counts and semester numbers, which are numerals in both
 * languages and inherit from English so they can never drift.
 */
import { knMba } from './mba';
import { knBa } from './ba';
import { knBcom } from './bcom';
import { knMcom } from './mcom';
import { knMa } from './ma';
import { knMscMathematics } from './msc-mathematics';

export const KN_PROGRAMMES = {
  mba: knMba,
  ba: knBa,
  bcom: knBcom,
  mcom: knMcom,
  ma: knMa,
  'msc-mathematics': knMscMathematics,
};
