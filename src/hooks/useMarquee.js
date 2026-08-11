import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a continuously auto-scrolling horizontal track via real
 * `scrollLeft` (not a CSS transform), so the element stays natively
 * touch/wheel-scrollable at all times. Expects its children to be two
 * back-to-back copies of the same content — once scrollLeft passes the
 * width of one copy, it wraps by that same width, so the loop has no
 * visible reset. Any interaction (hover, touch, wheel) pauses the
 * auto-scroll; it resumes afterwards.
 */
export function useMarquee({ speedPxPerSec = 48, resumeDelayMs = 2500 } = {}) {
  const containerRef = useRef(null);
  const setWidthRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const measure = () => {
      setWidthRef.current = container.scrollWidth / 2;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Keeps the loop seamless even while the user is manually scrolling.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const onScroll = () => {
      const setWidth = setWidthRef.current;
      if (!setWidth) return;
      if (container.scrollLeft >= setWidth) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft < 0) {
        container.scrollLeft += setWidth;
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;

    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      container.scrollLeft += speedPxPerSec * dt;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [isPaused, prefersReducedMotion, speedPxPerSec]);

  const pause = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    setIsPaused(false);
  }, []);

  const scheduleResume = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), resumeDelayMs);
  }, [resumeDelayMs]);

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  return { containerRef, pause, resume, scheduleResume, prefersReducedMotion };
}
