/**
 * Contact page content.
 *
 * The three helpline numbers are deliberately **not** re-declared here —
 * `CONTACT_NUMBERS` in `navigation.js` already carries them, and it pairs
 * each displayed label with the digits actually dialled. A second copy is
 * exactly how a page ends up showing a number nobody answers, so the contact
 * page imports that constant and renders it in its existing order.
 */

export const CONTACT_EMAIL = 'onlineprogramme@ksoumysuru.ac.in';

export const CONTACT_ADDRESS = {
  institution: 'Karnataka State Open University',
  lines: ['Muktha Gangothri Campus', 'Mysuru, Karnataka 570006'],
};

/**
 * WhatsApp destination — the university's WhatsApp line, supplied directly
 * rather than inferred from the helpline list.
 *
 * wa.me wants the number in international format with no `+`, spaces or
 * punctuation, so it is stored separately from the display label rather than
 * derived by stripping characters at render time. Keep the two in step: the
 * label is what the button's aria-label reads out, the digits are what
 * actually opens.
 */
export const WHATSAPP = {
  number: '919740740340',
  displayNumber: '+91 97407 40340',
  get href() {
    return `https://wa.me/${this.number}`;
  },
};

export const CONTACT_COPY = {
  headingLead: 'Get in',
  headingAccent: 'Touch',
  description:
    'Have questions about our online programmes, admissions or applications? Reach out to the KSOU Online team.',

  addressLabel: 'Campus Address',
  phoneLabel: 'General Helpline',
  emailLabel: 'Email',

  support: {
    title: 'Talk to a Counsellor',
    description:
      'Connect with our team for assistance with admissions and online programmes.',
    whatsapp: 'WhatsApp Us',
    call: 'Call Us',
  },

  seo: {
    title: 'Contact KSOU Online — Helpline, Email & Campus Address',
    description:
      'Contact the KSOU Online team for help with admissions, applications and online programmes. Call the general helpline, message us on WhatsApp or email onlineprogramme@ksoumysuru.ac.in.',
  },
};
