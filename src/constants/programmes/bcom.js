import {
  BadgeCheck,
  Briefcase,
  CalendarClock,
  GraduationCap,
  Landmark,
  Languages,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// (public/documents/ksou-online-prospectus.pdf) — do not invent fees, eligibility,
// credits, subjects, recognition, or programme features.

export const bcom = {
  slug: 'bcom',
  shortName: 'B.Com',
  fullName: 'Bachelor of Commerce',
  seo: {
    title: 'KSOU Online B.Com — UGC Entitled Online Bachelor of Commerce | Karnataka State Open University',
    description:
      'Pursue a UGC-entitled Online B.Com from Karnataka State Open University. 3-year programme covering accounting, finance, business law and commerce. Government university, AICTE approved, NAAC A+.',
  },

  hero: {
    kicker: 'Online B.Com',
    titleLead: 'Online B.Com from',
    titleAccent: 'KSOU',
    supporting: 'Build a Strong Foundation in Commerce.',
    description:
      'Pursue a comprehensive online Bachelor of Commerce from Karnataka State Open University, designed to build knowledge in accounting, finance, business law and commercial practice.',
    Icon: Briefcase,
    visualLabel: 'Placeholder area reserved for a B.Com programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '3 Years' },
    { label: 'Structure', value: 'Year-wise' },
    { label: 'Credits', value: '100' },
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
      description: 'The B.Com programme is structured across three years and carries a total of 100 credits.',
      Icon: CalendarClock,
    },
    {
      id: 'fees',
      label: 'Course Fees',
      value: '₹36,000',
      meta: 'Total tuition / admission fee',
      description: 'Fees are payable across the three years of the programme.',
      breakdown: [
        { label: 'Year 1', value: '₹12,000' },
        { label: 'Year 2', value: '₹12,000' },
        { label: 'Year 3', value: '₹12,000' },
      ],
      note: PROGRAMME_EXAM_FEE_NOTE,
      examFees: PROGRAMME_EXAM_FEES,
      Icon: Wallet,
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      value: 'PUC / 10+2',
      meta: 'Karnataka PUC Board or equivalent',
      description:
        'Candidates who have passed the Two Year Pre-University Examination in Karnataka, or completed 12 years of schooling (10+2 or equivalent) from another state, or a relevant PUC Vocational Course, are eligible for the B.Com programme.',
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro:
      'A commerce education built around academic depth, accessibility and professional foundation-building.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your B.Com through Karnataka State Open University, a state university established to expand access to higher education.',
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
        title: 'Comprehensive Commerce Curriculum',
        description:
          'Build knowledge across accounting, finance, business law, taxation, banking and business statistics.',
        Icon: Briefcase,
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
        title: 'Choice of Languages',
        description:
          'Choose any two languages from Kannada, English, Hindi and Sanskrit across your first two years.',
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
    heading: 'B.Com Core Study Areas',
    subheading: 'A fixed commerce curriculum organized across accounting, law and business operations, plus your choice of languages.',
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
        id: 'accounting-finance',
        title: 'Accounting & Finance',
        description: 'Financial and cost accounting, and corporate accounting practice.',
        Icon: Wallet,
        subjects: [
          'Financial Accounting - I',
          'Financial Accounting - II',
          'Cost and Management Accounting',
          'Corporate Accounting',
          'Auditing',
        ],
      },
      {
        id: 'business-law',
        title: 'Business & Commercial Law',
        description: 'Business environment, company law and taxation.',
        Icon: Scale,
        subjects: [
          'Indian Business Environment',
          'Company Law',
          'Business Law',
          'Income Tax',
        ],
      },
      {
        id: 'business-operations',
        title: 'Business Operations & Analytics',
        description: 'Markets, banking, statistics and business technology.',
        Icon: Briefcase,
        subjects: [
          'Business Organization and Management',
          'Financial Markets and Services',
          'Indian Banking System',
          'Business Statistics and Quantitative Technique',
          'Functional Management',
          'Computer in Business',
        ],
      },
    ],
  },

  curriculum: {
    subtitle: 'A structured three-year commerce curriculum, plus your choice of languages.',
    terms: [
      {
        id: 'year1',
        label: 'Year 1',
        credits: 32,
        subjects: [
          { title: 'Language 1 & 2', type: 'Group I', credits: 8 },
          { title: 'Indian Constitution, Human Rights and Environmental Studies (ICHR&ES)', type: 'Group II', credits: 6 },
          { title: 'Business Organization and Management', type: 'Group III', credits: 6 },
          { title: 'Indian Business Environment', type: 'Group III', credits: 6 },
          { title: 'Financial Accounting - I', type: 'Group III', credits: 6 },
        ],
      },
      {
        id: 'year2',
        label: 'Year 2',
        credits: 32,
        subjects: [
          { title: 'Language 3 & 4', type: 'Group I', credits: 8 },
          { title: 'Fundamentals of Computer Application (FCA)', type: 'Group II', credits: 6 },
          { title: 'Financial Markets and Services', type: 'Group III', credits: 6 },
          { title: 'Company Law', type: 'Group III', credits: 6 },
          { title: 'Financial Accounting - II', type: 'Group III', credits: 6 },
        ],
      },
      {
        id: 'year3',
        label: 'Year 3',
        credits: 54,
        subjects: [
          { title: 'Income Tax', type: 'Group III', credits: 6 },
          { title: 'Cost and Management Accounting', type: 'Group III', credits: 6 },
          { title: 'Auditing', type: 'Group III', credits: 6 },
          { title: 'Business Law', type: 'Group III', credits: 6 },
          { title: 'Indian Banking System', type: 'Group III', credits: 6 },
          { title: 'Business Statistics and Quantitative Technique', type: 'Group III', credits: 6 },
          { title: 'Functional Management', type: 'Group III', credits: 6 },
          { title: 'Computer in Business', type: 'Group III', credits: 6 },
          { title: 'Corporate Accounting', type: 'Group III', credits: 6 },
        ],
      },
    ],
  },

  careerContext:
    'Build your profile, prepare with confidence and discover career opportunities across accounting, banking, finance and business.',

  degree: {
    titleAccent: 'B.Com Degree from KSOU',
    description: 'Complete your B.Com journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Sneha K.',
      programme: 'B.Com Student',
      quote:
        'The structured commerce curriculum gave me a solid foundation while I continued working part-time.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Arjun P.',
      programme: 'B.Com Student',
      quote: 'Online access to my study material made it easy to balance the programme with my daily schedule.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online B.Com?',
        answer: 'The KSOU Online B.Com is a 3-year programme carrying a total of 100 credits.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online B.Com?',
        answer:
          'Candidates who have passed the Two Year Pre-University Examination in Karnataka, or completed 12 years of schooling (10+2 or equivalent), or a relevant PUC Vocational Course, are eligible to apply.',
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online B.Com?',
        answer:
          'The total programme fee is ₹36,000, payable as ₹12,000 in each of the three years. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online B.Com UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'languages',
        question: 'Which languages can I choose for the B.Com programme?',
        answer: 'You can choose any two languages from Kannada, English, Hindi and Sanskrit.',
      },
      {
        id: 'curriculum-subjects',
        question: 'What subjects are included in the B.Com curriculum?',
        answer:
          'The curriculum covers 15 core commerce papers across three years, including Financial Accounting, Business Law, Income Tax, Cost and Management Accounting, Auditing and Corporate Accounting.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online B.Com programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online B.Com is English only.',
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online B.Com?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online B.Com?',
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
        answer: 'No. Examination fees are charged separately, in addition to the ₹36,000 programme fee.',
      },
      {
        id: 'degree-validity',
        question: 'Is the B.Com degree valid for employment and higher education?',
        answer:
          'Yes. As a UGC-entitled degree from a government university, the KSOU Online B.Com is valid for higher studies and employment, on par with other recognized degrees.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the B.Com from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online B.Com can be pursued from anywhere, without needing to relocate to Karnataka.',
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
