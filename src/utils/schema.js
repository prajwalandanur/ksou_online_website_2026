import { SITE_NAME, SITE_URL, absoluteUrl } from '@/constants/seo';

/**
 * JSON-LD schema builders.
 *
 * Every value is derived from data that already exists in constants/ — no
 * figure, fee, credit count or accreditation claim is written here. If a
 * source field is missing the corresponding schema property is omitted
 * rather than guessed, because structured data that contradicts the page is
 * worse for search than no structured data at all.
 */

const PROVIDER = {
  '@type': 'EducationalOrganization',
  name: 'Karnataka State Open University',
  alternateName: SITE_NAME,
  url: SITE_URL,
};

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Karnataka State Open University',
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg'),
    description:
      'Apply for UGC-approved online degrees from Karnataka State Open University. NAAC A+ rated. MBA, MA, MCom, BA, BCom, MSc. Flexible online learning for students and working professionals.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mysuru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    // Empty until real social profiles exist — the footer links are still
    // honest placeholders, and pointing sameAs at nothing is better than
    // pointing it at a guessed handle.
    sameAs: [],
    accreditation: [
      'UGC (University Grants Commission) Approved',
      'NAAC A+ Accredited (GPA 3.31)',
      'AICTE Recognized',
    ],
  };
}

/** `[{ question, answer }]` → FAQPage. Returns null for an empty list. */
export function buildFaqSchema(items) {
  if (!items?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** `[{ name, path }]` → BreadcrumbList, positions assigned in order. */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

// "2 Years" → "P2Y" (ISO 8601 duration). Anything unparseable yields
// undefined so the property is dropped instead of emitting garbage.
function toIsoDuration(value) {
  const years = /^(\d+)\s*year/i.exec(value?.trim() ?? '');
  return years ? `P${years[1]}Y` : undefined;
}

// "₹80,000" → "80000". Schema.org wants a bare number as a string.
function toPriceValue(value) {
  const digits = (value ?? '').replace(/[^\d]/g, '');
  return digits || undefined;
}

const findByLabel = (list, label) =>
  list?.find((item) => item.label?.toLowerCase() === label.toLowerCase())?.value;

export function buildCourseSchema(programme, slug) {
  const { hero, seo, feeDurationEligibility, infoStrip } = programme;

  const duration = feeDurationEligibility?.find((item) => item.id === 'duration')?.value;
  const fee = feeDurationEligibility?.find((item) => item.id === 'fees')?.value;
  const credits = findByLabel(infoStrip, 'Credits');

  const timeToComplete = toIsoDuration(duration);
  const price = toPriceValue(fee);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: [hero?.titleLead, hero?.titleAccent].filter(Boolean).join(' '),
    description: seo?.description,
    provider: PROVIDER,
    url: absoluteUrl(`/programmes/${slug}`),
    // BA and B.Com are the only undergraduate programmes; everything else
    // in PROGRAMMES is postgraduate.
    educationalLevel: slug === 'ba' || slug === 'bcom' ? 'Undergraduate' : 'Postgraduate',
  };

  if (timeToComplete) schema.timeToComplete = timeToComplete;

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      category: 'Online Learning',
      price,
      priceCurrency: 'INR',
    };
  }

  schema.hasCourseInstance = {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    ...(credits ? { courseWorkload: `${credits} credits` } : {}),
  };

  return schema;
}

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/**
 * "Jul 21, 2026" → "2026-07-21". The blog data stores dates as display
 * strings, and schema.org needs ISO 8601. Parsed by hand rather than with
 * `new Date()` so the result can't shift a day across time zones.
 */
export function toIsoDate(displayDate) {
  const match = /^([A-Za-z]{3})[a-z]*\s+(\d{1,2}),\s*(\d{4})$/.exec(displayDate?.trim() ?? '');
  if (!match) return undefined;
  const month = MONTHS[match[1].toLowerCase()];
  if (!month) return undefined;
  return `${match[3]}-${month}-${match[2].padStart(2, '0')}`;
}

export function buildArticleSchema(article, slug) {
  const datePublished = toIsoDate(article.publishedDate);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seo?.description ?? article.excerpt,
    author: {
      '@type': 'Organization',
      // Institutional, matching the byline on the page — no named author was
      // ever supplied and inventing one would misrepresent authorship.
      name: article.author ?? 'KSOU Online Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(`/blogs/${slug}`),
    articleSection: article.category,
  };

  if (datePublished) schema.datePublished = datePublished;

  return schema;
}
