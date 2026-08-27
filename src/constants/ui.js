/**
 * UI chrome strings that used to sit inline in components — section
 * headings, button labels, meta-row labels, aria-labels.
 *
 * They were pulled out for the Kannada build: `src/locales/kn/ui.js` mirrors
 * this shape exactly, and `src/i18n/content.js` merges the two. English stays
 * the source of truth, so this is the file to edit when copy changes.
 *
 * **Split headings** are stored as `lead` / `accent` / `trail` rather than as
 * one string, because the design renders the accent segment in primary blue
 * inside a `<span>`. Three parts rather than two is what makes the pattern
 * survive translation: Kannada puts the accented noun first and the verb
 * phrase after it, which a lead+accent pair alone cannot express. Any part
 * may be an empty string.
 */
export const UI_TEXT = {
  common: {
    applyNow: 'Apply Now',
    learnMore: 'Learn More',
    readMore: 'Read More',
    comingSoon: 'Coming Soon',
    pageNotFound: 'Page not found',
    /**
     * Suffix appended to any link that opens a PDF in a new tab. One key
     * rather than the sentence being re-spelled at each call site, because
     * every one of them was drifting out of sync in English already.
     */
    pdfNewTab: '{label} (PDF, opens in a new tab)',
  },

  nav: {
    lmsLogin: 'LMS Login',
    /**
     * The LMS lives on the parent university's own domain, so the button
     * leaves the site — the label alone doesn't say that, and the same
     * "opens in a new tab" promise the PDF links make is what stops it
     * being a surprise.
     */
    lmsLoginAria: 'LMS Login (opens in a new tab)',
    applyNowLogin: 'Apply Now / Login',
    /**
     * Phone-width form of the above. Below 640px the row has to hold the
     * crest, both CTAs and the hamburger inside 320px; the full 17-character
     * label alone measured 154px there. Rendered as two spans rather than a
     * conditional string so there is no layout shift at the breakpoint.
     */
    applyNowLoginShort: 'Apply Now',
    selectLanguage: 'Select language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    siteNavigation: 'Site navigation',
    logo: 'KSOU Online — go to homepage',
  },

  /** The two fixed controls rendered on every route by `FloatingActions`. */
  floating: {
    whatsapp: 'Chat with KSOU Online on WhatsApp (opens in a new tab)',
    /** Visible label inside the pill; the aria-label above says the rest. */
    chat: 'Chat',
    backToTop: 'Back to top of page',
  },

  ticker: {
    label: 'Latest Updates',
    labelShort: 'Updates',
    viewAll: 'View all',
    /** Landmark name for the strip itself, not the visible label above. */
    regionLabel: 'Latest updates',
    /** `{title}` is the notice, `{action}` its call-to-action ("Read", …). */
    itemPdf: '{title} — {action} (PDF, opens in a new tab)',
  },

  hero: {
    headingLead: 'UGC Approved',
    headingAccent: 'KSOU Online Programmes',
    headingTrail: '',
    subtitle:
      'Karnataka State Open University · NAAC A+ Government University · Online degrees from ₹10,000/year.',
    description:
      'Explore UGC-entitled online undergraduate and postgraduate programmes from Karnataka State Open University (KSOU), Mysuru — a government university offering an accessible alternative to conventional distance education in Karnataka, built for students and working professionals. Admissions for the 2026 cycle are open.',
    admissionsPill: 'Admissions Open • July 2026 Cycle',
    /**
     * Deliberately *not* a restatement of the pill above it — the two lines
     * previously both said "admissions are open for the July 2026 cycle",
     * which spent a prime hero slot saying one thing twice.
     *
     * The ABC ID / DEB ID step is the useful thing to say next to an open
     * admissions badge: it is mandatory before enrolment and is the step
     * applicants most often reach admission without having done. Both claims
     * here ("free", "mandatory") come from KSOU's own circular, via
     * `constants/blogs/how-to-create-abc-id-and-deb-id.js` — do not soften
     * or embellish them without checking that source.
     */
    admissionsNote: 'Create your ABC ID and DEB ID before applying — both are free and mandatory.',
    rankingBadge: 'NIRF 2025 · #2 Open University',
  },

  /**
   * `{name}` is the course's full name, `{discipline}` an MA discipline
   * (Kannada, English …) — both filled by `src/i18n/format.js`.
   */
  courses: {
    ugHeading: 'Online Undergraduate Programmes',
    pgHeading: 'Online Postgraduate Programmes',
    duration: 'Duration',
    courseFee: 'Course Fee',
    perYear: '/ Year',
    brochure: 'Brochure',
    previousQps: 'Previous QPs',
    imageAlt: '{name} students',
    prevProgramme: 'Previous programme',
    nextProgramme: 'Next programme',
    brochureAria:
      'View the KSOU Online prospectus, which covers {name} (PDF, opens in a new tab)',
    previousQpsAria: 'View previous question papers for {name} (PDF, opens in a new tab)',
    previousQpsPendingAria: 'View previous question papers for {name} — coming soon',
    previousQpsDisciplineAria:
      'View {name} {discipline} previous question papers (PDF, opens in a new tab)',
    learnMorePendingAria: 'Learn more about {name} — coming soon',
  },

  whyChoose: {
    headingLead: 'Why Choose',
    headingAccent: 'KSOU Online?',
    headingTrail: '',
    subtitle: 'A flexible, recognized degree designed around your ambitions.',
  },

  howItWorks: {
    heading: 'How Online Learning Works',
    subtitle:
      'Everything you need to learn, complete your programme, and earn your degree — online.',
    summary: 'One platform. One journey. Your degree.',
    breadcrumb: ['Admissions', 'Learning', 'Examinations', 'Degree'],
  },

  blog: {
    headingLead: 'Insights for Your',
    headingAccent: 'Next Step',
    headingTrail: '',
    subtitle:
      'Guides, insights, and practical information to help you make better decisions about your education.',
    viewAll: 'View All',
  },

  faq: {
    heading: 'Frequently Asked Questions',
    showMore: 'Show More',
    showLess: 'Show Less',
  },

  /**
   * Programme detail pages. `{name}` is filled with the programme's short
   * name (MBA, BA, B.Com …) by `src/i18n/format.js` — see the note there for
   * why the token sits inside the sentence rather than being concatenated in
   * the component.
   *
   * Degree abbreviations stay in Latin script in both languages, so `{name}`
   * needs no translated counterpart.
   */
  programme: {
    fee: {
      heading: 'Online {name} Course Fees, Duration & Eligibility',
      subheading:
        'Everything you need to know before beginning your {name} journey with KSOU Online.',
    },

    whyChoose: {
      headingLead: 'Why Choose',
      headingAccent: 'KSOU Online {name}?',
      headingTrail: '',
    },

    structure: {
      showDetails: 'Explore details →',
      hideDetails: 'Hide details',
    },

    recognition: {
      heading: 'Recognition & Academic Credentials',
      subheading:
        'Academic credibility backed by institutional recognition and quality standards.',
    },

    curriculum: {
      heading: 'Online {name} Curriculum',
      credits: '{count} Credits',
      creditsShort: 'Cr',
      /**
       * Closed vocabulary of paper classifications used across every
       * programme's syllabus tables, translated by lookup rather than by
       * repeating a value on all ~100 subject entries in the Kannada files.
       * Keyed by the English string; an unrecognised value renders unchanged,
       * so adding a paper type to a prospectus file cannot break the page.
       */
      subjectTypes: {
        Core: 'Core',
        'Hard Core': 'Hard Core',
        'Soft Core': 'Soft Core',
        Elective: 'Elective',
        'Open Elective': 'Open Elective',
        'Discipline Elective': 'Discipline Elective',
        'Skill Enhancement': 'Skill Enhancement',
        'Group I': 'Group I',
        'Group II': 'Group II',
        'Group III': 'Group III',
      },
    },

    career: {
      heading: 'Career & Placement Assistance',
      kicker: 'Career Support',
      subheading: 'Build your profile. Prepare for opportunities.',
      profileTitle: 'Your Career Profile',
      profileNote: 'A single profile connecting your preparation and opportunities.',
    },

    degree: {
      headingLead: 'Earn Your',
      headingTrail: '',
      certificateLabel: 'Placeholder area reserved for the KSOU {name} degree certificate',
      certificatePending: 'Degree certificate to be added',
      /**
       * The one sample certificate supplied is a Master of Commerce, and it
       * is shown on all six programme pages by explicit instruction. The alt
       * text therefore says so rather than claiming to be the {name} degree
       * — a sighted visitor can read "MASTER OF COMMERCE" on the artwork and
       * the watermark, so a screen-reader user must get the same caveat.
       */
      certificateAlt:
        'Sample KSOU degree certificate — a Master of Commerce example, watermarked "for reference only" and shown for illustration',
    },

    whyKsou: {
      kicker: 'Institutional Legacy',
      headingLead: 'A Legacy of Accessible',
      headingAccent: 'Higher Education',
      headingTrail: '',
    },

    testimonials: {
      heading: 'Real Stories. Real Impact.',
      subheading: 'Discover how learners are building their academic journey with KSOU Online.',
      placeholderBadge: 'Placeholder',
    },

    faq: {
      subheading: 'Answers to common questions about the KSOU Online {name} programme.',
    },

    cta: {
      heading: 'Ready to Begin Your {name} Journey?',
      description: 'Take the next step with KSOU Online.',
    },

    actions: {
      viewProspectus: 'View Prospectus',
      /**
       * One key, not two. There used to be a second
       * `viewProgrammeProspectusAria` purely because both buttons read
       * "coming soon"; now that both open the same real document, two
       * wordings for one destination would only drift.
       */
      viewProspectusAria: 'View the KSOU Online prospectus (PDF, opens in a new tab)',
    },
  },

  /**
   * The automatic enquiry popup. Copy lives here rather than in the component
   * for the usual reason — it is the site's only lead-capture surface, and
   * admissions will want to reword it without a developer.
   *
   * Validation messages are UI strings too. They are phrased as instructions
   * ("Enter a valid…") rather than accusations ("Invalid…"), and they name
   * what a correct value looks like, because this form is the last step
   * before a counsellor call and a dead end here costs a real applicant.
   */
  enquiry: {
    title: 'Speak With a KSOU Counsellor',
    description:
      'Share your details and our admissions team will help you with programmes, eligibility and the admission process.',
    close: 'Close enquiry form',
    /** Explains the asterisks, which are decorative to a screen reader. */
    requiredNote: 'Fields marked * are required.',

    fields: {
      nameLabel: 'Student Name',
      namePlaceholder: 'Enter your name',
      mobileLabel: 'Mobile Number',
      mobilePlaceholder: 'Enter mobile number',
      emailLabel: 'E-mail ID',
      emailPlaceholder: 'Enter email address',
      cityLabel: 'City',
      cityPlaceholder: 'Enter city / place',
      countryLabel: 'Country',
      countryPlaceholder: 'Search country...',
      programmeLabel: 'Select Programme',
      programmePlaceholder: 'Search or select programme...',
    },

    noResults: 'No matches found',
    submit: 'Submit',
    submitting: 'Submitting...',

    errors: {
      nameRequired: 'Please enter the student name.',
      nameInvalid: 'Please enter the full name as it should appear on records.',
      mobileRequired: 'Please enter a mobile number.',
      /**
       * Two messages, because the form accepts applicants from 261 regions.
       * Telling a student in Dubai that their number must be 10 digits
       * starting 6-9 would be wrong, so the Indian rule is only quoted when
       * India is the selected country.
       */
      mobileInvalidIndia: 'Enter a valid 10-digit Indian mobile number, starting 6, 7, 8 or 9.',
      mobileInvalid: 'Enter a valid mobile number, including the country code.',
      emailRequired: 'Please enter an e-mail address.',
      emailInvalid: 'Enter a valid e-mail address, for example name@example.com.',
      cityRequired: 'Please enter your city or place.',
      countryRequired: 'Please select a country.',
      programmeRequired: 'Please select the programme you are interested in.',
      submitFailed:
        'Something went wrong while sending your enquiry. Please try again, or call our admissions helpline.',
    },

    success: {
      title: 'Thank You!',
      /*
       * The 24-hour response time is a commitment supplied by KSOU, not an
       * estimate written here. If admissions cannot hold to it, change this
       * line rather than leaving a promise the team has to break — it is the
       * last thing a student reads before waiting.
       */
      description: 'Our team will contact you within 24 hours.',
      close: 'Close',
      /**
       * Only the contact page uses this. The popup's confirmation closes
       * itself, but the form on `/contact` stays on screen, and a visitor
       * asking about a second programme would otherwise have to reload the
       * page to get an empty form back.
       */
      again: 'Send another enquiry',
    },
  },
};
