import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't reset scroll position on navigation (no full page
 * load), so clicking a card while scrolled down on the previous page lands
 * you mid-scroll on the new one. Depends on `pathname` only (not the full
 * location) so in-page anchor jumps — e.g. the blog Table of Contents,
 * which only changes the hash — aren't affected.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
