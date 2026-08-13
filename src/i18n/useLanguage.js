import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { KANNADA, languageFromPath, localizePath } from './language';

/** Current language, read off the URL. See the note in language.js. */
export function useLanguage() {
  return languageFromPath(useLocation().pathname);
}

/**
 * Returns a `to(path)` helper that rewrites an English in-app path into the
 * current language.
 *
 * Every internal <Link> on a translated page should route through this, or
 * following one link silently drops the visitor back into English. Paths
 * with no Kannada counterpart resolve to their English URL by design, so
 * this is always safe to apply.
 */
export function useLocalizedPath() {
  const language = useLanguage();
  return useCallback((path) => localizePath(path, language), [language]);
}

export { KANNADA };
