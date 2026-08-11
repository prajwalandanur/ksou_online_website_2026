import { useEffect, useRef, useState } from 'react';

/**
 * Measures the pixel offset of the first and last item in a vertical
 * timeline (relative to the scrolling/track container), so a traveling
 * indicator can animate smoothly between them in real pixels rather than
 * percentages — percentages would drift whenever an accordion item
 * expands and changes the container's total height. Re-measures via
 * ResizeObserver so expand/collapse keeps the track accurate.
 */
export function useVerticalTimelineTrack() {
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);
  const lastItemRef = useRef(null);
  const [track, setTrack] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const first = firstItemRef.current;
    const last = lastItemRef.current;
    if (!container || !first || !last) return undefined;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      setTrack({
        top: firstRect.top - containerRect.top + firstRect.height / 2,
        bottom: lastRect.top - containerRect.top + lastRect.height / 2,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return { containerRef, firstItemRef, lastItemRef, track };
}
