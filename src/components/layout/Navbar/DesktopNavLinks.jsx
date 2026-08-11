import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/navigation';

export function DesktopNavLinks() {
  return (
    <ul className="hidden items-center gap-0.5 lg:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <NavLink
            to={link.href}
            end={link.href === '/'}
            className={({ isActive }) =>
              `block cursor-pointer rounded-full px-4 py-2 text-[14.5px] font-semibold tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
