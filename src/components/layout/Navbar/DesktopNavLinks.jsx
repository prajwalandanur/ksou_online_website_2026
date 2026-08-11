import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/navigation';

const BASE =
  'block cursor-pointer rounded-full px-4 py-2 text-[14.5px] font-semibold tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const ACTIVE = 'bg-primary/10 text-primary';
const INACTIVE = 'text-foreground/70 hover:bg-muted hover:text-foreground';

export function DesktopNavLinks() {
  return (
    <ul className="hidden items-center gap-0.5 lg:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          {link.newTab ? (
            // A PDF, not a route — a router NavLink would try to navigate
            // the SPA to it. Never gets an active state, since the user
            // never "is on" this page.
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (PDF, opens in a new tab)`}
              className={`${BASE} ${INACTIVE}`}
            >
              {link.label}
            </a>
          ) : (
            <NavLink
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) => `${BASE} ${isActive ? ACTIVE : INACTIVE}`}
            >
              {link.label}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}
