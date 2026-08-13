import { Headphones, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACT_NUMBERS } from '@/constants/navigation';
import { CONTACT_ADDRESS, CONTACT_COPY, CONTACT_EMAIL, WHATSAPP } from '@/constants/contact';
import { WhatsappIcon } from './WhatsappIcon';

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
      className="px-6 py-10 sm:py-14 lg:px-8 lg:py-20"
    >
      {/* 1.05/0.95 rather than a straight half: the left column carries five
          stacked rows and the card is deliberately compact, so an even split
          left the card looking stretched at 1440. */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
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

        {/* Support card. `lg:sticky` is deliberately absent — the page is one
            short section, so there is nothing to scroll past. */}
        <div className="relative rounded-[28px] border border-border/80 bg-white p-8 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_56px_-28px_rgba(17,17,17,0.22)] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-[28px] bg-gradient-to-b from-ice to-transparent"
          />

          <div className="relative flex flex-col items-start gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
              <Headphones className="h-7 w-7" aria-hidden="true" />
            </span>

            <div className="flex flex-col gap-3">
              <h2 className="font-brand text-2xl text-navy sm:text-[1.75rem]">
                {CONTACT_COPY.support.title}
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                {CONTACT_COPY.support.description}
              </p>
            </div>

            <div className="mt-1 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                as="a"
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                withArrow
                aria-label={`${CONTACT_COPY.support.whatsapp} on ${WHATSAPP.displayNumber} (opens WhatsApp in a new tab)`}
                className="justify-center py-3 sm:flex-1"
              >
                <WhatsappIcon className="h-[18px] w-[18px] shrink-0" />
                {CONTACT_COPY.support.whatsapp}
              </Button>

              <Button
                as="a"
                href={CONTACT_NUMBERS[0].href}
                variant="secondary"
                aria-label={`${CONTACT_COPY.support.call} on ${CONTACT_NUMBERS[0].label}`}
                className="justify-center py-3 sm:flex-1"
              >
                <Phone className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                {CONTACT_COPY.support.call}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
