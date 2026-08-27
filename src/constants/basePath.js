/**
 * Where this site is mounted.
 *
 * The build is deployed to IIS at `https://onlineprogramme.ksoumysuru.ac.in/ksou_test/`,
 * alongside the university's existing site at the domain root. Everything
 * the browser requests therefore needs that prefix.
 *
 * ── One source of truth, deliberately ───────────────────────────────────
 * The prefix is declared **once**, in `vite.config.js`'s `base`. Vite
 * exposes it as `import.meta.env.BASE_URL`, and everything here derives from
 * that rather than repeating the literal `/ksou_test/` across the codebase.
 *
 * That matters because the subpath is not a permanent fact: this is a test
 * mount, and the obvious next step is moving to the domain root or to a
 * different folder. Hard-coding the string into every asset reference would
 * turn that move into a find-and-replace across dozens of files, with the
 * ones that were missed only failing in production. Changing `base` in
 * `vite.config.js` now re-points the whole site.
 *
 * ── What needs a prefix and what does not ───────────────────────────────
 * **Not** router paths. `<Link to="/contact">` and the `<Route path>` values
 * stay exactly as written — React Router's `basename` (below) prefixes them
 * automatically, and prefixing them by hand as well would produce
 * `/ksou_test/ksou_test/contact`.
 *
 * **Not** assets imported through the bundler. `import img from '@/assets/x.webp'`
 * is rewritten by Vite with the base already applied, which is also why
 * those files stay in `src/assets/` and keep their content hashes.
 *
 * **Yes** for anything in `public/`, which Vite copies verbatim and never
 * rewrites: the PDFs, the question papers, the schema images. Those are
 * plain strings in a `href`/`src` and must carry the prefix themselves —
 * that is what `withBase` is for.
 */

/** The mount point, always with a trailing slash (Vite's own convention). */
export const BASE_PATH = import.meta.env.BASE_URL || '/';

/**
 * The same value shaped for React Router, which wants no trailing slash.
 *
 * `'/ksou_test/'` → `'/ksou_test'`; a root deployment (`'/'`) collapses to
 * `'/'` rather than to an empty string, which Router treats as invalid.
 */
export const ROUTER_BASENAME = BASE_PATH.replace(/\/+$/, '') || '/';

/**
 * Prefixes a `public/` asset path with the deployment base.
 *
 * Accepts the path with or without a leading slash, so existing constants
 * written as `'/documents/x.pdf'` need no reformatting:
 *   withBase('/documents/x.pdf') -> '/ksou_test/documents/x.pdf'
 *
 * Absolute URLs and protocol-relative ones pass through untouched — several
 * constants mix site-relative paths with external links, and silently
 * mangling `https://…` into a local path would be far worse than a no-op.
 */
export function withBase(path = '/') {
  const value = String(path);
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) return value;
  return `${BASE_PATH}${value.replace(/^\/+/, '')}`;
}
