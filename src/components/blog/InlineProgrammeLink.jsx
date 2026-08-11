import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InlineProgrammeLink({ to, label }) {
  return (
    <Link
      to={to}
      className="group inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
    >
      {label}
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
