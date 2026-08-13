# Kannada (ಕನ್ನಡ) i18n — progress & resume point

**Status: reviewed and shipped to production on 2026-08-14.** The Kannada
was drafted by Claude and then reviewed and approved by the site owner
before going live; the per-file "awaiting review" banners were cleared at
that point. Remaining items below are genuine gaps, not review blockers.
Last worked 2026-08-14. Source prompt: `kannada-i18n-prompt.md`.

Branch: `feat/kannada-i18n`, which sits on top of `seo/content-keyword-pass`
(the SEO content pass — that branch is finished and verified, and its PR was
still unopened when this was paused).

---

## Scope agreed with the user before starting

Four decisions were taken up front; they are the reason this deviates from
`kannada-i18n-prompt.md` in places, and they should not be silently revisited.

1. **`/kn` URL prefix, not a client-side toggle.** The prompt's design
   (localStorage + one URL) cannot rank in Kannada search at all — there is no
   Kannada URL for Google to index, hreflang would point both tags at the same
   URL, and the pre-renderer would keep writing English-only HTML. Since
   organic Kannada search was the whole business reason, the URL strategy was
   changed.
2. **Claude drafts all Kannada, then a human reviews it before launch.**
   That review happened on 2026-08-14; the per-file banners were cleared
   then. Treat further wording changes the same way.
3. **Scope = UI + homepage + programme pages.** Blogs (~9,900 words) are
   explicitly out; About and Announcements too.
4. **English constants stay the source of truth**, with a parallel Kannada
   layer merged over them — rather than the prompt's "move everything into
   JSON", which would delete the provenance comments (`do not invent fees,
   eligibility, credits…`) that the project depends on, and split every fee
   across two files that can drift.

**`react-i18next` was deliberately NOT installed.** The parallel-constants
architecture provides per-key fallback natively; adding i18next would mean two
competing mechanisms for one job. The only new dependencies are the two
`@fontsource` Kannada families.

---

## What is done AND verified

Verified against a real build (`npm run lint` clean, `npm run build` green,
**23/23 routes pre-render**) and, for the earlier items, at desktop 1440 and
mobile 390 (iPhone 13) in a real browser:

- **23/23 routes pre-render**, including `/kn` and all six
  `/kn/programmes/*`, with Kannada text present in the static HTML.
- **`html[lang="kn"]` swaps the fonts** — confirmed computed
  `Noto Serif Kannada` / `Noto Sans Kannada` on `/kn`, and English still
  `DM Serif Display` / `DM Sans` on `/`.
- **Conjuncts render correctly** (ಸ್ನಾತಕೋತ್ತರ, ವಿಶ್ವವಿದ್ಯಾಲಯ, ವೃತ್ತಿಪರರಿಗಾಗಿ).
- **Self-referencing canonical per language** plus `hreflang` en / kn /
  x-default pointing at genuine URLs. Sitemap carries the 7 Kannada URLs.
- **The language toggle navigates** (`/` ⇄ `/kn`).
- **No horizontal overflow** at either viewport despite Kannada running
  10–20% wider; **zero console errors**; English pages unchanged.
- **Navbar links, LMS Login label, mobile menu and ticker labels** read from
  the content registry, and nav links route through `useLocalizedPath()`.
  (These were the previously-unverified items; they now build and pre-render
  cleanly, but have **not** been re-checked visually in a browser.)

### Programme pages are now fully translated (2026-08-13)

All six `/kn/programmes/*` pages are complete, not just MBA. Each Kannada file
now carries `seo`, `hero` (incl. `visualLabel`), `infoStrip`,
`feeDurationEligibility`, the six `whyChoose.items`, `structure`, `curriculum`
labels/notes, `careerContext`, `degree`, `testimonials` and **all 18–22 FAQs**.

Spot-checked in the pre-rendered HTML: `BA ವಿಷಯ ಕ್ಷೇತ್ರಗಳು`, `ಬಹುಶಿಸ್ತೀಯ ಪಠ್ಯಕ್ರಮ`,
`1ನೇ ವರ್ಷ` and `ವರ್ಷವಾರು` on `/kn/programmes/ba`; `ಅವಕಲನ ಜ್ಯಾಮಿತಿ` on
`/kn/programmes/msc-mathematics`; `ನಿಮ್ಮ ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ` on `/kn/programmes/ma`.

**Three factual errors in the earlier machine draft were corrected** — worth
knowing about, because they are the class of mistake this file is here to
catch:

- BA and B.Com were labelled **"6 ಸೆಮಿಸ್ಟರ್‌ಗಳು"** in `infoStrip` and
  `feeDurationEligibility`. Both are **year-wise** programmes in the
  prospectus, not semester-based. Now `ರಚನೆ / ವರ್ಷವಾರು` and
  `ವರ್ಷವಾರು ಪಠ್ಯಕ್ರಮ`, matching the English source.
- The BA and B.Com duration FAQs repeated the same invented semester count;
  they now state the credits (110 / 100) as the English answers do.
- The M.Com eligibility text dropped the **Master's Preparatory Programme
  (MPP)** requirement for applicants without a commerce-cognate degree. It is
  restored in both the fee panel and the FAQ.

Also fixed this session: the homepage **blog section heading, subtitle and
"View All"** were hardcoded English despite `ui.blog.*` already existing in
both registries, and `ProgrammeCertificateVisual`'s "Degree certificate to be
added" had no key at all (now `ui.programme.degree.certificatePending`).

### Course cards and aria-labels are done (2026-08-13, second pass)

The two items that headed this list are fixed and verified in a real browser.

- **`CourseCard.jsx` now reads `useContent()` and localises its links.** All
  seven hardcoded labels ("Duration", "Course Fee", "/ Year", "Brochure",
  "Previous QPs", "Learn More", "Apply Now") come from `ui.courses.*` /
  `ui.common.*`, and both `detailPath` links — the stretched title link and
  the Learn More button — run through `useLocalizedPath()`. This was the
  language leak the user reported as "it switches back to English once it
  enters the courses page".
- **Three more leaks were found while fixing it**, all of which drop the
  visitor out of Kannada from *every* page rather than just the homepage:
  `Logo.jsx` linked to a bare `/`, `FooterColumn.jsx` deep-linked to the six
  English `/programmes/*` URLs, and `MobileMenu.jsx` routed its nav links
  un-localised (`DesktopNavLinks` already did this correctly, which is why it
  was missed). All now use `useLocalizedPath()`.
- **The English `aria-label`s are gone from the in-scope components.** New
  templated keys cover them: `common.pdfNewTab`, `nav.siteNavigation`,
  `nav.logo`, `ticker.regionLabel`, `ticker.itemPdf`, and eight under
  `courses.*` (`imageAlt`, `prevProgramme`, `nextProgramme`, `brochureAria`,
  `previousQpsAria`, `previousQpsPendingAria`, `previousQpsDisciplineAria`,
  `learnMorePendingAria`). `ui.nav.openMenu`/`closeMenu` are now actually
  used. EN/KN key parity re-checked programmatically: no key on either side
  without a counterpart.

Verified after the change: lint clean, build green, **23/23 routes
pre-render**. In headless Chromium at 1440 and 390 — `/kn` renders
`html[lang="kn"]` with Noto Sans/Serif Kannada, **clicking a course card
lands on `/kn/programmes/ba` and stays in Kannada**, zero horizontal
overflow, zero console errors, and `/` is byte-for-byte English with
`DM Sans`/`DM Serif Display` and no Kannada in `<main>`. A static check over
all seven pre-rendered Kannada pages finds no English link that has a Kannada
counterpart — the only cross-tree link left is the language toggle itself,
which is what it is for. The English chrome strings above appear 12–15 times
each in `dist/index.html` and **zero times** in `dist/kn/index.html`.

**`AccreditationStrip.jsx` had the same bug and is also fixed** —
`KN_ACCREDITATIONS` has existed since the first pass, but the component
imported `ACCREDITATIONS` directly at module scope and never called
`useContent()`, so all six accreditation strings stayed English on `/kn`.
Its repeated marquee half is now built per render, since it depends on the
language.

### But the homepage and programme pages are NOT fully Kannada yet

A phrase-level scan of the pre-rendered pages (count the Latin-script text
nodes in `dist/kn/**/index.html`, excluding the terms that are meant to stay
Latin) still finds **53 distinct English phrases on `/kn`** and ~38 on each
programme page. An earlier claim in this file that only the brand and the
blog categories were left was wrong — it came from too narrow a probe. What
is actually left, by cause:

| What | Where | In scope? |
|---|---|---|
| "View PDF →", "View Calendar →", "View Details →" (20×) | `announcementTarget()` in `constants/announcements.js` | **Yes — not done** |
| Footer column titles + links: Company, About Us, Contact Us, Prospectus, Academic Planner, Online Degrees, Resources, Blogs, FAQs, Visit Official Website | `constants/footer.js`, not in `EN_CONTENT` at all | **Yes — not done** |
| "Have Questions?" / "We're Here to Help" / body / "Talk to a Counsellor" | `CounsellorCta.jsx`, not in `EN_CONTENT` at all | **Yes — not done** |
| "Karnataka State Open University" (3×) | hardcoded second line of `Logo.jsx` | **Yes — not done** |
| "English", "Kannada", "Hindi", "Sanskrit" | MA question-paper and specialization labels in `courses.js` | **Yes — not done** (the BA/B.Com language group is already translated, so this is inconsistent) |
| "N min read", article dates | homepage blog cards | Borderline — headings are translated, card meta is not |
| Announcement *titles* | ticker | No — deliberate, official notice titles |
| Blog article titles, categories | homepage blog section | No — blogs out of scope |
| Curriculum subject titles, paper codes | programme pages | No — deliberate, must match the mark sheet |
| "Ananya R.", "Rahul K." | placeholder testimonials | No — placeholders pending real ones |

The footer and the counsellor CTA are the significant ones: `MainLayout`
renders both on **every** route, so they are English on all seven Kannada
pages. Neither has any entry in `EN_CONTENT`, so translating them means
adding the constants to the registry first, exactly as §"To translate
another section" describes.

## What is NOT done
- Curriculum and elective **subject titles are deliberately left in English**
  and should stay that way: they are the paper names printed in the prospectus
  and on the student's mark sheet, so a Kannada rendering would stop matching
  the document the student is holding. Same for the elective paper codes
  (MMDSE-3.4 …) and for `Master's Preparatory Programme (MPP)`, and for the
  equivalent-qualification names in the MA discipline notes (Kannada Pandit,
  Kannada Ratna, Rashtrabhasha Praveen, Hindi Ratna).
  **Deliberate exceptions, both documented in the files:** the BA/B.Com
  "Languages" group lists language *names*, not paper titles, so it reads
  ಕನ್ನಡ / ಇಂಗ್ಲಿಷ್ / ಹಿಂದಿ / ಸಂಸ್ಕೃತ; and the M.Sc elective *card* titles are
  field names used as headings, so they are translated while the papers under
  them are not.
- Announcement *titles* in the ticker stay English (official notice titles;
  the linked PDFs are English). Only the ticker's own labels are translated.
- Homepage blog section: heading/subtitle/CTA are now translated, but article
  titles stay English and link to English articles, since blogs are out of scope.
- JSON-LD is not localised — schemas still emit English and carry no
  `inLanguage`. **This is now the largest remaining technical item.**
- Nothing here is committed to `main`, and no PR has been opened.

### A note on editing the Kannada files from a terminal session

Claude Code's diff renderer measures Kannada conjunct clusters (ಕ್ಷ, ವ್ಯ,
ತ್ತ) as several columns while the font shapes them as one glyph, so any diff
containing literal Kannada smears across the screen and is unreadable. This
is a display bug in the CLI, not in the repo, and it cannot be fixed from
here. The workaround used on 2026-08-13: patch `src/locales/kn/*.js` with a
throwaway Node script that carries the Kannada as `\u` escapes composed from
a word table, and inspect those files through a masking script that replaces
each Kannada run with `<kn:N>`. Both keep the terminal pure ASCII. Verify the
result in the browser rather than by eye in the diff.

---

## Review status

**Reviewed and approved by the site owner on 2026-08-14**, and shipped to
production. It was previously a launch blocker that every Kannada string was
machine-drafted with no native review — the three factual errors corrected on
2026-08-13 (BA/B.Com wrongly labelled semester-based, the missing M.Com MPP
requirement) are why. That review has now happened.

These pages state fees, eligibility, recognition and the mandatory ABC/DEB
process on indexable URLs, so **further wording changes should go back
through the same review** rather than being edited in place. The fixed
glossary lives in `src/locales/kn/index.js` and new strings must stay
consistent with it.

## Architecture map (where to pick up)

```
src/i18n/
  language.js      URL is the only source of truth for language.
                   KANNADA_ROUTE_PATTERNS decides which links get localised;
                   it must stay in step with the /kn routes in AppRoutes.jsx.
  mergeContent.js  Deep merge, Kannada over English, per key. Arrays merge
                   positionally; `null` inherits that item wholesale. Kannada
                   files therefore hold ONLY text — icons, images, hrefs,
                   fees and credits are inherited and cannot drift.
  useLanguage.js   useLanguage() + useLocalizedPath().
  format.js        fill(template, values) for `{name}` / `{count}` tokens.
  content.js       The single place English is paired with Kannada. Merged
                   once at module load for a stable object identity.

src/constants/ui.js   English UI chrome pulled out of components.
                      Split headings are lead/accent/trail — three parts,
                      because Kannada puts the accented noun first and the
                      verb phrase after, which lead+accent cannot express.

src/locales/kn/       Kannada mirrors + the glossary and review checklist.
```

**To translate another section:** add its English source to `EN_CONTENT` in
`src/i18n/content.js`, add the Kannada mirror under `src/locales/kn/`, and
have the component read it via `useContent()`. No component branching on
language anywhere.

**To find what is still hardcoded:** `grep -rL "useContent"` over the in-scope
component folders lists candidates, then scan those for quoted English. That
is how the `CourseCard` and `Blog.jsx` gaps above were found — a component
that takes all its text as props is fine, one that spells text inline is not.

**To find the next language leak:** grep the *built* output, not the source —
`dist/kn/**/index.html` should contain no `href="/"` or `href="/programmes/*"`
except on the language toggle (identifiable by its `hreflang` attribute).
Source-level review missed three of these because the offending components
(`Logo`, `FooterColumn`, `MobileMenu`) render on every page and look
unrelated to i18n.

**To give another page a Kannada URL:** add its pattern to
`KANNADA_ROUTE_PATTERNS`, add the route in `AppRoutes.jsx`, add it to `ROUTES`
in `scripts/prerender.mjs`, and add it to `public/sitemap.xml`. All four, or
the page will be half-wired.
