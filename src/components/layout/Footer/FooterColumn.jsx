import { Link } from 'react-router-dom';

const LINK_CLASSES =
  'text-sm text-muted-foreground transition-colors duration-200 hover:text-primary';

export function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-wide text-foreground">{title}</h3>
        <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-gold" />
      </div>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={LINK_CLASSES}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={LINK_CLASSES}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
