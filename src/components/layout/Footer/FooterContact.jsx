import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { CONTACT_ADDRESS, CONTACT_EMAIL } from '@/constants/contact';
import { FOOTER_CONTACT_TITLE, FOOTER_CONTACT_LABELS } from '@/constants/footer';

const LINK_CLASSES =
  'inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/**
 * The footer's fifth column.
 *
 * Reads the same `CONTACT_NUMBERS` / `CONTACT_ADDRESS` / `CONTACT_EMAIL` the
 * /contact page does, so the footer and that page cannot disagree about how
 * to reach the university — which is the entire reason those constants exist
 * rather than living in the page that first needed them.
 *
 * Deliberately flatter than the contact page's version: no icon chips, no
 * per-row labels, 13-14px type. This sits in a four-column row at xl and has
 * to read as a footer column, not as a second contact section.
 */
export function FooterContact() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-wide text-navy">{FOOTER_CONTACT_TITLE}</h3>
        <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-gold" />
      </div>

      <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-2">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="flex flex-col text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-navy">{CONTACT_ADDRESS.institution}</span>
            {/* Each line its own node so the address breaks where it is
                written rather than wherever the column happens to run out —
                "Muktha Gangothri Campus, Mysuru," splitting mid-phrase was
                the alternative. */}
            {CONTACT_ADDRESS.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </li>

        <li className="flex items-start gap-2">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="flex flex-col gap-1">
            <span className="sr-only">{FOOTER_CONTACT_LABELS.helpline}</span>
            {CONTACT_NUMBERS.map((number) => (
              <a key={number.href} href={number.href} className={LINK_CLASSES}>
                {number.label}
              </a>
            ))}
          </span>
        </li>

        <li className="flex items-start gap-2">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {/* `break-words`, not `break-all`: the column is sized to fit this
              address on one line at xl, so an eager break was splitting it
              mid-domain ("ksoumysur / u.ac.in") for no reason. This only
              breaks when the column genuinely cannot hold it — which still
              stops it setting a minimum width and widening the grid at
              320-360px. */}
          <a href={`mailto:${CONTACT_EMAIL}`} className={`${LINK_CLASSES} break-words`}>
            {CONTACT_EMAIL}
          </a>
        </li>
      </ul>
    </div>
  );
}
