import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VARIANT_CLASSES = {
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
 * Renders a <Link> for internal hrefs, a plain <a> for external/tel/mailto
 * hrefs, or a <button> when no `to`/`href` is given.
 */
export const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary',
    withArrow = false,
    className = '',
    children,
    ...props
  },
  ref,
) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${VARIANT_CLASSES[variant]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  );

  if (as === 'a' || href) {
    return (
      <a ref={ref} href={href} className={`group ${classes}`} {...props}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={`group ${classes}`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} type="button" className={`group ${classes}`} {...props}>
      {content}
    </button>
  );
});
