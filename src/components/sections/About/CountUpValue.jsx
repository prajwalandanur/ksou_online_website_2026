import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const EASE_OUT = (t) => 1 - (1 - t) ** 3;

/**
 * Counts the numeric part of a display value up when it scrolls into view.
 *
 * The stats on this page aren't plain numbers — they're strings like
 * "115K+", "1,000+" and "A+". This parses off any prefix/suffix and
 * animates only the digits, so "A+" (no digits at all) simply renders as
 * itself rather than needing a separate component. Formatting is preserved
 * by re-applying the source's own thousands separators.
 */
function parse(display) {
  const match = String(display).match(/^(\D*?)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  return { prefix, target, suffix, grouped: digits.includes(',') };
}

export function CountUpValue({ value, durationMs = 1400, className = '' }) {
  const ref = useRef(null);
  // No negative `margin` here on purpose. It was `-80px`, which silently
  // never fired for the community section's figure on a mobile viewport —
  // the shrunken rootMargin box didn't intersect that element even when it
  // sat dead-centre on screen, so the number stayed frozen at 0 while the
  // same component worked everywhere else. The slightly earlier trigger
  // point is imperceptible; a stat stuck at zero is not.
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const parsed = parse(value);
  const [current, setCurrent] = useState(parsed ? 0 : null);

  useEffect(() => {
    if (!parsed || !inView || prefersReducedMotion) return undefined;

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setCurrent(Math.round(EASE_OUT(progress) * parsed.target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `parsed` is derived from `value`, so keying on `value` is sufficient
    // and avoids restarting the animation on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView, prefersReducedMotion, durationMs]);

  // Non-numeric (e.g. "A+"), or reduced motion: show the final value.
  if (!parsed || prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const shown = parsed.grouped ? current.toLocaleString('en-IN') : String(current);

  return (
    <span ref={ref} className={className}>
      {/* The live region would announce every frame, so expose the final
          value to assistive tech and hide the animating digits from it. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parsed.prefix}
        {shown}
        {parsed.suffix}
      </span>
    </span>
  );
}
