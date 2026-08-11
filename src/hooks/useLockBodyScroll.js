import { useEffect } from 'react';

/** Locks body scroll while `locked` is true (e.g. mobile drawer open). */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
