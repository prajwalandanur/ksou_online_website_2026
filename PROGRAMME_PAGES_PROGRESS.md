# KSOU Online Programme Pages — Progress Snapshot

Templatization completed on 2026-08-11 (source: `Use the existing KSOU Online MBA pr.md`). Supersedes `MBA_PAGE_PROGRESS.md` (deleted — its content is fully covered here). Resume by reading this file plus `CLAUDE.md` §6.

## What changed

The MBA programme page (previously hand-built, `src/pages/MbaProgramme.jsx` + `src/components/sections/MbaProgramme/*.jsx` + `src/constants/mbaProgramme.js` — all now **deleted**) was converted into a reusable, data-driven template so the same page architecture could serve all 6 KSOU Online courses without duplicating components.

**Architecture:**
- `src/pages/ProgrammePage.jsx` — single page component, looks up `PROGRAMMES[slug]` (from `useParams`) in `src/constants/programmes/index.js`, renders 12 generic sections with that programme's data. Unknown slug → `PageComingSoon`.
- `src/components/sections/Programme/*.jsx` — 12 generic section components (renamed from `Mba*` to `Programme*`), each taking a `programme` prop instead of importing course-specific constants. `ProgrammeRecognition` and `ProgrammeWhyKsou` take no `programme` prop at all — they're content-static, per the source spec's explicit instruction that institutional content (recognition badges, university history) should not be rewritten per course.
- `src/constants/programmes/shared.js` — Recognition, Career Support feature list, Why-KSOU vision/milestones, degree tags, exam-fee table. Identical across every programme.
- `src/constants/programmes/{mba,ba,bcom,mcom,msc-mathematics,ma}.js` — one file per programme, each exporting an object matching a shared shape (`hero`, `infoStrip`, `feeDurationEligibility`, `whyChoose`, `structure`, `curriculum`, `careerContext`, `degree`, `testimonials`, `faqs`, `seo`).
- Route changed from the fixed `/programmes/mba` to dynamic `/programmes/:slug`.
- All 6 `CourseCard`s on the homepage now have a `detailPath` in `constants/courses.js` (previously MBA-only) and are fully interactive.
- New `src/hooks/useDocumentMeta.js` — dependency-free, sets `document.title` + meta description on mount. Used by `ProgrammePage` (per-programme SEO) and `Home.jsx` (site defaults), so the tag is always correct regardless of navigation order.

**Data source:** `PROSPECTUS WITH SUBJECTS NEW.pdf` (44 pages, fuller than the original `KSOU_Online_Programmes_Prospectus.pdf` used for the MBA-only build — has subject-level curriculum for every programme). Read in full this session.

## Per-programme notes

- **MBA** (`mba.js`) — direct data-shape conversion of the original hand-built page. Visually confirmed pixel-identical to the pre-refactor version by screenshot before the old files were deleted.
- **BA** (`ba.js`) — 3 years, 110 credits, ₹30,000 total. Structure section: Languages (choose 2 of 4) + History/Economics/Political Science optionals, each with real course titles from the prospectus. Curriculum uses year-based tabs (not semester) since BA is year-structured.
- **B.Com** (`bcom.js`) — 3 years, 100 credits, ₹36,000 total. No real elective/specialization branching exists in the prospectus for B.Com (fixed 15-paper commerce core + language choice) — the Structure section groups the real papers into 3 editorial themes (Accounting & Finance / Business & Commercial Law / Business Operations & Analytics) plus a Languages card, rather than inventing a specialization structure that doesn't exist.
- **M.Com** (`mcom.js`) — 4 semesters, 80 credits, ₹40,000 total. Real dual-specialization structure (Groups A–D: Accounting & Finance / Marketing & HR / Accounting & HR / Marketing & Finance), each with its real 8 papers across 4 semesters — this is the closest real-world equivalent to MBA's elective explorer.
- **M.Sc Mathematics** (`msc-mathematics.js`) — 4 semesters, 82 credits, ₹80,000 total. No specialization groups exist; the Structure section presents the 6 real Discipline-Specific Elective papers (3 offered in Sem III choose-2-of-3, 3 in Sem IV choose-2-of-3) as individual cards rather than fabricating broader "areas."
- **MA** (`ma.js`) — **one consolidated page**, matching the homepage's single MA card with a `specializations` array. Real complication: Kannada (82cr), English (80cr), Hindi (88cr), Sanskrit (70cr, "2 Years" not "4 Semesters" in the source wording), and Economics (80cr) share identical fees (₹30,000 total) but have genuinely different credits, duration wording, and eligibility. **User explicitly chose** (over "full parity for all 5" or "5 separate pages") a consolidated page: "Choose Your Discipline" structure section shows all 5 with real credits/eligibility; the Curriculum section shows the full semester-by-semester syllabus for **English only** (the most complete, directly-English source data), with a visible note that the other 4 disciplines have their own syllabi. Kannada and Hindi structure cards **do not** include invented English subject titles — their curricula are published in Kannada/Devanagari script in the prospectus, which isn't safely transcribable without risking mistranslation, so the cards say so plainly instead of guessing.

## Verification done this session (2026-08-11)

- `npm run lint` — clean, no errors, across every stage of the refactor.
- `npm run build` — succeeds at every stage. New warning: one JS chunk now exceeds 500KB (all 6 programmes' data + shared components bundle into main) — not blocking, flagged in `CLAUDE.md` §7 as a future code-splitting candidate.
- MBA parity confirmed by screenshot comparison (hero + curriculum + final CTA) before deleting the old hand-built files.
- All 6 routes (`/programmes/mba`, `/ba`, `/bcom`, `/mcom`, `/msc-mathematics`, `/ma`) screenshot-verified on desktop (1522px) — correct programme-specific content, equal-height cards holding up under real data, no console errors (checked via `read_console_messages` with `onlyErrors: true`).
- Browser tab title confirmed changing per route (SEO hook working) — e.g. "KSOU Online BA — UGC Entitled Online Bachelor of Arts | Karnataka State Open University".
- MA's Kannada discipline card expand-panel confirmed showing the honest "syllabus published in Kannada" note rather than fabricated content.
- **Mobile viewport now verified** (2026-08-11) — the `resize_window` extension tool was root-caused (resizes the real OS window via `chrome.windows.update()`, which silently no-ops while the window is maximized; the tool has no `state` param to un-maximize first) and replaced for mobile QA with `npm run qa:mobile` (Playwright + device emulation, see `CLAUDE.md` §5). All 6 programme routes + Home screenshot-verified at 390×844 (iPhone 13 profile) — correct single-column stacking, no clipping, no layout breaks.

## Next steps on resume, in order

1. If Hindi/Kannada MA curricula are ever supplied in English (translated or re-authored), add them to `ma.js`'s `kannada`/`hindi` structure-card `subjects` arrays and consider whether they warrant their own Curriculum-section discipline switcher instead of the current English-only representative view.
2. Real brochure/prospectus files + download wiring — every programme page's Hero and final-CTA "View Prospectus" buttons are still styled placeholders.
3. Real student testimonials once supplied, per programme — replace `isPlaceholder: true` entries in each `testimonials` array.
4. JSON-LD Course schema per programme page (SEO checklist item, not yet started).
5. Revisit the >500KB JS chunk warning if the bundle keeps growing — `React.lazy`-split `ProgrammePage` from the rest of the app would be the natural fix.
