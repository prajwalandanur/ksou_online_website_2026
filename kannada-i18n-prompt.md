# KSOU Online — Kannada (ಕನ್ನಡ) Translation Implementation

The site has an EN/ಕನ್ನಡ toggle in the navbar that currently does nothing. This prompt implements full Kannada language support using react-i18next, with Noto Serif Kannada for headings and Noto Sans Kannada for body text.

**This is a 4-phase implementation. Do all phases in order.**

---

## Phase 1: Install dependencies & set up i18n framework

### 1a. Install packages

```bash
npm install react-i18next i18next i18next-browser-languagedetector @fontsource/noto-sans-kannada @fontsource/noto-serif-kannada
```

### 1b. Create the i18n configuration file

Create `src/i18n.js`:

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import kn from './locales/kn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      kn: { translation: kn },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'ksou-lang',
    },
  });

export default i18n;
```

### 1c. Import i18n in main.jsx

Add `import './i18n';` at the top of `src/main.jsx` (before the App import).

### 1d. Set up Kannada fonts in CSS

In your main CSS file (wherever DM Sans and DM Serif Display are imported), add:

```js
// In src/main.jsx or wherever @fontsource/dm-sans is imported:
import '@fontsource/noto-sans-kannada/400.css';
import '@fontsource/noto-sans-kannada/500.css';
import '@fontsource/noto-sans-kannada/700.css';
import '@fontsource/noto-serif-kannada/400.css';
import '@fontsource/noto-serif-kannada/700.css';
```

Then add a Tailwind/CSS utility that applies the right font family based on the current language. The simplest approach: add a `lang` attribute on the root `<div id="root">` or `<html>` element that switches based on i18n language, and use CSS to swap fonts:

In your global CSS (e.g. `src/index.css` or wherever Tailwind is configured):

```css
/* Kannada font overrides — applied when lang="kn" is set on <html> */
html[lang="kn"] {
  /* Body text: Noto Sans Kannada */
  font-family: 'Noto Sans Kannada', 'DM Sans', sans-serif;
}

html[lang="kn"] h1,
html[lang="kn"] h2,
html[lang="kn"] h3,
html[lang="kn"] h4,
html[lang="kn"] h5,
html[lang="kn"] h6,
html[lang="kn"] [data-heading] {
  /* Headings: Noto Serif Kannada */
  font-family: 'Noto Serif Kannada', 'DM Serif Display', serif;
}
```

**Important**: You need to dynamically set `document.documentElement.lang` when the language changes. Create a small hook or effect for this:

Create `src/hooks/useLanguageSync.js`:

```js
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Syncs the current i18n language to the <html lang="..."> attribute
 * so CSS font-family rules and screen readers pick up the right language.
 */
export default function useLanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
}
```

Call `useLanguageSync()` once in your root `App.jsx` component.

### 1e. Wire up the existing navbar language toggle

The navbar already has an EN/ಕನ್ನಡ toggle button. Find it and replace its `onClick` handler with:

```js
import { useTranslation } from 'react-i18next';

// Inside the component:
const { i18n } = useTranslation();

const toggleLanguage = () => {
  const newLang = i18n.language === 'kn' ? 'en' : 'kn';
  i18n.changeLanguage(newLang);
};

// The button label should show the OTHER language (what you'll switch TO):
// When current is EN, show "ಕನ್ನಡ". When current is KN, show "English".
const buttonLabel = i18n.language === 'kn' ? 'English' : 'ಕನ್ನಡ';
```

Make sure the toggle visually indicates the current active language (e.g. a highlighted pill or underline on the active one).

---

## Phase 2: Extract all English content into `locales/en.json`

Create `src/locales/en.json`. This is the master content file. **Every user-facing string on the site must be extracted here.**

Structure the JSON by page and section. Here is the exact structure to follow — go through every constants file and component and extract every string:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "programmes": "Programmes",
    "blogs": "Blog",
    "announcements": "Announcements",
    "applyNow": "Apply Now",
    "lmsLogin": "LMS Login",
    "contactUs": "Contact Us"
  },

  "hero": {
    "h1": "UGC Approved Online Degrees from Karnataka State Open University (KSOU)",
    "subtitle": "Recognized Degrees. Flexible Learning. Real Opportunities.",
    "description": "Explore online undergraduate and postgraduate programmes from Karnataka State Open University, designed for students and working professionals seeking flexible, accessible and career-focused higher education.",
    "admissionsPill": "Admissions Open • July 2026 Cycle",
    "admissionsSubtext": "Applications are now open for the July 2026 admission cycle.",
    "applyNow": "Apply Now",
    "rankingBadge": "#Top 8th in State Universities"
  },

  "accreditation": {
    "aicte": {
      "name": "AICTE",
      "description": "All India Council for Technical Education"
    },
    "ugc": {
      "name": "UGC",
      "description": "University Grants Commission"
    },
    "naac": {
      "name": "NAAC A+",
      "description": "National Assessment and Accreditation Council"
    }
  },

  "courses": {
    "ugHeading": "Online Undergraduate Programmes",
    "pgHeading": "Online Postgraduate Programmes",
    "learnMore": "Learn More",
    "applyNow": "Apply Now",
    "brochure": "Brochure",
    "previousQPs": "Previous QPs",
    "perYear": "/year",
    "specializations": "Specializations"
  },

  "whyChoose": {
    "heading": "Why Choose KSOU",
    "items": {
      "governmentUniversity": {
        "title": "Government University",
        "description": "..."
      },
      "ugcRecognized": {
        "title": "UGC Recognized",
        "description": "..."
      },
      "studyAlongsideWork": {
        "title": "Study Alongside Work",
        "description": "..."
      },
      "flexibleLearning": {
        "title": "Flexible Learning",
        "description": "..."
      },
      "digitalLearning": {
        "title": "Digital Learning",
        "description": "..."
      },
      "careerGrowth": {
        "title": "Career Growth",
        "description": "..."
      }
    }
  },

  "howItWorks": {
    "heading": "How It Works",
    "steps": {
      "step1": {
        "title": "Apply & Get Admitted",
        "description": "..."
      },
      "step2": {
        "title": "Access LMS",
        "description": "..."
      },
      "step3": {
        "title": "Learn & Engage",
        "description": "..."
      },
      "step4": {
        "title": "Complete Examinations",
        "description": "..."
      },
      "step5": {
        "title": "Earn Your Degree",
        "description": "..."
      }
    },
    "summaryLine": "One platform. One journey. Your degree."
  },

  "blog": {
    "sectionHeading": "Insights for Your Next Step",
    "viewAll": "View All",
    "readMore": "Read More",
    "minRead": "min read"
  },

  "faq": {
    "heading": "Frequently Asked Questions",
    "items": [
      {
        "question": "...",
        "answer": "..."
      }
    ]
  },

  "footer": {
    "quickLinks": "Quick Links",
    "programmes": "Programmes",
    "resources": "Resources",
    "contactUs": "Contact Us",
    "copyright": "© 2026 Karnataka State Open University. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  },

  "programmes": {
    "mba": {
      "seo": {
        "title": "...",
        "description": "..."
      },
      "hero": {
        "title": "...",
        "description": "..."
      },
      "feeDurationEligibility": {
        "heading": "Fee, Duration & Eligibility",
        "fee": "...",
        "duration": "...",
        "eligibility": "..."
      },
      "features": {},
      "programmeStructure": {},
      "curriculum": {},
      "careerSupport": {},
      "recognition": {},
      "whyKsou": {},
      "faqs": []
    },
    "ba": { "...same structure..." },
    "bcom": { "...same structure..." },
    "mcom": { "...same structure..." },
    "ma": { "...same structure..." },
    "mscMathematics": { "...same structure..." }
  },

  "about": {
    "...all about page content..."
  },

  "announcements": {
    "heading": "Announcements",
    "...other strings..."
  },

  "common": {
    "applyNow": "Apply Now",
    "learnMore": "Learn More",
    "readMore": "Read More",
    "goBack": "Go Back",
    "loading": "Loading...",
    "comingSoon": "Coming Soon",
    "admissionsOpen": "Admissions Open",
    "feeFrom": "Fees from",
    "years": "Years",
    "credits": "Credits",
    "semesters": "Semesters",
    "duration": "Duration",
    "eligibility": "Eligibility",
    "totalFee": "Total Fee"
  }
}
```

**CRITICAL INSTRUCTIONS for extracting content:**

1. Go through EVERY constants file: `constants/courses.js`, `constants/whyChooseKsou.js`, `constants/howItWorks.js`, `constants/blogPosts.js`, `constants/navigation.js`, every file in `constants/programmes/`, every file in `constants/blogs/`, and any other constants files.

2. Go through EVERY component that has hardcoded strings: section headings, button labels, placeholder text, alt text, aria-labels, form labels, error messages, the "Page Coming Soon" fallback, the 404 page, etc.

3. Extract the ACTUAL current text — don't invent new text. The `"..."` placeholders above mean "fill in the real text from the actual code file". Read each file and copy the exact strings.

4. For the programme data files: each programme has a complex nested structure (hero, feeDurationEligibility, programmeStructure, curriculum with semester arrays, careerSupport, recognition, whyKsou, faqs, testimonials). Extract ALL of it. The curriculum section alone has semester-wise subject lists — every subject name needs to be in the translation file.

5. For blog articles: the 5 articles in `constants/blogs/*.js` have content blocks (paragraph text, headings, list items, table data, callout text, stats, steps). Extract ALL text from ALL content blocks. This is the most content-heavy part — each article is 3,000-5,000 words.

6. Use **dot-notation keys** that clearly map back to the source. Example: `programmes.mba.curriculum.semester1.subjects` not `mbaSem1Subj`.

7. The JSON must be **complete** — every visible English word on the site should come from this file after implementation. If a user switches to Kannada and sees any English text (other than proper nouns like "UGC", "NAAC", "MBA"), that's a bug.

---

## Phase 3: Create `locales/kn.json` with Kannada translations

Create `src/locales/kn.json` with the **exact same key structure** as `en.json`, but with all values translated to Kannada.

### Translation guidelines:

**Keep these terms in English (don't translate):**
- Degree abbreviations: MBA, BA, BCom, MCom, MA, MSc, BBA, BCA, MCA
- Organization abbreviations: UGC, AICTE, NAAC, NIRF, DEB
- Technical terms: LMS, PDF, CTA
- Proper nouns: Karnataka State Open University (but ADD the Kannada name alongside: ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯ)
- Currency symbol: ₹ (keep as-is)
- Numbers: use standard numerals (1, 2, 3...) not Kannada numerals (೧, ೨, ೩) — the target audience is comfortable with standard numerals

**Translate these:**
- All UI labels, button text, navigation items
- All descriptive content, paragraphs, section headings
- FAQ questions and answers
- Course descriptions, eligibility criteria, career paths
- Blog article content (all of it)
- Footer text, form labels, error messages

**Kannada writing style:**
- Use formal/standard Kannada (ಗ್ರಾಂಥಿಕ ಕನ್ನಡ), not colloquial — this is a government university
- Use the same sentence structure as the English where natural, but restructure for Kannada grammar where it reads better
- For the Meta ad copy, you already established the pattern: "ಯುಜಿಸಿ ಅನುಮೋದಿತ" (UGC approved), "ಆನ್‌ಲೈನ್ ಪದವಿ" (online degree), "ಸರ್ಕಾರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ" (government university) — use these exact established terms consistently
- "Admissions Open" = "ಪ್ರವೇಶಾತಿ ಮುಕ್ತ" or "ಅಡ್ಮಿಷನ್ ಓಪನ್" — use the version that matches your ad copy
- Font: body text will render in Noto Sans Kannada, headings in Noto Serif Kannada (handled by CSS, not the translation file)

**Here are the key term translations to use consistently across the entire file:**

| English | Kannada | Notes |
|---|---|---|
| Online Programmes | ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮಗಳು | |
| Online Degree | ಆನ್‌ಲೈನ್ ಪದವಿ | |
| Admissions Open | ಪ್ರವೇಶಾತಿ ತೆರೆದಿದೆ | |
| Apply Now | ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ | From your ad copy |
| Government University | ಸರ್ಕಾರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ | |
| UGC Approved | ಯುಜಿಸಿ ಅನುಮೋದಿತ | |
| Working Professionals | ಉದ್ಯೋಗಿ ವೃತ್ತಿಪರರು | |
| Flexible Learning | ಹೊಂದಿಕೊಳ್ಳಬಲ್ಲ ಕಲಿಕೆ | |
| Fees from ₹10,000/year | ₹10,000/ವರ್ಷದಿಂದ ಶುಲ್ಕ | |
| Learn More | ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ | |
| Duration | ಅವಧಿ | |
| Eligibility | ಅರ್ಹತೆ | |
| Semester | ಸೆಮಿಸ್ಟರ್ | Keep transliterated |
| Credits | ಕ್ರೆಡಿಟ್ಸ್ | Keep transliterated |
| Frequently Asked Questions | ಪದೆ ಪದೆ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು | |
| Home | ಮುಖಪುಟ | |
| About | ನಮ್ಮ ಬಗ್ಗೆ | |
| Blog | ಬ್ಲಾಗ್ | Transliterated |
| Announcements | ಪ್ರಕಟಣೆಗಳು | |
| Contact Us | ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ | |
| Career Support | ವೃತ್ತಿ ಬೆಂಬಲ | |
| Why Choose KSOU | KSOU ಅನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು | |
| How It Works | ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ | |
| Read More | ಮತ್ತಷ್ಟು ಓದಿ | |
| Go Back | ಹಿಂದೆ ಹೋಗಿ | |
| Coming Soon | ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ | |

**Use these EXACT terms everywhere — do not vary the translation of the same English term across different pages.** Consistency is critical for both UX and SEO.

### Handling long-form blog content:

For the 5 blog articles, translate the full content. Each article's content blocks array has typed entries. Translate the `text` field of each block while preserving the block `type` and structure:

```json
{
  "blogs": {
    "careerOptionsAfterBcom": {
      "title": "BCom ಪದವಿ ನಂತರ ಏನು ಮಾಡಬಹುದು?",
      "excerpt": "...",
      "category": "ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ",
      "content": [
        {
          "type": "paragraph",
          "text": "...Kannada translation of the paragraph..."
        },
        {
          "type": "heading2",
          "text": "...Kannada heading..."
        }
      ]
    }
  }
}
```

The content block structure (type, id for headings) stays the same — only `text`, `title`, `description`, question/answer strings, list `items`, table `headers`/`rows`, and callout `text` get translated.

---

## Phase 4: Update components to use `useTranslation()`

This is the biggest code change. Every component that renders user-facing text needs to pull from the translation system instead of using hardcoded strings or importing directly from constants.

### 4a. The pattern for every component:

```jsx
import { useTranslation } from 'react-i18next';

export default function SomeComponent() {
  const { t } = useTranslation();

  return (
    <h1>{t('hero.h1')}</h1>
  );
}
```

### 4b. Components to update (go through ALL of these):

**Navigation:**
- `Header.jsx` / `Navbar.jsx` — nav links, CTA buttons, language toggle
- `Footer.jsx` — all footer text, links, copyright
- `MobileMenu.jsx` (if separate) — same nav items

**Homepage sections:**
- `Hero.jsx` — H1, subtitle, description, admissions pill, CTA, ranking badge
- `AccreditationStrip.jsx` — accreditation names and descriptions
- `CourseGrid.jsx` / `CourseCarousel.jsx` / `CourseCard.jsx` — section headings, card labels, button text
- `WhyChooseKsou.jsx` — heading, all 6 card titles and descriptions
- `HowItWorks.jsx` / `JourneyDesktop.jsx` / `JourneyMobile.jsx` — heading, all 5 step titles and descriptions, summary line
- `Blog.jsx` / `BlogCard.jsx` — section heading, "View All", "Read More", reading time labels
- `Faq.jsx` — heading, all FAQ questions and answers

**Programme pages:**
- `ProgrammePage.jsx` — this is data-driven, so the translation approach is different here. Instead of hardcoding `t('programmes.mba.hero.title')`, the page receives a `slug` and should look up `t(`programmes.${slug}.hero.title`)`. This means programme data must move from JS constants into the translation JSON.
- All programme section components: `ProgrammeHero.jsx`, `LeadForm.jsx`, `FeeDurationEligibility.jsx`, `ProgrammeStructure.jsx`, `Curriculum.jsx`, `CareerSupport.jsx`, `Recognition.jsx`, `WhyKsouSection.jsx`, `ProgrammeFaq.jsx`, `TestimonialSection.jsx`, `DegreeShowcase.jsx`

**Blog pages:**
- `BlogListingPage.jsx` — page title, filter labels
- `BlogArticlePage.jsx` — back button, CTA heading/description, author byline
- `ArticleBody.jsx` — the content blocks are data-driven; the translated content comes from the JSON
- `TableOfContents.jsx` — heading text, labels

**Other pages:**
- `AboutPage.jsx` — all about page content
- `AnnouncementsPage.jsx` — heading, labels
- `PageComingSoon.jsx` — coming soon text
- 404 / not found page (if exists)

**Shared components:**
- Any `<button>` with hardcoded text
- Any `aria-label` or `alt` text
- Any placeholder text in forms
- The lead generation form labels and validation messages
- The "Brochure" and "Previous QPs" button labels on course cards

### 4c. How to handle the constants → i18n migration:

The current architecture uses JS constants files (`constants/courses.js`, `constants/programmes/mba.js`, etc.) that export objects with hardcoded English strings. These need to be refactored.

**Approach — keep constants for non-translatable data, use i18n for text:**

The constants files should keep: slugs, routes, image imports, fee numbers, duration numbers, credit counts, boolean flags, arrays of specialization keys.

The constants files should REMOVE: all display text (titles, descriptions, paragraphs). These move into the translation JSON files.

Example refactor for `constants/courses.js`:

```js
// BEFORE:
export const COURSES = [
  {
    slug: 'mba',
    title: 'Online MBA Programme',
    description: 'Master of Business Administration...',
    fee: '₹40,000/year',
    duration: '2 Years',
    image: mbaPng,
  },
];

// AFTER:
export const COURSES = [
  {
    slug: 'mba',
    titleKey: 'courses.items.mba.title',      // points to en.json / kn.json
    descriptionKey: 'courses.items.mba.description',
    fee: 40000,                                 // raw number, format in component
    durationYears: 2,                           // raw number
    image: mbaPng,
  },
];
```

Then in the component:

```jsx
const { t } = useTranslation();
// ...
<h3>{t(course.titleKey)}</h3>
<p>{t(course.descriptionKey)}</p>
<span>{t('common.feeFrom')} ₹{course.fee.toLocaleString('en-IN')}/{t('common.perYear')}</span>
```

**For programme data files** (`constants/programmes/mba.js` etc.), the same pattern: keep structural data (image, slug, specializations list, fee numbers) in the JS file, move ALL display strings into the translation JSONs under `programmes.mba.*`, `programmes.ba.*`, etc.

**For blog articles** (`constants/blogs/*.js`), move the entire `content` array's text fields into the translation JSON under `blogs.careerOptionsAfterBcom.content[0].text`, etc. Keep `type`, `id`, and other structural keys in the JS file. Or alternatively, have two separate content arrays — one in `en.json`, one in `kn.json` — and select based on language. This may be simpler than splitting each block.

### 4d. Number and date formatting:

Use `Intl.NumberFormat` for currency formatting that adapts to locale:

```js
const formatFee = (amount, lang) =>
  new Intl.NumberFormat(lang === 'kn' ? 'kn-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
```

### 4e. SEO — per-language meta tags:

Update the `useDocumentMeta` hook to set the page `<title>` and `<meta name="description">` based on current language:

```jsx
useDocumentMeta({
  title: t('programmes.mba.seo.title'),
  description: t('programmes.mba.seo.description'),
  // ...other fields
});
```

Also add `<link rel="alternate" hreflang="en" href="...">` and `<link rel="alternate" hreflang="kn" href="...">` tags in the document head for each page — this tells Google that both language versions exist. Add this in the `useDocumentMeta` hook.

---

## Verification checklist

After implementing all 4 phases:

- [ ] `npm run lint` passes clean
- [ ] `npm run build` succeeds
- [ ] Toggle to Kannada → EVERY piece of visible text on the homepage is in Kannada (no stray English except MBA, UGC, NAAC, etc.)
- [ ] Toggle back to English → everything reverts to English
- [ ] Language preference persists across page refreshes (stored in localStorage as `ksou-lang`)
- [ ] Programme pages show Kannada content when language is set to KN
- [ ] Blog articles render full Kannada content
- [ ] All headings render in Noto Serif Kannada when in Kannada mode
- [ ] All body text renders in Noto Sans Kannada when in Kannada mode
- [ ] When back in English, fonts revert to DM Sans / DM Serif Display
- [ ] Page titles and meta descriptions update to Kannada when language is KN
- [ ] `<html lang="kn">` is set when Kannada is active, `<html lang="en">` when English
- [ ] Numbers display correctly with ₹ symbol in both languages
- [ ] Ya-ottu characters render correctly: ಕ್ಷ, ತ್ರ, ಕ್ಕ, ಜ್ಞ, ಶ್ರ
- [ ] FAQ accordions work in both languages
- [ ] Mobile menu shows translated nav items
- [ ] No layout breakage — Kannada text is typically 10-20% wider than English, verify no overflow or clipping on mobile
- [ ] `npm run qa:mobile` still passes

**Commit after each phase, not at the end. Phase 2 and 3 (the JSON files) will be the largest commits.**
