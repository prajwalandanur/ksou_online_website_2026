import { withBase } from '../basePath';

/**
 * Every procedural detail in this article comes from KSOU's own circular,
 * public/documents/announcements/abc-deb-id-creation-process.pdf — the cover
 * note plus the 28-page "Step by Step User Guide: Using Multiple Channels to
 * Create ABC ID for Students" (v1.0, 20 September 2023) bundled inside it,
 * and the UGC DEB pages it reproduces.
 *
 * That circular is a scan with no text layer, so it was read page by page
 * rather than parsed. **Do not add steps, screens, field names or timelines
 * that are not in it** — this page tells prospective students how to complete
 * a mandatory government process, and an invented step here costs somebody an
 * admission. Anything the circular does not cover (processing times, fees for
 * these IDs, what to do when Aadhaar details mismatch) is deliberately absent
 * or answered by pointing at the official portal.
 */
export const ABC_DEB_ID_GUIDE = {
  id: 'how-to-create-abc-id-and-deb-id',
  category: 'Admission Guide',
  title: 'ABC ID and DEB ID: How to Create Them for Online Degree Admission',
  excerpt:
    'Both IDs are mandatory before you can complete admission to any online or distance degree. Here is what each one is, the order to create them in, and the step-by-step process on DigiLocker and the UGC DEB portal.',
  publishedDate: 'Aug 12, 2026',
  readingTime: '6 min read',
  author: 'KSOU Online Editorial Team',
  seo: {
    title: 'How to Create ABC ID and DEB ID for Online Degree Admission',
    description:
      'Step-by-step guide to creating your ABC ID on DigiLocker and your DEB ID at deb.ugc.ac.in. Both are mandatory for KSOU Online and every UGC online or distance programme.',
  },

  body: [
    {
      type: 'paragraph',
      text: 'If you are applying for an online or distance degree in India, there are two identity numbers you need before your admission can be completed: an **ABC ID** and a **DEB ID**. Neither costs anything, both are created online, and one depends on the other — so the order matters.',
    },
    {
      type: 'paragraph',
      text: 'This is the step students most often discover late, after they have already chosen a programme and started an application. Creating both in advance keeps your admission moving.',
    },

    { type: 'heading2', id: 'what-is-abc-id', text: 'What Is an ABC ID?' },
    {
      type: 'paragraph',
      text: 'ABC stands for **Academic Bank of Credits**. An ABC ID is a permanent academic identifier that stores the credits you earn across your education, so your academic record travels with you rather than sitting with one institution.',
    },
    {
      type: 'paragraph',
      text: 'Inside DigiLocker the same thing is presented as the **APAAR (ABC) ID**. If you see either name on screen, you are in the right place.',
    },
    {
      type: 'paragraph',
      text: 'The official guide lists the reasons the ID exists:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '**A unique student ID** — a distinct, permanent identifier for each student, starting from Class I, so academic tracking stays continuous throughout their education.',
        '**Academic progress monitoring** — continuous and comprehensive monitoring of academic performance from the outset.',
        '**Identifying weaknesses** — subject-specific weak areas can be seen in the academic data linked to the ID, so support can be targeted.',
        '**Streamlined record keeping** — academic records are stored securely, reducing reliance on paper records.',
      ],
    },

    { type: 'heading2', id: 'what-is-deb-id', text: 'What Is a DEB ID?' },
    {
      type: 'paragraph',
      text: 'DEB stands for the UGC **Distance Education Bureau**. In UGC\'s own words, the DEB ID is "a unique ID that is to be mandatorily created by the learner who wishes to get admission in ODL/Online Programme."',
    },
    {
      type: 'paragraph',
      text: 'Its purpose is protective. UGC states that the DEB ID exists "to ensure that learners are taking admission in the ODL/Online programmes of the Higher Educational Institutes (HEIs) which are recognized by the Commission," and that the process "will facilitate the learner about the recognised/entitled HEIs and approved programme."',
    },
    {
      type: 'paragraph',
      text: 'In practice, that means the DEB ID is also a safeguard against enrolling somewhere that is not entitled to offer the programme you are paying for. It stays valid across your whole life cycle of learning in ODL or online mode, so you create it once, not once per programme.',
    },
    {
      type: 'callout',
      variant: 'important',
      text: 'A DEB ID cannot be created on its own. It is generated **from** your ABC ID, so the ABC ID has to exist first.',
    },

    { type: 'heading2', id: 'order-of-steps', text: 'The Order You Need to Follow' },
    {
      type: 'paragraph',
      text: 'UGC sets out the sequence for taking admission in an open, distance or online programme as four steps:',
    },
    {
      type: 'steps',
      steps: [
        { title: 'Create your ABC ID (through a DigiLocker account)' },
        { title: 'Visit the DEB website and get your DEB ID using that ABC ID' },
        { title: 'Take admission in a university for open and distance learning or online learning' },
        { title: 'Complete the admission procedure on the institution\'s portal using your DEB ID' },
      ],
    },
    {
      type: 'paragraph',
      text: 'Steps 1 and 2 are yours to complete before you apply. Steps 3 and 4 happen on the university\'s own admission portal.',
    },

    { type: 'heading2', id: 'create-abc-id', text: 'How to Create Your ABC ID on DigiLocker' },
    {
      type: 'paragraph',
      text: 'DigiLocker is the simplest of the available channels and the one KSOU\'s circular points students to. The process below follows the official step-by-step guide exactly.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Visit the DigiLocker portal** at digilocker.gov.in. Use the "Sign In" button in the top corner — if you are a new user, choose "Sign Up" instead.',
        '**Fill in the requested details** — full name, date of birth, gender, mobile number and email — and set a **six-digit security PIN** for additional security, then submit. Enter the OTP sent to your registered mobile and submit again; your account is created.',
        '**Sign in to the portal** with your registered mobile number and security PIN. An OTP verification will be prompted — enter it and submit.',
        '**On the home page, find the Academic Bank of Credits banner and click "Join Now."** The ABC (APAAR) ID creation window opens.',
        '**Enter the required details.** Your name, date of birth and gender are pre-populated from Aadhaar. You supply the **Admission Year**, the **Identity Type** — Roll Number, Registration Number, Enrolment Number or New Admission — the matching **Identity Value**, and your **Institution Name** from the dropdown.',
        '**Select your institution, tick the consent statement and click "Get Document."** A confirmation reading "Your request has been submitted" appears, and your ABC ID is generated along with a shareable PDF.',
      ],
    },
    {
      type: 'callout',
      variant: 'keyTakeaway',
      text: 'If you have not been admitted anywhere yet, **"New Admission"** is the Identity Type to choose — you do not need an existing roll or enrolment number to create an ABC ID.',
    },
    {
      type: 'link',
      href: 'https://www.digilocker.gov.in/',
      label: 'Open the DigiLocker portal',
    },

    { type: 'heading2', id: 'other-channels', text: 'Other Ways to Create an ABC ID' },
    {
      type: 'paragraph',
      text: 'DigiLocker is not the only route. The official guide documents three channels students can register through, and you only need to use one:',
    },
    {
      type: 'table',
      caption: 'Channels available for creating an ABC ID',
      headers: ['Channel', 'Notes'],
      rows: [
        ['DigiLocker portal', 'Web portal, mobile app, or QR code scanning — described in the guide as the simplest method'],
        ['UMANG portal', 'The government\'s unified services app and portal'],
        ['Academic Bank of Credits portal', 'Registration directly on the ABC portal itself'],
      ],
    },
    {
      type: 'paragraph',
      text: 'Whichever you pick, the shape of the process is the same: register under the channel, sign in, enter your institution and other details, and receive your ABC ID. Institutions also have a bulk "UIDSE+" mode, but that is used by the institution, not by you.',
    },

    { type: 'heading2', id: 'create-deb-id', text: 'How to Create Your DEB ID' },
    {
      type: 'paragraph',
      text: 'Once your ABC ID exists, the DEB ID takes far less effort. Go to the UGC DEB student portal, enter your ABC ID in the "Get Your DEB ID" field, and continue.',
    },
    {
      type: 'paragraph',
      text: 'Keep the ABC ID PDF you generated on hand — the number is what the portal asks for, and you will need the DEB ID again when you complete the admission form on the university\'s own portal.',
    },
    {
      type: 'link',
      href: 'https://deb.ugc.ac.in/StudentDEBId',
      label: 'Create your DEB ID on the UGC DEB portal',
    },

    { type: 'heading2', id: 'common-mistakes', text: 'Common Mistakes to Avoid' },
    {
      type: 'list',
      ordered: false,
      items: [
        '**Leaving it until the application is open.** Both IDs are prerequisites to completing admission, not part of it. Create them before you start.',
        '**Trying the DEB ID first.** It is generated from the ABC ID, so attempting it in the other order simply will not work.',
        '**Losing the ABC ID PDF.** The generated document holds the number you will be asked for twice more — save it somewhere you can find it.',
        '**Assuming an institution is covered.** The DEB ID process exists precisely to show you which institutions are recognised and which programmes are approved. Use it as the check it was designed to be.',
      ],
    },

    { type: 'heading2', id: 'ksou-admission', text: 'Using Your ABC ID and DEB ID for KSOU Online Admission' },
    {
      type: 'paragraph',
      text: 'Karnataka State Open University is a state government university, and its online programmes are UGC-entitled under the UGC ODL & OL Regulations, 2020 — so KSOU Online admissions follow the same DEB ID requirement as every other recognised online or distance programme in India.',
    },
    {
      type: 'paragraph',
      text: 'With both IDs ready, you can complete your KSOU Online application in one sitting: choose your programme, fill in your personal and academic details, upload your documents, supply your DEB ID and pay the admission fee.',
    },
    {
      type: 'link',
      href: withBase('/documents/announcements/abc-deb-id-creation-process.pdf'),
      label: 'Read KSOU\'s official ABC ID & DEB ID circular (PDF)',
    },
    {
      type: 'link',
      to: '/programmes/mba',
      label: 'Explore KSOU Online programmes',
    },
  ],

  keyTakeaways: [
    'An ABC ID (Academic Bank of Credits) and a DEB ID (UGC Distance Education Bureau) are both mandatory before admission to any online or distance programme can be completed.',
    'The order is fixed: create the ABC ID first, because the DEB ID is generated from it.',
    'The ABC ID is created free through DigiLocker at digilocker.gov.in — sign up, open the Academic Bank of Credits banner, enter your admission details and institution, and generate the ID.',
    'The DEB ID is created from your ABC ID at deb.ugc.ac.in/StudentDEBId, and stays valid across your whole life cycle of learning in ODL or online mode.',
    'UGC\'s stated purpose for the DEB ID is to ensure learners enrol only with institutions recognised by the Commission and in approved programmes.',
  ],

  faqs: [
    {
      id: 'is-it-mandatory',
      question: 'Is a DEB ID mandatory for online degree admission?',
      answer:
        'Yes. UGC describes the DEB ID as a unique ID that must be created by any learner who wishes to take admission in an ODL or online programme. Admission to a recognised online or distance programme is completed using it.',
    },
    {
      id: 'which-first',
      question: 'Should I create the ABC ID or the DEB ID first?',
      answer:
        'The ABC ID first. The DEB ID is generated from your ABC ID, so it cannot be created independently.',
    },
    {
      id: 'is-it-free',
      question: 'Is there a fee for creating an ABC ID or DEB ID?',
      answer:
        'Both are created through official government portals — DigiLocker for the ABC ID and the UGC DEB portal for the DEB ID. Neither portal charges students for generating the ID.',
    },
    {
      id: 'no-roll-number',
      question: 'I have not been admitted anywhere yet. Can I still create an ABC ID?',
      answer:
        'Yes. When the ABC ID form asks for an Identity Type, the available options are Roll Number, Registration Number, Enrolment Number and New Admission. Choose "New Admission" if you do not yet have any of the others.',
    },
    {
      id: 'aadhaar-needed',
      question: 'Do I need Aadhaar to create an ABC ID?',
      answer:
        'The ABC ID form in DigiLocker pre-populates your name, date of birth and gender from Aadhaar, so your DigiLocker account needs to be set up with those details before the ID can be generated.',
    },
    {
      id: 'apaar-vs-abc',
      question: 'What is the difference between an APAAR ID and an ABC ID?',
      answer:
        'They refer to the same identifier. DigiLocker labels the creation screen "APAAR (ABC) ID Card", so you may see either name during the process.',
    },
    {
      id: 'other-channels',
      question: 'Can I create an ABC ID without using DigiLocker?',
      answer:
        'Yes. The official guide documents three channels for students — the DigiLocker portal, the UMANG portal and the Academic Bank of Credits portal. You only need to use one, and the process is broadly the same on each.',
    },
    {
      id: 'reuse-deb-id',
      question: 'Do I need a new DEB ID for every programme I apply to?',
      answer:
        'No. UGC states that the DEB ID is valid for students across the life cycle of ODL and online mode learning, so it is created once rather than per programme.',
    },
    {
      id: 'ksou-requirement',
      question: 'Do I need an ABC ID and DEB ID for KSOU Online admission?',
      answer:
        'Yes. KSOU Online programmes are UGC-entitled under the UGC ODL & OL Regulations, 2020, so the same DEB ID requirement applies. Create both IDs before you begin your application so admission can be completed without a hold-up.',
    },
  ],

  conclusion: [
    { type: 'heading2', id: 'conclusion', text: 'Conclusion' },
    {
      type: 'paragraph',
      text: 'The ABC ID and DEB ID are short, free, one-time steps that sit between choosing an online programme and actually enrolling in it. Create the ABC ID on DigiLocker, generate the DEB ID from it on the UGC DEB portal, and keep both numbers saved — with that done in advance, the admission itself is straightforward.',
    },
  ],

  cta: {
    heading: 'Ready to take the next step in your education?',
    description:
      'Explore KSOU Online programmes designed to help you continue your education with flexibility.',
  },

  relatedIds: [
    'online-learning-guide-admission-to-graduation',
    'how-to-choose-right-online-degree-after-graduation',
    'online-degree-vs-traditional-degree',
  ],
};
