import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query.
 *
 * Built on `useSyncExternalStore` rather than useState+useEffect: matchMedia
 * is an external store, so this reads the correct value during the very
 * first render instead of painting a wrong one and correcting it in an
 * effect. That matters here — a one-frame wrong answer would swap the entire
 * header, which is the flash this exists to prevent. It also keeps the
 * `react-hooks/set-state-in-effect` lint rule satisfied.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // Server snapshot is never used (no SSR here) but the argument is required.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
