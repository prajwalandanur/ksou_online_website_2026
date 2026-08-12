import {
  BadgeCheck,
  BookOpen,
  CalendarClock,
  GraduationCap,
  Landmark,
  Languages,
  ScrollText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// (public/documents/ksou-online-prospectus.pdf) — do not invent fees, eligibility,
// credits, subjects, recognition, or programme features.
//
// MA is presented as ONE consolidated page (matching the homepage's single
// MA course card) covering 5 real discipline tracks — Kannada, English,
// Hindi, Sanskrit and Economics — which share identical fees but differ in
// credits, duration and eligibility per the prospectus. The Curriculum
// section below shows the full semester-wise syllabus for English as the
// representative discipline (its data is the most complete and directly
// English-language in the source document); Kannada and Hindi curricula are
// published in Kannada/Hindi script in the prospectus and are not
// transcribed here to avoid mistranslation — their structure cards note
// this rather than inventing English subject titles.

export const ma = {
  slug: 'ma',
  shortName: 'MA',
  fullName: 'Master of Arts',
  seo: {
    title: 'KSOU Online MA — Fees, Eligibility & Admission 2026',
    description:
      'KSOU Online MA in Kannada, English, Hindi, Sanskrit or Economics — UGC-entitled 2-year Master of Arts from Karnataka State Open University. ₹30,000 total fees.',
  },

  hero: {
    kicker: 'Online MA',
    titleLead: 'Online MA from',
    titleAccent: 'KSOU',
    supporting: 'Choose Your Discipline. Advance Your Academic Journey.',
    description:
      'Pursue a comprehensive online Master of Arts from Karnataka State Open University, with your choice of Kannada, English, Hindi, Sanskrit or Economics.',
    Icon: BookOpen,
    visualLabel: 'Placeholder area reserved for an MA programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '2 Years' },
    { label: 'Semesters', value: '4' },
    { label: 'Credits', value: '70–88' },
    { label: 'Mode', value: 'Online' },
    { label: 'Medium', value: 'English' },
    { label: 'Eligibility', value: "Bachelor's Degree" },
  ],

  feeDurationEligibility: [
    {
      id: 'duration',
      label: 'Course Duration',
      value: '2 Years',
      meta: '4 Semesters',
      description:
        'The MA programme runs across four semesters (2 years). Total credits range from 70 to 88 depending on the discipline chosen.',
      Icon: CalendarClock,
    },
    {
      id: 'fees',
      label: 'Course Fees',
      value: '₹30,000',
      meta: 'Total tuition / admission fee — same across all disciplines',
      description: 'Fees are payable across the two years of the programme, regardless of discipline chosen.',
      breakdown: [
        { label: 'Year 1', value: '₹15,000' },
        { label: 'Year 2', value: '₹15,000' },
      ],
      note: PROGRAMME_EXAM_FEE_NOTE,
      examFees: PROGRAMME_EXAM_FEES,
      Icon: Landmark,
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      value: "Bachelor's Degree",
      meta: 'Subject-specific criteria apply',
      description:
        "Candidates who have obtained a Bachelor's degree of three years' duration are eligible. Each discipline (Kannada, English, Hindi, Sanskrit, Economics) has its own subject-specific eligibility criteria — see Choose Your Discipline below.",
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro: 'A postgraduate arts education built around academic depth, accessibility and personal growth.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your MA through Karnataka State Open University, a state university established to expand access to higher education.',
        Icon: Landmark,
      },
      {
        number: '02',
        title: 'UGC-Entitled Online Programmes',
        description:
          "KSOU's online programmes are presented in the prospectus as UGC-entitled programmes under the UGC ODL & OL Regulations, 2020.",
        Icon: ShieldCheck,
      },
      {
        number: '03',
        title: 'Five Disciplines to Choose From',
        description: 'Specialize in Kannada, English, Hindi, Sanskrit or Economics — one shared fee structure.',
        Icon: Languages,
      },
      {
        number: '04',
        title: 'Flexible Online Learning',
        description:
          'Access your learning experience online while continuing with your professional and personal commitments.',
        Icon: CalendarClock,
      },
      {
        number: '05',
        title: 'Open Electives Across Departments',
        description:
          'Broaden your study with open elective papers offered by other KSOU departments each semester.',
        Icon: BookOpen,
      },
      {
        number: '06',
        title: 'Academic & Learner Support',
        description:
          'Access academic support and digital learning resources as part of the KSOU learning ecosystem.',
        Icon: BadgeCheck,
      },
    ],
  },

  structure: {
    heading: 'Choose Your Discipline',
    subheading: 'Five MA disciplines, one shared fee structure — each with its own credits, eligibility and syllabus.',
    groups: [
      {
        id: 'kannada',
        title: 'Kannada',
        description: 'Modern and classical Kannada literature, poetry, prose and criticism.',
        meta: '4 Semesters · 82 Credits',
        Icon: Languages,
        subjects: [
          'Semester-wise syllabus is published in Kannada in the official prospectus — contact admissions for the full subject list.',
        ],
        note: 'Eligibility: a three-year degree with Kannada as a major/optional subject, or an equivalent qualification recognized by KSOU (e.g. Kannada Pandit, Kannada Ratna).',
      },
      {
        id: 'english',
        title: 'English',
        description: 'English literature from Chaucer to the 20th century, criticism and Indian writing in English.',
        meta: '4 Semesters · 80 Credits',
        Icon: BookOpen,
        subjects: [
          'English Literature from Chaucer to Milton',
          'Shakespeare',
          '19th & 20th Century English Poetry',
          'Indian Writing in English',
          'American Literature',
          'Literary Criticism',
        ],
        note: 'Full semester-wise curriculum shown below.',
      },
      {
        id: 'hindi',
        title: 'Hindi',
        description: 'Advanced study of Hindi language and literature.',
        meta: '4 Semesters · 88 Credits',
        Icon: ScrollText,
        subjects: [
          'Detailed semester-wise syllabus is published in Hindi in the official prospectus — contact admissions for the full subject list.',
        ],
        note: 'Eligibility: a three-year degree with Hindi as a language/optional subject, or a recognized equivalent Hindi examination (e.g. Rashtrabhasha Praveen, Hindi Ratna).',
      },
      {
        id: 'sanskrit',
        title: 'Sanskrit',
        description: 'Classical Sanskrit literature, grammar, poetics and Vedic studies.',
        meta: '2 Years · 70 Credits',
        Icon: ScrollText,
        subjects: [
          'Classical Sanskrit Literature — Poetry, Prose and Translations',
          'Classical Sanskrit Literature — Drama and History',
          'Tarka and Vyakarana',
          'Bharatiya Tattvasastra',
          'Alankara (Poetics) — I, II & III',
          'Vedic Hymns, Upanishad and Bhagavad Gita',
        ],
      },
      {
        id: 'economics',
        title: 'Economics',
        description: 'Micro and macro economic theory, public economics, development and Indian economy.',
        meta: '4 Semesters · 80 Credits',
        Icon: TrendingUp,
        subjects: [
          'Micro & Macro Economic Analysis',
          'International Trade Finance',
          'Indian Economy',
          'Research Methodology',
          'Money and Banking',
          'Economics of Development',
        ],
      },
    ],
  },

  curriculum: {
    subtitle: 'A structured four-semester curriculum, shown here for the M.A. English discipline.',
    note: 'Curriculum shown for M.A. English — Kannada, Hindi, Sanskrit and Economics each follow their own semester-wise syllabus. See Choose Your Discipline above for an overview of each.',
    terms: [
      {
        id: 'sem1',
        label: 'Semester 01',
        credits: 20,
        subjects: [
          { title: 'English Literature from Chaucer to Milton', type: 'Core', credits: 4 },
          { title: 'Shakespeare', type: 'Core', credits: 4 },
          { title: 'Restoration and 18th Century English Literature', type: 'Core', credits: 4 },
          { title: 'Shakespearean Sonnets and Criticism', type: 'Core', credits: 3 },
          { title: 'Comparative Drama - I', type: 'Core', credits: 3 },
          { title: 'Open Elective', type: 'Elective', credits: 2 },
        ],
      },
      {
        id: 'sem2',
        label: 'Semester 02',
        credits: 20,
        subjects: [
          { title: '19th Century English Poetry', type: 'Core', credits: 4 },
          { title: '19th Century Prose & Fiction', type: 'Core', credits: 4 },
          { title: '20th Century English Poetry', type: 'Core', credits: 4 },
          { title: 'Modern Indian Poetry in English', type: 'Core', credits: 3 },
          { title: 'Comparative Drama - II', type: 'Core', credits: 3 },
          { title: 'Open Elective', type: 'Elective', credits: 2 },
        ],
      },
      {
        id: 'sem3',
        label: 'Semester 03',
        credits: 20,
        subjects: [
          { title: 'Indian Writing in English', type: 'Core', credits: 4 },
          { title: 'American Literature', type: 'Core', credits: 4 },
          { title: 'Literary Criticism - I', type: 'Core', credits: 4 },
          { title: 'Skill Enhancement Course - I', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 of 3 Soft Core papers (6 credits): Indian Women Novelists, European Classic in Translation-I, or Essays.',
      },
      {
        id: 'sem4',
        label: 'Semester 04',
        credits: 20,
        subjects: [
          { title: 'Literary Criticism - II', type: 'Core', credits: 4 },
          { title: '20th Century English Fiction and Drama', type: 'Core', credits: 4 },
          { title: 'New Literatures in English', type: 'Core', credits: 4 },
          { title: 'Skill Enhancement Course - II', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 of 3 Soft Core papers (6 credits): Kannada Fiction in Translation, European Classics in Translation-II, or Selections from Prose.',
      },
    ],
  },

  careerContext:
    'Build your profile, prepare with confidence and discover career opportunities across education, research, language, media and public service.',

  degree: {
    titleAccent: 'MA Degree from KSOU',
    description: 'Complete your MA journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Lakshmi V.',
      programme: 'MA English Student',
      quote:
        'Being able to choose my discipline and study at my own pace made postgraduate study genuinely accessible.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Ramesh G.',
      programme: 'MA Economics Student',
      quote: 'The online format let me pursue my MA in Economics while continuing to work full-time.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online MA?',
        answer:
          'The KSOU Online MA runs across 4 semesters (2 years) for every discipline. Total credits range from 70 to 88 depending on the discipline chosen.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online MA?',
        answer:
          "Candidates who have obtained a Bachelor's degree of three years' duration are eligible. Each discipline (Kannada, English, Hindi, Sanskrit, Economics) also has its own subject-specific eligibility criteria.",
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online MA?',
        answer:
          'The total programme fee is ₹30,000, payable as ₹15,000 in each of the two years — the same across all five disciplines. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online MA UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'disciplines',
        question: 'Which MA disciplines are offered?',
        answer: 'KSOU Online offers MA in Kannada, English, Hindi, Sanskrit and Economics.',
      },
      {
        id: 'credits-vary',
        question: 'Why do credits vary between MA disciplines?',
        answer:
          'Each discipline has its own approved curriculum. Credits range from 70 (Sanskrit) to 88 (Hindi), while Kannada, English and Economics each carry 80–82 credits.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online MA programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online MA is English.',
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online MA?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online MA?',
        answer:
          'You can apply by selecting "Apply Now" on this page, completing the application form and submitting the required documents along with the applicable fee. You will choose your discipline as part of the application.',
      },
      {
        id: 'documents',
        question: 'What documents are required for admission?',
        answer:
          'Candidates are required to submit their academic and identity documents for verification as part of the online application process.',
      },
      {
        id: 'exam-fee-included',
        question: 'Are examination fees included in the programme fee?',
        answer: 'No. Examination fees are charged separately, in addition to the ₹30,000 programme fee.',
      },
      {
        id: 'degree-validity',
        question: 'Is the KSOU Online MA valid for government jobs?',
        answer:
          'Yes. As a UGC-entitled degree from a state government university, the KSOU Online MA is accepted for government job applications, public-sector recruitment, private-sector employment and further higher education, on par with a degree earned on campus.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the MA from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online MA can be pursued from anywhere, without needing to relocate to Karnataka.',
      },
      {
        id: 'abc-deb-id',
        question: 'Do I need an ABC ID and DEB ID for KSOU Online MA admission?',
        answer:
          'Yes — both are mandatory for admission to any online or distance programme. Create your ABC ID (Academic Bank of Credits) free of cost through DigiLocker at digilocker.gov.in, then use that ABC ID to generate your DEB ID (Distance Education Bureau ID) at deb.ugc.ac.in/StudentDEBId. The DEB ID confirms you are enrolling with a UGC-recognised institution, and your KSOU Online MA admission is completed using it.',
      },
      {
        id: 'two-degrees',
        question: 'Can I pursue the KSOU Online MA alongside another degree?',
        answer:
          'Yes. UGC permits a student to pursue two academic programmes at the same time, and KSOU allows this. You need to meet the eligibility criteria for each programme and complete the admission requirements, including fee payment, separately for both.',
      },
      {
        id: 'contact-counsellor',
        question: 'How can I contact a KSOU Online counsellor?',
        answer:
          'You can connect with a KSOU Online counsellor by filling in your details through the enquiry section on this page.',
      },
    ],
  },
};
