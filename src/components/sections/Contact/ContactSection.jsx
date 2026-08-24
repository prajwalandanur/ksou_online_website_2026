import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { CONTACT_ADDRESS, CONTACT_COPY, CONTACT_EMAIL } from '@/constants/contact';
import { ContactEnquiryCard } from './ContactEnquiryCard';

/**
 * One informational row: a tinted icon chip, a small label, and the value.
 *
 * `href` is optional — the address is not actionable, the phone numbers and
 * the email are. When it is present the whole row is the link (rather than
 * just the value text) so the touch target is the full width of the row,
 * which is what makes three stacked phone numbers comfortable on a phone.
 */
function ContactRow({ icon: Icon, label, href, children }) {
  const body = (
    <>
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/60 text-primary transition-colors duration-200 ease-out group-hover:border-primary/40 group-hover:bg-primary/10">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {children}
      </span>
    </>
  );

  const layout = 'group flex items-start gap-4';

  if (!href) {
    return <li className={layout}>{body}</li>;
  }

  return (
    <li>
      <a
        href={href}
        className={`${layout} cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}
      >
        {body}
      </a>
    </li>
  );
}

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      // Top padding is the homepage rhythm; the bottom is not, deliberately.
      // "Select Programme" is the last field in the card and its listbox
      // (`max-h-56`, opening downward) hangs ~120px past the bottom of the
      // card — measured overhanging the footer by 20px at 1440 and 80px at
      // 390 on the old `py-10 sm:py-14 lg:py-20`. Raising the list's z-index
      // stops the footer painting over it, but a dropdown that merely floats
      // *on top of* the footer still reads as broken, so the section reserves
      // real room underneath instead. Keep any future field below the
      // programme select in mind here: this number is the card's tail plus
      // the tallest dropdown, not an arbitrary gap.
      className="px-6 pb-40 pt-10 sm:pt-14 lg:px-8 lg:pb-44 lg:pt-20"
    >
      {/* The right column used to be a compact support card and took the
          smaller share (0.95fr). It now holds the six-field enquiry form, so
          the weighting is reversed — a little wider than the contact details,
          without going all the way to the 45/55 that would leave inputs
          uncomfortably long on a 1440 screen. */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1
              id="contact-heading"
              className="font-brand text-4xl leading-[1.1] text-navy sm:text-5xl lg:text-[3.25rem]"
            >
              {CONTACT_COPY.headingLead}{' '}
              <span className="text-primary">{CONTACT_COPY.headingAccent}</span>
            </h1>

            <span aria-hidden="true" className="block h-[2px] w-10 rounded-full bg-gold" />

            <p className="max-w-lg text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
              {CONTACT_COPY.description}
            </p>
          </div>

          {/* Order is Address -> Phones -> Email, which is the stacking order
              the brief specifies for mobile. One DOM order serves both
              breakpoints, so the mobile sequence is the one that governs. */}
          <ul className="flex flex-col gap-5">
            <ContactRow icon={MapPin} label={CONTACT_COPY.addressLabel}>
              <span className="text-[15px] font-semibold tracking-tight text-navy">
                {CONTACT_ADDRESS.institution}
              </span>
              <span className="text-sm text-muted-foreground">
                {CONTACT_ADDRESS.lines.join(', ')}
              </span>
            </ContactRow>

            {CONTACT_NUMBERS.map((number) => (
              <ContactRow
                key={number.href}
                icon={Phone}
                label={CONTACT_COPY.phoneLabel}
                href={number.href}
              >
                <span className="text-[15px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out group-hover:text-primary">
                  {number.label}
                </span>
              </ContactRow>
            ))}

            <ContactRow
              icon={Mail}
              label={CONTACT_COPY.emailLabel}
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {/* break-all so the address wraps inside the column instead of
                  forcing the page wider at 320-360px, where it is the single
                  longest unbroken string on the page. */}
              <span className="break-all text-[15px] font-semibold tracking-tight text-navy transition-colors duration-200 ease-out group-hover:text-primary">
                {CONTACT_EMAIL}
              </span>
            </ContactRow>
          </ul>
        </div>

        {/* The enquiry form, in the slot the "Talk to a Counsellor" card used
            to occupy. `lg:sticky` is deliberately absent — the page is one
            short section, so there is nothing to scroll past. */}
        <ContactEnquiryCard />
      </div>
    </section>
  );
}
