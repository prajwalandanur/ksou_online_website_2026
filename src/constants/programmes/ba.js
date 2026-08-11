import {
  BadgeCheck,
  BookOpen,
  CalendarClock,
  GraduationCap,
  Landmark,
  Languages,
  Scale,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// (public/documents/ksou-online-prospectus.pdf) — do not invent fees, eligibility,
// credits, subjects, recognition, or programme features.

export const ba = {
  slug: 'ba',
  shortName: 'BA',
  fullName: 'Bachelor of Arts',
  seo: {
    title: 'KSOU Online BA — UGC Entitled Online Bachelor of Arts | Karnataka State Open University',
    description:
      'Pursue a UGC-entitled Online Bachelor of Arts from Karnataka State Open University. 3-year programme with History, Economics and Political Science optionals, and choice of two languages. Government university, AICTE approved, NAAC A+.',
  },

  hero: {
    kicker: 'Online BA',
    titleLead: 'Online BA from',
    titleAccent: 'KSOU',
    supporting: 'Build Knowledge Across Humanities & Social Sciences.',
    description:
      'Pursue a comprehensive online Bachelor of Arts from Karnataka State Open University, designed to build knowledge across history, economics, political science and language studies.',
    Icon: BookOpen,
    visualLabel: 'Placeholder area reserved for a BA programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '3 Years' },
    { label: 'Structure', value: 'Year-wise' },
    { label: 'Credits', value: '110' },
    { label: 'Mode', value: 'Online' },
    { label: 'Medium', value: 'English' },
    { label: 'Eligibility', value: 'PUC / 10+2' },
  ],

  feeDurationEligibility: [
    {
      id: 'duration',
      label: 'Course Duration',
      value: '3 Years',
      meta: 'Year-wise curriculum',
      description: 'The BA programme is structured across three years and carries a total of 110 credits.',
      Icon: CalendarClock,
    },
    {
      id: 'fees',
      label: 'Course Fees',
      value: '₹30,000',
      meta: 'Total tuition / admission fee',
      description: 'Fees are payable across the three years of the programme.',
      breakdown: [
        { label: 'Year 1', value: '₹10,000' },
        { label: 'Year 2', value: '₹10,000' },
        { label: 'Year 3', value: '₹10,000' },
      ],
      note: PROGRAMME_EXAM_FEE_NOTE,
      examFees: PROGRAMME_EXAM_FEES,
      Icon: Landmark,
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      value: 'PUC / 10+2',
      meta: 'Karnataka PUC Board or equivalent',
      description:
        'Candidates who have passed the Two Year Pre-University Examination in Karnataka, or completed 12 years of schooling (10+2 or equivalent) from another state, or the PUC Vocational Course, are eligible for the BA programme.',
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro:
      'A humanities and social sciences education built around academic depth, accessibility and personal growth.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your BA through Karnataka State Open University, a state university established to expand access to higher education.',
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
        title: 'Multidisciplinary Curriculum',
        description:
          'Build knowledge across History, Economics and Political Science, alongside your choice of language studies.',
        Icon: BookOpen,
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
        title: 'Choice of Languages & Optionals',
        description:
          'Choose any two languages from Kannada, English, Hindi and Sanskrit, and study across History, Economics and Political Science.',
        Icon: Languages,
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
    heading: 'BA Subject Areas',
    subheading: 'Choose two languages and study across History, Economics and Political Science.',
    groups: [
      {
        id: 'languages',
        title: 'Languages',
        description: 'Choose any two languages of your choice.',
        meta: 'Select 2',
        Icon: Languages,
        subjects: ['Kannada', 'English', 'Hindi', 'Sanskrit'],
      },
      {
        id: 'history',
        title: 'History',
        description: 'Indian and world history, and the cultural history of Karnataka.',
        Icon: Landmark,
        subjects: [
          'History of India and Culture (Upto 1526 A.D)',
          'History of India and Culture (1526 A.D to 1857 A.D)',
          'History and Culture of Karnataka (1336 to 1956 A.D)',
          'History of Modern World (1600–1990 A.D)',
          'Colonialism and Nationalism in Asia',
        ],
      },
      {
        id: 'economics',
        title: 'Economics',
        description: 'Economic theory, banking, international trade and Indian economy.',
        Icon: TrendingUp,
        subjects: [
          'Economic Theory',
          'Money, Banking and Public Economics',
          'International Trade and Finance',
          'Indian Economy',
          'Economics of Development',
        ],
      },
      {
        id: 'political-science',
        title: 'Political Science',
        description: 'Political theory, governments, and Indian constitution and administration.',
        Icon: Scale,
        subjects: [
          'Political Theory',
          'Modern Governments',
          'Indian Constitution and Government',
          'Public Administration',
          'International Relations',
        ],
      },
    ],
  },

  curriculum: {
    subtitle: 'A structured three-year curriculum across languages and your chosen optional subjects.',
    terms: [
      {
        id: 'year1',
        label: 'Year 1',
        credits: 32,
        subjects: [
          { title: 'Language 1 & 2 (Course I)', type: 'Group I', credits: 8 },
          { title: 'Indian Constitution, Human Rights and Environmental Studies (ICHR&ES)', type: 'Group II', credits: 6 },
          { title: 'Optional 1, 2 & 3 (Course I)', type: 'Group III', credits: 18 },
        ],
      },
      {
        id: 'year2',
        label: 'Year 2',
        credits: 32,
        subjects: [
          { title: 'Language 1 & 2 (Course II)', type: 'Group I', credits: 8 },
          { title: 'Fundamentals of Computer Application (FCA)', type: 'Group II', credits: 6 },
          { title: 'Optional 1, 2 & 3 (Course II)', type: 'Group III', credits: 18 },
        ],
      },
      {
        id: 'year3',
        label: 'Year 3',
        credits: 54,
        subjects: [
          { title: 'Optional 1 (Courses III, IV & V)', type: 'Group III', credits: 18 },
          { title: 'Optional 2 (Courses III, IV & V)', type: 'Group III', credits: 18 },
          { title: 'Optional 3 (Courses III, IV & V)', type: 'Group III', credits: 18 },
        ],
      },
    ],
  },

  careerContext:
    'Build your profile, prepare with confidence and discover career opportunities across the humanities, public service, education and research.',

  degree: {
    titleAccent: 'BA Degree from KSOU',
    description: 'Complete your BA journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Deepa S.',
      programme: 'BA Student',
      quote:
        'Being able to choose my own languages and optional subjects made the programme feel genuinely suited to my interests.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Manoj T.',
      programme: 'BA Student',
      quote:
        'Studying online let me continue my BA while managing other responsibilities at home.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online BA?',
        answer: 'The KSOU Online BA is a 3-year programme carrying a total of 110 credits.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online BA?',
        answer:
          'Candidates who have passed the Two Year Pre-University Examination in Karnataka, or completed 12 years of schooling (10+2 or equivalent), or the PUC Vocational Course, are eligible to apply.',
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online BA?',
        answer:
          'The total programme fee is ₹30,000, payable as ₹10,000 in each of the three years. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online BA UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'languages',
        question: 'Which languages can I choose for the BA programme?',
        answer: 'You can choose any two languages from Kannada, English, Hindi and Sanskrit.',
      },
      {
        id: 'optionals',
        question: 'What optional subjects are available?',
        answer: 'The BA programme offers optional subjects in History, Economics and Political Science.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online BA programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online BA is English.',
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online BA?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online BA?',
        answer:
          'You can apply by selecting "Apply Now" on this page, completing the application form and submitting the required documents along with the applicable fee.',
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
        question: 'Is the BA degree valid for employment and higher education?',
        answer:
          'Yes. As a UGC-entitled degree from a government university, the KSOU Online BA is valid for higher studies and employment, on par with other recognized degrees.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the BA from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online BA can be pursued from anywhere, without needing to relocate to Karnataka.',
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
