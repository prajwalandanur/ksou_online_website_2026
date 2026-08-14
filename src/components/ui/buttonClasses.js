// `whitespace-nowrap`: button labels are short by design, and letting one
// break mid-label turns a pill into a two-line blob — "LMS Login" was doing
// exactly that in the squeezed mobile navbar.
const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/**
 * Padding and type scale, kept **out of `BASE_CLASSES` on purpose**.
 *
 * They used to live there, and that quietly broke callers trying to shrink a
 * button through `className` — but only at the *unprefixed* step, which is what
 * made it so easy to miss. `px-5` and `px-2` are the same utility at different
 * scale steps, so they carry equal specificity and the winner is whichever
 * Tailwind emits later: the larger step, not the one written last in the JSX.
 * A `sm:px-3` does win, because variants are emitted after all the base
 * utilities. So the navbar's `sm:`/`xl:`/`2xl:` sizes applied while its bare
 * `px-2 py-1.5 text-[11px]` silently did not, and phones — the one width that
 * needed the compact size — rendered the full `px-5 py-2.5 text-sm`, ~46px of
 * a row that had none to spare.
 *
 * A `size` therefore *replaces* the scale rather than competing with it. Add a
 * named size here instead of overriding padding from a `className`.
 */
export const SIZE_CLASSES = {
  default: 'px-5 py-2.5 text-sm',
  /**
   * The header CTAs. The `sm` step and up is the scale the navbar has always
   * rendered, kept verbatim — only the phone step was ever broken, so only the
   * phone step changes. Below `sm` the row must fit the crest, the bilingual
   * wordmark, both CTAs and the hamburger inside 320-414px, and this is the
   * step that pays for it.
   *
   * **Shrink the label with the padding, not one without the other.** The
   * ratios that keep a pill looking like a pill are the ones the rest of this
   * scale already uses: side padding ≈ 1.0x the font size (`sm` is 12px on
   * 12.5px) and vertical padding ≈ 0.6x (8px on 12.5px). A first pass cut
   * padding to `px-1.5` but left the label at 10.5px — ratio 0.57 — and the
   * text visibly crowded the pill edges. Both steps below `sm` hold ~0.9-1.0
   * horizontal and ~0.65 vertical, so the button reads as the same component
   * at every width, just smaller.
   *
   * Two steps rather than one because the extra ~24px a 400px phone has over
   * a 360px one is worth spending on legibility: 9px labels are as small as
   * these should ever go, and only the narrowest phones need them.
   */
  nav: 'px-2 py-1.5 text-[9px] min-[400px]:px-2.5 min-[400px]:text-[10.5px] sm:px-3 sm:py-2 sm:text-[12.5px] xl:px-3 xl:text-[13px] 2xl:px-3.5 2xl:text-[13.5px]',
};

export const VARIANT_CLASSES = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(65,105,225,0.1),0_8px_16px_-8px_rgba(65,105,225,0.55)] hover:bg-primary-hover hover:shadow-[0_2px_4px_rgba(65,105,225,0.15),0_14px_24px_-10px_rgba(65,105,225,0.6)] hover:-translate-y-0.5',
  secondary:
    'border border-border bg-white text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted hover:shadow-[0_8px_16px_-10px_rgba(17,17,17,0.15)]',
  ghost: 'text-foreground hover:bg-muted',
  // The navbar's second CTA. Gold rather than another blue so the two header
  // buttons read as different actions at a glance; navy text rather than
  // white because white on gold is ~1.9:1 while navy is 6.25:1. This is the
  // *only* place gold carries text — everywhere else it is a decorative
  // hairline or dot (see the token note in index.css).
  gold:
    'bg-gold text-navy shadow-[0_1px_2px_rgba(201,162,39,0.12),0_8px_16px_-8px_rgba(201,162,39,0.55)] hover:bg-gold-hover hover:shadow-[0_2px_4px_rgba(201,162,39,0.18),0_14px_24px_-10px_rgba(201,162,39,0.6)] hover:-translate-y-0.5',
  // The next two are for CTAs sitting on a solid primary-blue background
  // (e.g. the final CTA panel) — distinct variants, not overrides of
  // `primary`/`secondary`, because overriding another variant's bg/border/
  // text color utilities via className is unreliable: Tailwind's generated
  // CSS order for same-property utility classes doesn't follow JSX
  // class-string order, so a later override can still lose the cascade to
  // the variant's own class.
  onPrimary:
    'bg-white text-primary shadow-[0_8px_20px_-8px_rgba(17,17,17,0.35)] hover:bg-white/90 hover:-translate-y-0.5',
  outlineOnPrimary:
    'border border-white/35 bg-transparent text-primary-foreground hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10',
};

/**
 * Lives outside Button.jsx so that file only exports components (React Fast
 * Refresh requires that). Use this for the rare element that must *look*
 * like a Button but can't be one — e.g. a <summary>, which has its own
 * semantics. Prefer <Button> itself everywhere else.
 */
export function buttonClasses(variant = 'primary', className = '', size = 'default') {
  return `${BASE_CLASSES} ${SIZE_CLASSES[size] ?? SIZE_CLASSES.default} ${VARIANT_CLASSES[variant]} ${className}`;
}
