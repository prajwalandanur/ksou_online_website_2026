/**
 * Merges a Kannada content object over its English counterpart, key by key.
 *
 * This is what lets `src/locales/kn/*` files carry **only translated text**.
 * Everything structural — `Icon` components, imported images, `href`s,
 * `slug`s, numeric credits, `isPlaceholder` flags — is inherited from the
 * English object, so a Kannada file can never accidentally drop an icon or
 * fork a fee. The English constants stay the single source of truth,
 * provenance comments and all.
 *
 * Fallback is per key, not per file: anything the Kannada side omits renders
 * in English. A partially translated page therefore degrades to mixed
 * language, never to a blank or a raw key like `programmes.mba.hero.title`.
 *
 * Arrays merge **positionally**, which is the right behaviour here because
 * every Kannada array mirrors the English one item for item; a hole is
 * expressed as `null` and inherits that item wholesale. Extra items on the
 * Kannada side are ignored rather than appended — the English file decides
 * how many FAQs or steps exist, so a stray entry can't smuggle in content
 * that has no English original.
 */

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export function mergeContent(base, override) {
  if (override === undefined || override === null) return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((item, i) => mergeContent(item, override[i]));
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(override)) return base;
    const out = { ...base };
    for (const key of Object.keys(override)) {
      // Only merge keys the English side actually has. A Kannada-only key
      // would be text with no English original, which is exactly the drift
      // this layer exists to prevent.
      if (key in base) out[key] = mergeContent(base[key], override[key]);
    }
    return out;
  }

  // Leaf: React elements and component references land here too, so guard
  // against a translation file replacing one with a string.
  return typeof override === typeof base || base === undefined ? override : base;
}
