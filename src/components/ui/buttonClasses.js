// `whitespace-nowrap`: button labels are short by design, and letting one
// break mid-label turns a pill into a two-line blob — "LMS Login" was doing
// exactly that in the squeezed mobile navbar.
const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export const VARIANT_CLASSES = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(65,105,225,0.1),0_8px_16px_-8px_rgba(65,105,225,0.55)] hover:bg-primary-hover hover:shadow-[0_2px_4px_rgba(65,105,225,0.15),0_14px_24px_-10px_rgba(65,105,225,0.6)] hover:-translate-y-0.5',
  secondary:
    'border border-border bg-white text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted hover:shadow-[0_8px_16px_-10px_rgba(17,17,17,0.15)]',
  ghost: 'text-foreground hover:bg-muted',
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
export function buttonClasses(variant = 'primary', className = '') {
  return `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;
}
