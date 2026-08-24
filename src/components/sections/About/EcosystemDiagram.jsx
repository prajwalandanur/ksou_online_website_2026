import { useContent } from '@/i18n/content';

/**
 * The connected-system graphic: KSOU Online at the centre, six parts of the
 * ecosystem on a ring around it.
 *
 * **One DOM tree, two layouts.** The nodes are a single `<ul>`. Below `lg`
 * they are ordinary grid items; from `lg` up each becomes absolutely
 * positioned at a computed point on the ring. The inline `left`/`top` are
 * always present and simply inert while the element is statically positioned,
 * which is what lets one list serve both layouts — rendering the ring and a
 * fallback list separately would either duplicate all six labels for screen
 * readers or hide one copy from them.
 *
 * Angles start at the top and step 60°, offset so no node lands at due left
 * or due right. That offset is doing real work: at ±0°/180° a node box
 * centred on the ring would extend past the container edge, whereas ±30°
 * pulls the widest points to ~92% and ~8%. Adding a seventh node means
 * re-deriving both the step and the box width.
 */
const RING_RADIUS = 34; // % of the container, matching the SVG circle below
const START_ANGLE = -90; // top
const STEP = 60;

const angleFor = (i) => ((START_ANGLE + i * STEP) * Math.PI) / 180;

const positionFor = (i) => ({
  left: `${50 + RING_RADIUS * Math.cos(angleFor(i))}%`,
  top: `${50 + RING_RADIUS * Math.sin(angleFor(i))}%`,
});

/** Spoke endpoints, kept clear of both the hub and the node boxes. */
const SPOKE_INNER = 13;
const SPOKE_OUTER = 27;

export function EcosystemDiagram() {
  const { about } = useContent();
  const ecosystem = about.ecosystem;

  return (
    <div className="relative mx-auto w-full lg:aspect-square lg:max-w-[560px]">
      {/* Decorative: the ring and spokes carry no information the labels
          don't already state, so they stay out of the accessibility tree. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <circle
          cx="50"
          cy="50"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.35"
          strokeDasharray="1.5 2"
        />
        {ecosystem.nodes.map((node, i) => {
          const angle = angleFor(i);
          return (
            <line
              key={node.id}
              x1={50 + SPOKE_INNER * Math.cos(angle)}
              y1={50 + SPOKE_INNER * Math.sin(angle)}
              x2={50 + SPOKE_OUTER * Math.cos(angle)}
              y2={50 + SPOKE_OUTER * Math.sin(angle)}
              stroke="var(--color-border)"
              strokeWidth="0.35"
            />
          );
        })}
      </svg>

      <p className="relative mx-auto flex w-fit items-center justify-center rounded-full bg-primary px-7 py-4 text-center font-brand text-xl leading-none text-white shadow-[0_1px_2px_rgba(17,17,17,0.06),0_20px_40px_-20px_rgba(65,105,225,0.6)] sm:text-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-8 lg:py-5">
        {ecosystem.hub}
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-0 lg:block">
        {ecosystem.nodes.map((node, i) => (
          <li
            key={node.id}
            style={positionFor(i)}
            // `h-full` levels the six cards in the mobile grid, but it has to
            // be released at lg: once the card is absolutely positioned its
            // containing block is the aspect-square ring, so `height: 100%`
            // makes every node as tall as the whole diagram and they pile up
            // over each other and the section around them.
            className="flex h-full flex-col items-center gap-2 rounded-[20px] border border-border bg-white px-4 py-4 text-center shadow-[0_1px_2px_rgba(17,17,17,0.03)] lg:absolute lg:h-auto lg:w-[26%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-3 lg:py-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <node.Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[13px] font-semibold leading-snug text-navy">{node.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
