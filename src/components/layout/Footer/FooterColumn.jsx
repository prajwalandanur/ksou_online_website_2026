import { Link } from 'react-router-dom';
import { useContent } from '@/i18n/content';
import { useLocalizedPath } from '@/i18n/useLanguage';
import { fill } from '@/i18n/format';

const LINK_CLASSES =
  'text-sm text-muted-foreground transition-colors duration-200 hover:text-primary';

export function FooterColumn({ title, links }) {
  const { ui } = useContent();
  // The "Online Degrees" column deep-links to all six programme pages, which
  // do have Kannada versions — without this the footer walks the visitor out
  // of Kannada from any page on the site.
  const to = useLocalizedPath();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-wide text-navy">{title}</h3>
        <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-gold" />
      </div>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={to(link.to)} className={LINK_CLASSES}>
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className={LINK_CLASSES}
                {...(link.newTab
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': fill(ui.common.pdfNewTab, { label: link.label }),
                    }
                  : {})}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
