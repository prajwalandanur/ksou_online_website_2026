import { NavLink } from 'react-router-dom';
import { useContent } from '@/i18n/content';
import { useLocalizedPath } from '@/i18n/useLanguage';
import { fill } from '@/i18n/format';

// `whitespace-nowrap` is what keeps "About Us", "Contact Us" and "Academic
// Planner" on one line each — without it they split at the space as soon as
// the row tightens. Type size stays at the original 14.5px; the extra room
// for a seventh link comes from the wider navbar card (max-w-[84rem]) and
// slightly tighter pill padding, restored to the original px-4 at 2xl where
// the row has space to spare.
// Type size stays at 14.5px — the room for a *second* CTA came from padding,
// not from shrinking the text. Measured at 1280 (the tightest band): px-3.5
// left the row 73px over the viewport; px-2 gives back 84px across seven
// links and lands it 56px under. 2xl has space to spare, so the original
// padding returns there.
const BASE =
  'block cursor-pointer whitespace-nowrap rounded-full px-2 py-2 text-[14.5px] font-semibold tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary 2xl:px-3.5';
const ACTIVE = 'bg-primary/10 text-primary';
const INACTIVE = 'text-foreground/70 hover:bg-muted hover:text-foreground';

export function DesktopNavLinks() {
  const { ui, navLinks } = useContent();
  // Routes keep the visitor in their current language; `newTab` entries are
  // PDFs and stay exactly as authored.
  const to = useLocalizedPath();

  return (
    <ul className="hidden items-center gap-0.5 xl:flex">
      {navLinks.map((link) => (
        <li key={link.href}>
          {link.newTab ? (
            // A PDF, not a route — a router NavLink would try to navigate
            // the SPA to it. Never gets an active state, since the user
            // never "is on" this page.
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fill(ui.common.pdfNewTab, { label: link.label })}
              className={`${BASE} ${INACTIVE}`}
            >
              {link.label}
            </a>
          ) : (
            <NavLink
              to={to(link.href)}
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
