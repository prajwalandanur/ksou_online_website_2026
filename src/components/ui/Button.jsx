import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buttonClasses } from './buttonClasses';

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
    size = 'default',
    withArrow = false,
    className = '',
    children,
    ...props
  },
  ref,
) {
  // Padding/type come from `size`, never from `className` — see the note on
  // SIZE_CLASSES for why a `className` override silently loses that fight.
  const classes = buttonClasses(variant, className, size);

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
