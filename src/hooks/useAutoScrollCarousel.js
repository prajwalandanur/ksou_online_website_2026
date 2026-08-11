import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a horizontally-scrollable element that auto-advances through its
 * children on a timer, while staying fully swipeable by hand. Manual
 * interaction pauses the timer; it resumes a few seconds after the user
 * lets go. The active index is re-synced from real scroll position so
 * auto-advance always continues from wherever the user left it.
 */
export function useAutoScrollCarousel(
  itemCount,
  { intervalMs = 2000, resumeDelayMs = 4000 } = {},
) {
  const containerRef = useRef(null);
  const indexRef = useRef(0);
  const resumeTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    const child = container?.children[index];
    if (!container || !child) return;
    container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || itemCount <= 1) return undefined;

    const id = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % itemCount;
      scrollToIndex(indexRef.current);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [isPaused, prefersReducedMotion, itemCount, intervalMs, scrollToIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let syncTimer;
    const onScroll = () => {
      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(() => {
        const children = Array.from(container.children);
        let closest = 0;
        let closestDistance = Infinity;
        children.forEach((child, i) => {
          const distance = Math.abs(child.offsetLeft - container.scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        indexRef.current = closest;
      }, 120);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      window.clearTimeout(syncTimer);
    };
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), resumeDelayMs);
  }, [resumeDelayMs]);

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  const goTo = useCallback(
    (index) => {
      const clamped = ((index % itemCount) + itemCount) % itemCount;
      indexRef.current = clamped;
      scrollToIndex(clamped);
    },
    [itemCount, scrollToIndex],
  );

  const next = useCallback(() => {
    pause();
    goTo(indexRef.current + 1);
  }, [pause, goTo]);

  const prev = useCallback(() => {
    pause();
    goTo(indexRef.current - 1);
  }, [pause, goTo]);

  return { containerRef, pause, next, prev };
}
