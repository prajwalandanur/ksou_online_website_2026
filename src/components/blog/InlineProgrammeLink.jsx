import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CLASSES =
  'group inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10';

/**
 * Pass `to` for an in-app route, or `href` for anything the router cannot
 * navigate to — an external portal, or a PDF under public/.
 *
 * The distinction is load-bearing, not stylistic: a router <Link> to
 * "/documents/x.pdf" or an https:// URL is matched against the route table,
 * misses every route and lands on the catch-all "Page not found" instead of
 * fetching the file. Same trap NAV_LINKS' `newTab` flag exists to avoid.
 */
export function InlineProgrammeLink({ to, href, label }) {
  const arrow = (
    <ArrowUpRight
      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={CLASSES}>
        {label}
        {arrow}
      </a>
    );
  }

  return (
    <Link to={to} className={CLASSES}>
      {label}
      {arrow}
    </Link>
  );
}
