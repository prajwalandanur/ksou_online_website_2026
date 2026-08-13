/**
 * Shared geometry for the header's three stacked bands — utility bar,
 * navigation row, announcement ticker.
 *
 * All three are inset floating cards from `lg` up, and they only read as one
 * header if their left and right edges line up exactly. That alignment used
 * to be three separate copies of the same gutter scale, which drifted every
 * time one band was touched; these two constants are the single source of it.
 *
 * **Below `lg` there is no card.** A phone has no width to spend on gutters,
 * so the bands stay full-bleed and lean on hairline borders instead.
 *
 * Gutters tighten at `xl` on purpose: 1280-1535 is the band where the nav row
 * is tightest (seven links plus two CTAs), and every pixel of gutter there
 * comes straight off the row's slack.
 */
export const HEADER_BAND_CONTAINER =
  'mx-auto w-full max-w-[90rem] px-3 sm:px-5 lg:px-6 xl:px-5 2xl:px-8';

/**
 * Card shell. Each band supplies its own background — the utility bar is
 * `bg-muted/60`, the nav row `bg-background`, the ticker `bg-ticker` — because
 * the tint is what distinguishes them; the shape is what unites them.
 */
export const HEADER_BAND_CARD = 'lg:rounded-[26px] lg:border lg:border-border/70';

/**
 * Vertical rhythm between bands: 12px at `lg`. The nav row's own `lg:py-3`
 * supplies the gaps above and below it, so the outer bands only need to pad
 * the side that faces the viewport edge.
 */
export const HEADER_BAND_LEAD = 'lg:pt-3';
export const HEADER_BAND_TRAIL = 'lg:pb-3';
