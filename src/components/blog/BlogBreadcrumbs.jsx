import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function BlogBreadcrumbs({ category, title }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm"
    >
      <Link to="/" className="transition-colors hover:text-primary">
        Home
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      <Link to="/blogs" className="transition-colors hover:text-primary">
        Blogs
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span>{category}</span>
      <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span aria-current="page" className="line-clamp-1 font-medium text-foreground">
        {title}
      </span>
    </nav>
  );
}
