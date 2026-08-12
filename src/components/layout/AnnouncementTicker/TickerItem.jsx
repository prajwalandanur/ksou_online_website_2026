import { Link } from 'react-router-dom';
import { announcementTarget } from '@/constants/announcements';

/**
 * One announcement inside the moving strip, plus the hairline separator that
 * follows it. Everything is `whitespace-nowrap` and `shrink-0` — the brief
 * forbids the ticker ever wrapping onto a second line.
 *
 * The action text uses --color-primary-hover rather than --color-primary:
 * the KSOU blue clears 4.5:1 on pure white with almost nothing to spare
 * (~4.85:1), and the ticker's pale-blue bed drops it to ~4.2:1. The darker
 * shade of the same blue lands at ~5.5:1 and keeps small text AA-compliant.
 */
export function TickerItem({ announcement, isDuplicate = false }) {
  const target = announcementTarget(announcement);
  const isExternalDocument = target.isDocument;
  // The duplicated half is aria-hidden, and a focusable node inside an
  // aria-hidden subtree is an outright a11y violation — tabbing would land
  // on a link screen readers have been told doesn't exist.
  const focusProps = isDuplicate ? { tabIndex: -1 } : {};

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          announcement.isImportant ? 'bg-gold' : 'bg-primary/45'
        }`}
      />
      <span className="text-navy transition-colors duration-200 ease-out group-hover:text-primary-hover">
        {announcement.title}
      </span>
      <span className="text-primary-hover">{target.label} &rarr;</span>
    </>
  );

  const linkClasses =
    'group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full text-[13px] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[13.5px]';

  return (
    <li className="flex shrink-0 items-center">
      {isExternalDocument ? (
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${announcement.title} — ${target.label} (PDF, opens in a new tab)`}
          className={linkClasses}
          {...focusProps}
        >
          {content}
        </a>
      ) : (
        <Link to={target.href} className={linkClasses} {...focusProps}>
          {content}
        </Link>
      )}

      <span aria-hidden="true" className="mx-4 h-3 w-px shrink-0 bg-navy/15 sm:mx-6" />
    </li>
  );
}
