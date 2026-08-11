import { useEffect } from 'react';

/**
 * Sets the document title and meta description on mount. No cleanup/restore
 * on unmount — every route that cares about SEO calls this with its own
 * values (including Home, with the site defaults), so navigating anywhere
 * always leaves the tag correct rather than relying on unmount ordering.
 */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
