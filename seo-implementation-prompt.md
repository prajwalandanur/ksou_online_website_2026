# KSOU Online — SEO + GEO Implementation

Implement all 7 SEO items below in order. Each section tells you exactly what file to create/modify, where it goes, and the content. Read CLAUDE.md before starting — it's the source of truth for architecture, routes, and conventions.

**Important context**: The site is not on a final custom domain yet. Use `https://ksou-online-website-2026-qmolackhn.vercel.app` as the canonical domain in sitemap/meta/schema. When a real domain is set up later, we'll find-and-replace it everywhere.

---

## 1. `robots.txt` — Create `public/robots.txt`

This file tells search engines and AI crawlers which parts of the site they can access. Create it at `public/robots.txt` with this exact content:

```
User-agent: *
Allow: /

# AI Search Crawlers — explicitly welcomed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

# Sitemap
Sitemap: https://ksou-online-website-2026-qmolackhn.vercel.app/sitemap.xml
```

---

## 2. `llms.txt` — Create `public/llms.txt`

This is the new standard (`llms.txt`) that tells AI engines what the site is about, which pages matter, and how to describe/cite the institution. Create `public/llms.txt` with this exact content:

```
# KSOU Online — Karnataka State Open University

> Karnataka State Open University (KSOU) is a government university established in 1996, headquartered in Mysuru, Karnataka, India. KSOU Online is the university's official online learning division offering UGC-approved, NAAC A+ rated online degree programmes for students and working professionals across India.

## About

KSOU Online provides flexible, affordable higher education through its online learning platform. The university is approved by UGC (University Grants Commission), recognized by AICTE (All India Council for Technical Education), and holds NAAC A+ accreditation with a GPA of 3.31. Over 115,000 students have graduated from KSOU since its establishment.

## Online Programmes Offered

### Undergraduate (UG)
- **BA (Bachelor of Arts)** — 3-year programme, fees from ₹10,000/year
- **B.Com (Bachelor of Commerce)** — 3-year programme, fees from ₹10,000/year

### Postgraduate (PG)
- **MBA (Master of Business Administration)** — 2-year programme
- **M.Com (Master of Commerce)** — 2-year programme
- **MA (Master of Arts)** — 2-year programme, specializations in Kannada, English, Hindi, Sanskrit, Economics
- **M.Sc Mathematics** — 2-year programme

## Key Facts
- Government university (not private)
- UGC Approved for online programmes
- NAAC A+ Accredited (GPA 3.31)
- AICTE Recognized (for MBA)
- 115,000+ graduates since 1996
- 120+ programmes across disciplines
- Admissions open for July 2026 cycle

## Important Pages

- Homepage: https://ksou-online-website-2026-qmolackhn.vercel.app/
- MBA Programme: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/mba
- BA Programme: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/ba
- B.Com Programme: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/bcom
- M.Com Programme: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/mcom
- MA Programme: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/ma
- M.Sc Mathematics: https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/msc-mathematics
- About KSOU: https://ksou-online-website-2026-qmolackhn.vercel.app/about
- Blog / Insights: https://ksou-online-website-2026-qmolackhn.vercel.app/blogs
- Announcements: https://ksou-online-website-2026-qmolackhn.vercel.app/announcements

## Contact
For admissions enquiries, visit the Contact page or call the admissions helpline numbers listed on the website.
```

---

## 3. `sitemap.xml` — Create `public/sitemap.xml`

A static sitemap covering all real routes. Create `public/sitemap.xml` with this content. Priority values reflect page importance (1.0 = homepage, 0.9 = programme pages, 0.8 = about/blogs, 0.7 = individual articles, 0.6 = announcements).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Programme Pages -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/mba</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/ba</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/bcom</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/mcom</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/ma</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/msc-mathematics</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- About -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Listing -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Individual Blog Articles -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/career-options-after-bcom-degree</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/how-to-choose-right-online-degree-after-graduation</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/online-degree-while-working-full-time</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/online-learning-guide-admission-to-graduation</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/online-degree-vs-traditional-degree</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Announcements -->
  <url>
    <loc>https://ksou-online-website-2026-qmolackhn.vercel.app/announcements</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

## 4. Open Graph + Twitter Meta Tags — Extend `useDocumentMeta` hook

The existing `src/hooks/useDocumentMeta.js` only sets `document.title` and `<meta name="description">`. Extend it to also manage Open Graph and Twitter Card meta tags.

**Modify `src/hooks/useDocumentMeta.js`** to accept an expanded options object and create/update these additional meta tags:

```
og:title          → same as document.title
og:description    → same as meta description
og:type           → "website" for home/about, "article" for blog posts, "website" for programme pages
og:url            → canonical URL of the current page
og:site_name      → "KSOU Online"
og:locale         → "en_IN"
og:image          → a default OG image (we'll use the KSOU crest for now — path: /og-image.png — create a placeholder comment for this)

twitter:card      → "summary_large_image"
twitter:title     → same as og:title
twitter:description → same as og:description
twitter:image     → same as og:image
```

The hook signature should become:

```js
useDocumentMeta({
  title,
  description,
  ogType,       // optional, defaults to "website"
  ogImage,      // optional, defaults to "/og-image.png"
  canonicalPath, // optional, the path portion like "/programmes/mba"
})
```

The hook should:
- Create meta tags if they don't exist yet (query by `property` for OG, `name` for Twitter)
- Update them on every call
- Clean up / reset on unmount
- Build the full canonical URL from `canonicalPath` using a `SITE_URL` constant

**Also add to `src/constants/navigation.js`** (or a new `src/constants/seo.js` if you prefer):

```js
export const SITE_URL = 'https://ksou-online-website-2026-qmolackhn.vercel.app';
export const SITE_NAME = 'KSOU Online';
export const DEFAULT_OG_IMAGE = '/og-image.png';
```

**Then update every page that already calls `useDocumentMeta`** to pass the new fields:
- `Home.jsx` — `ogType: "website"`, `canonicalPath: "/"`
- `ProgrammePage.jsx` — `ogType: "website"`, `canonicalPath: "/programmes/${slug}"`
- `BlogArticlePage.jsx` — `ogType: "article"`, `canonicalPath: "/blogs/${slug}"`
- `BlogListingPage.jsx` — `ogType: "website"`, `canonicalPath: "/blogs"`
- `AboutPage.jsx` (if it calls useDocumentMeta) — `ogType: "website"`, `canonicalPath: "/about"`
- `AnnouncementsPage.jsx` (if it calls useDocumentMeta) — `ogType: "website"`, `canonicalPath: "/announcements"`

**Also add a `<link rel="canonical">` tag** in the same hook, using the full URL built from `SITE_URL + canonicalPath`. This prevents duplicate content issues.

---

## 5. JSON-LD Structured Data — New component + per-page schemas

Create a reusable component `src/components/common/JsonLd.jsx`:

```jsx
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Then add JSON-LD schemas to the relevant pages. Here's exactly what goes where:

### 5a. `EducationalOrganization` — render on Home page (`Home.jsx`)

Add a `<JsonLd>` component in the Home page with this data (pull real values from existing constants where they already exist — phone numbers from `CONTACT_NUMBERS`, etc.):

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Karnataka State Open University",
  "alternateName": "KSOU Online",
  "url": "https://ksou-online-website-2026-qmolackhn.vercel.app",
  "logo": "https://ksou-online-website-2026-qmolackhn.vercel.app/favicon.svg",
  "description": "Apply for UGC-approved online degrees from Karnataka State Open University. NAAC A+ rated. MBA, MA, MCom, BA, BCom, MSc. Flexible online learning for students and working professionals.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mysuru",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "sameAs": [],
  "accreditation": [
    "UGC (University Grants Commission) Approved",
    "NAAC A+ Accredited (GPA 3.31)",
    "AICTE Recognized"
  ]
}
```

Note: `sameAs` is empty because social links are still placeholders. Fill them in when real social URLs are added.

### 5b. `Course` schema — render on each Programme page (`ProgrammePage.jsx`)

Build the schema dynamically from the `programme` data object that's already loaded. Each programme page should render a `<JsonLd>` with:

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "<programme.hero.title — e.g. 'Online MBA Programme'>",
  "description": "<programme.seo.description>",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Karnataka State Open University",
    "alternateName": "KSOU Online",
    "url": "https://ksou-online-website-2026-qmolackhn.vercel.app"
  },
  "url": "https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/<slug>",
  "educationalLevel": "<'Undergraduate' or 'Postgraduate' based on the programme>",
  "timeToComplete": "<programme.feeDurationEligibility.duration — e.g. 'P2Y' for 2 years, use ISO 8601 duration>",
  "offers": {
    "@type": "Offer",
    "category": "Online Learning",
    "price": "<total fee number from the programme data>",
    "priceCurrency": "INR"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "<credits from programme data> credits"
  }
}
```

Build this dynamically — don't hardcode 6 copies. The `ProgrammePage.jsx` already has `programme` and `slug`, so construct the schema object in the component and pass it to `<JsonLd>`.

For `educationalLevel`, check if the slug starts with `ba` or `bcom` → "Undergraduate", otherwise → "Postgraduate".

For `timeToComplete`, the programme data already has duration info. Convert "2 Years" → "P2Y", "3 Years" → "P3Y" (ISO 8601 duration format).

### 5c. `FAQPage` schema — render on Home (FAQ section) and each Programme page

The FAQ data already exists in both places:
- **Home**: `src/components/sections/Faq/Faq.jsx` — pull the FAQ items from whatever constant file feeds this component
- **Programme pages**: each programme data file has a `faqs` array

For each, build and render:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "<question text>",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<answer text>"
      }
    }
  ]
}
```

Loop over the existing FAQ data to build the `mainEntity` array. Don't duplicate the data — import from the same constants.

### 5d. `BreadcrumbList` schema — render on Programme pages and Blog articles

**Programme pages** (`ProgrammePage.jsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Programmes",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/programmes"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "<programme name — e.g. 'Online MBA'>",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/programmes/<slug>"
    }
  ]
}
```

**Blog articles** (`BlogArticlePage.jsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/blogs"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "<article title>",
      "item": "https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/<slug>"
    }
  ]
}
```

### 5e. `Article` schema — render on each Blog article page (`BlogArticlePage.jsx`)

Build from the existing blog article data:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<article title>",
  "description": "<article excerpt or meta description>",
  "author": {
    "@type": "Organization",
    "name": "KSOU Online Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KSOU Online",
    "url": "https://ksou-online-website-2026-qmolackhn.vercel.app"
  },
  "datePublished": "<article date in ISO format — e.g. 2026-07-15>",
  "mainEntityOfPage": "https://ksou-online-website-2026-qmolackhn.vercel.app/blogs/<slug>",
  "articleSection": "<article category>"
}
```

---

## 6. Pre-rendering — Add `vite-plugin-ssr-prerender` or equivalent

This is the most critical SEO item. The site is a client-rendered SPA — crawlers see `<div id="root"></div>` and nothing else. We need to generate static HTML at build time for every route.

**Install `vite-plugin-prerender`** (or the best maintained equivalent for Vite 8):

```bash
npm install vite-plugin-prerender --save-dev
```

If `vite-plugin-prerender` isn't compatible with Vite 8, try `@prerenderer/rollup-plugin` or `vite-plugin-ssg`. The goal is the same: at `npm run build` time, launch a headless browser, visit every route, capture the rendered HTML, and write it as static `.html` files in `dist/`.

**Modify `vite.config.js`** to add the prerender plugin with all real routes:

```js
import prerender from 'vite-plugin-prerender' // or whatever the correct import is

// Inside the plugins array:
prerender({
  routes: [
    '/',
    '/about',
    '/announcements',
    '/blogs',
    '/blogs/career-options-after-bcom-degree',
    '/blogs/how-to-choose-right-online-degree-after-graduation',
    '/blogs/online-degree-while-working-full-time',
    '/blogs/online-learning-guide-admission-to-graduation',
    '/blogs/online-degree-vs-traditional-degree',
    '/programmes/mba',
    '/programmes/ba',
    '/programmes/bcom',
    '/programmes/mcom',
    '/programmes/ma',
    '/programmes/msc-mathematics',
  ],
})
```

**Important**: After adding this, run `npm run build` and verify the output. Check that `dist/programmes/mba/index.html` (and similar) contain the actual rendered content, not just the empty `<div id="root">`. If the prerender plugin doesn't work well with Vite 8 + React 19, document the issue and we'll evaluate alternatives (like switching to `react-snap` as a postbuild step, or adding SSG via a framework).

**If no prerender plugin works**, as a fallback add `react-snap` as a postbuild step:

```bash
npm install react-snap --save-dev
```

Add to `package.json` scripts:
```json
"postbuild": "react-snap"
```

And add react-snap config to `package.json`:
```json
"reactSnap": {
  "source": "dist",
  "inlineCss": true
}
```

**Whichever approach works, verify the build output has real HTML content in every route's file before committing.**

---

## 7. Image Optimization — Convert course PNGs to WebP

The 6 course images in `src/assets/courses/` are 1.8–2.1MB PNGs each. They're now above the fold on both the homepage cards AND all 6 programme hero sections, making them the single biggest Core Web Vitals / LCP blocker.

**Steps:**

1. Install `sharp` as a dev dependency:
```bash
npm install sharp --save-dev
```

2. Create a one-time conversion script at `scripts/optimize-images.mjs`:

```js
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const COURSES_DIR = path.resolve('src/assets/courses');
const files = fs.readdirSync(COURSES_DIR).filter(f => f.endsWith('.png'));

for (const file of files) {
  const input = path.join(COURSES_DIR, file);
  const output = path.join(COURSES_DIR, file.replace('.png', '.webp'));

  const result = await sharp(input)
    .resize(800) // 800px wide is plenty for a card/hero image
    .webp({ quality: 82 })
    .toFile(output);

  const originalSize = fs.statSync(input).size;
  console.log(
    `${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(result.size / 1024).toFixed(0)}KB`
  );
}

console.log('\nDone. Now update imports in constants/courses.js to use .webp files.');
console.log('After verifying, delete the original .png files.');
```

3. Run: `node scripts/optimize-images.mjs`

4. **Update all imports** in `src/constants/courses.js` — change every `import ... from '@/assets/courses/xyz.png'` to `'@/assets/courses/xyz.webp'`.

5. Also update the stale doc comment at the top of `CourseCard.jsx` that says "No course photography exists yet" — it's been wrong since photography was added (this is already noted in CLAUDE.md §6 item 3).

6. Also convert `src/assets/hero-campus.webp` — wait, that's already WebP (131KB). Skip it. Only the `courses/*.png` files need conversion.

7. After verifying the WebP images look correct in dev, delete the original `.png` files from `src/assets/courses/`.

---

## Verification Checklist

After implementing all 7 items, verify:

- [ ] `npm run lint` passes clean
- [ ] `npm run build` succeeds with no errors
- [ ] `dist/robots.txt` exists and is correct
- [ ] `dist/llms.txt` exists and is correct
- [ ] `dist/sitemap.xml` exists and is well-formed
- [ ] Open any page in dev → View Source or inspect `<head>` → OG/Twitter meta tags are present
- [ ] Open any programme page → check for `<script type="application/ld+json">` in DOM
- [ ] Open a blog article → check for Article + BreadcrumbList JSON-LD in DOM
- [ ] Homepage has EducationalOrganization + FAQPage JSON-LD
- [ ] If pre-rendering worked: `dist/programmes/mba/index.html` has real HTML content, not just `<div id="root"></div>`
- [ ] Course card images load fast (should be ~50-100KB each instead of 1.8MB)
- [ ] `npm run qa:mobile` still passes (no layout regressions)

**Do all 7 in order. Commit after each major item (or group small ones) with descriptive commit messages. Don't skip the build verification between steps.**
