/**
 * Language plumbing for the English/Kannada site.
 *
 * **The URL is the only source of truth.** `/programmes/mba` is English,
 * `/kn/programmes/mba` is Kannada. Deliberately *not* localStorage or
 * `navigator.language`, for three reasons that all bite at once:
 *
 *  1. Google indexes URLs. A single URL that renders either language
 *     depending on a browser value gives the Kannada content nowhere to
 *     rank — which was the entire point of translating it.
 *  2. `scripts/prerender.mjs` writes one static HTML file per route. If the
 *     language came from storage, every prerendered file would be English
 *     and the Kannada markup would never exist statically.
 *  3. A stored or negotiated language resolves *after* first paint, so the
 *     page would flash English and then re-render — the same class of bug
 *     the navbar's `useMediaQuery` exists to avoid.
 *
 * A visitor's choice therefore persists the ordinary way: by being in the
 * URL they bookmarked, shared or refreshed.
 */

export const DEFAULT_LANGUAGE = 'en';
export const KANNADA = 'kn';

/** URL segment that marks the Kannada tree. */
export const KANNADA_PREFIX = '/kn';

/**
 * Only these pages exist in Kannada. Blogs and Announcements are
 * intentionally absent: parking an untranslated English page behind a
 * Kannada URL creates a duplicate-content pair that hreflang would then
 * assert is a translation, which is worse than having no Kannada URL at all.
 * Add a pattern here only once that page's content is genuinely translated.
 */
export const KANNADA_ROUTE_PATTERNS = [
  /^\/$/,
  // Added 2026-08-21, when `src/locales/kn/about.js` landed. Every string the
  // About sections render now comes through `useContent()`, so this page is
  // genuinely translated rather than an English page behind a Kannada URL.
  /^\/about$/,
  // The listing page. Its own framing is translated (`programmesPage` in the
  // content registry) and everything else on it — section headings and the
  // course cards — already came from the registry, so this needed no new
  // translation beyond the heading and intro paragraph.
  /^\/programmes$/,
  /^\/programmes\/[^/]+$/,
];

/** Language implied by a pathname. */
export function languageFromPath(pathname) {
  return pathname === KANNADA_PREFIX || pathname.startsWith(`${KANNADA_PREFIX}/`)
    ? KANNADA
    : DEFAULT_LANGUAGE;
}

/** The same page with any `/kn` prefix removed — i.e. its English path. */
export function stripLanguage(pathname) {
  if (pathname === KANNADA_PREFIX) return '/';
  if (pathname.startsWith(`${KANNADA_PREFIX}/`)) {
    return pathname.slice(KANNADA_PREFIX.length) || '/';
  }
  return pathname;
}

/** Whether an English path has a Kannada counterpart built. */
export function hasKannadaVersion(pathname) {
  const base = stripLanguage(pathname);
  return KANNADA_ROUTE_PATTERNS.some((pattern) => pattern.test(base));
}

/**
 * Render `path` in `language`.
 *
 * Falls back to the English path when the target page has no Kannada
 * version, so a link can be localised unconditionally without ever pointing
 * at a route that does not exist.
 */
export function localizePath(path, language) {
  const base = stripLanguage(path);
  if (language !== KANNADA || !hasKannadaVersion(base)) return base;
  return base === '/' ? KANNADA_PREFIX : `${KANNADA_PREFIX}${base}`;
}
