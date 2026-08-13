import { useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from '@/constants/seo';
import {
  DEFAULT_LANGUAGE,
  KANNADA,
  hasKannadaVersion,
  localizePath,
} from '@/i18n/language';

/**
 * Upserts a <meta> tag, matching on `property` for Open Graph and `name` for
 * Twitter/standard tags — OG uses `property` per the RDFa spec it descends
 * from, and querying by the wrong attribute silently creates duplicates.
 * Tags this hook creates are marked `data-managed-meta` so the cleanup pass
 * can tell them apart from anything hand-written in index.html.
 */
function upsertMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    tag.setAttribute('data-managed-meta', '');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('data-managed-meta', '');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Declares the English/Kannada pair for a page via `link rel=alternate`.
 *
 * `englishPath` is the *English* path for the page; both URLs are derived
 * from it so the two tags can never disagree. Pages with no Kannada version
 * get no alternates at all — `localizePath` would return the English URL for
 * both, and pointing hreflang="kn" at an English page tells Google a
 * translation exists when it does not.
 *
 * Every render replaces the whole set rather than upserting individually:
 * navigating between two pages that each declare alternates would otherwise
 * leave the previous page's URLs behind.
 */
function upsertAlternates(englishPath) {
  document.head
    .querySelectorAll('link[rel="alternate"][data-managed-meta]')
    .forEach((node) => node.remove());

  if (!englishPath || !hasKannadaVersion(englishPath)) return;

  const urls = [
    ['en', absoluteUrl(localizePath(englishPath, DEFAULT_LANGUAGE))],
    ['kn', absoluteUrl(localizePath(englishPath, KANNADA))],
    // x-default names the version to serve when no declared language fits.
    ['x-default', absoluteUrl(localizePath(englishPath, DEFAULT_LANGUAGE))],
  ];

  for (const [hreflang, href] of urls) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    link.setAttribute('data-managed-meta', '');
    document.head.appendChild(link);
  }
}

/**
 * Sets the document title, description, Open Graph / Twitter card tags and
 * the canonical link for the current route.
 *
 * Takes an options object rather than positional args: it grew past two
 * parameters and `useDocumentMeta(title, description, undefined, '/blogs')`
 * is a bug waiting to happen.
 *
 * There is deliberately **no cleanup on unmount**. Every route that cares
 * calls this with its own values, including Home with the site defaults, so
 * navigating anywhere always overwrites the tags. Removing them on unmount
 * would instead leave a bare <head> for a frame during route transitions,
 * and — more importantly — a crawler that snapshots mid-transition would see
 * nothing. Overwrite-always is the safer invariant.
 */
export function useDocumentMeta({
  title,
  description,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  canonicalPath,
  alternates,
}) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    } else {
      upsertMeta('name', 'description', description);
    }

    // og:image and canonical must be absolute — relative URLs are ignored by
    // most social scrapers and by Google's canonical handling.
    const imageUrl = ogImage?.startsWith('http') ? ogImage : absoluteUrl(ogImage);
    const pageUrl = canonicalPath ? absoluteUrl(canonicalPath) : undefined;

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', SITE_LOCALE);
    upsertMeta('property', 'og:image', imageUrl);
    if (pageUrl) upsertMeta('property', 'og:url', pageUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (pageUrl) upsertCanonical(pageUrl);

    upsertAlternates(alternates);
  }, [title, description, ogType, ogImage, canonicalPath, alternates]);
}
