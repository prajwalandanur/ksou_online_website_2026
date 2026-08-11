import {
  BadgeCheck,
  Calculator,
  CalendarClock,
  GraduationCap,
  Landmark,
  Megaphone,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// (public/documents/ksou-online-prospectus.pdf) — do not invent fees, eligibility,
// credits, specializations, recognition, or programme features.

export const mcom = {
  slug: 'mcom',
  shortName: 'M.Com',
  fullName: 'Master of Commerce',
  seo: {
    title: 'KSOU Online M.Com — UGC Entitled Online Master of Commerce | Karnataka State Open University',
    description:
      'Pursue a UGC-entitled Online M.Com from Karnataka State Open University. 4-semester programme with dual specializations in Accounting, Finance, Marketing and HR. Government university, AICTE approved, NAAC A+.',
  },

  hero: {
    kicker: 'Online M.Com',
    titleLead: 'Online M.Com from',
    titleAccent: 'KSOU',
    supporting: 'Deepen Your Expertise in Commerce & Finance.',
    description:
      'Pursue a comprehensive online Master of Commerce from Karnataka State Open University, designed to build advanced knowledge in accounting, finance, marketing and business management.',
    Icon: Calculator,
    visualLabel: 'Placeholder area reserved for an M.Com programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '2 Years' },
    { label: 'Semesters', value: '4' },
    { label: 'Credits', value: '80' },
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
      description: 'The M.Com programme is structured across four semesters and carries a total of 80 credits.',
      Icon: CalendarClock,
    },
    {
      id: 'fees',
      label: 'Course Fees',
      value: '₹40,000',
      meta: 'Total tuition / admission fee',
      description: 'Fees are payable across the two years of the programme.',
      breakdown: [
        { label: 'Year 1', value: '₹20,000' },
        { label: 'Year 2', value: '₹20,000' },
      ],
      note: PROGRAMME_EXAM_FEE_NOTE,
      examFees: PROGRAMME_EXAM_FEES,
      Icon: Wallet,
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      value: "Bachelor's Degree",
      meta: 'B.Com / BBM / BBA graduates',
      description:
        'Candidates who have passed a three-year B.Com, BBM or BBA degree examination of a recognized university, or an equivalent examination, are eligible. Candidates without a commerce-cognate degree must qualify the Master’s Preparatory Programme (MPP) conducted by KSOU.',
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro: 'A commerce education built around academic depth, accessibility and professional growth.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your M.Com through Karnataka State Open University, a state university established to expand access to higher education.',
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
        title: 'Advanced Commerce Curriculum',
        description:
          'Build advanced knowledge across accounting, finance, marketing, human resources and business taxation.',
        Icon: Calculator,
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
        title: 'Dual Specializations',
        description:
          'Choose from four dual-specialization groups across Accounting, Finance, Marketing and Human Resource Management.',
        Icon: GraduationCap,
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
    heading: 'M.Com Dual Specializations',
    subheading: 'Choose one dual-specialization group, studied across Semesters I–IV.',
    groups: [
      {
        id: 'group-a',
        title: 'Accounting & Finance',
        description: 'Advanced accounting theory, financial management and investment analysis.',
        Icon: Wallet,
        subjects: [
          'Advanced Financial Accounting',
          'Indian Financial System',
          'Accounting Theory and Analysis',
          'Financial Management',
          'Advanced Management Accounting',
          'Project Appraisal and Infrastructure Finance',
          'Strategic Cost Management',
          'Investment Management',
        ],
      },
      {
        id: 'group-b',
        title: 'Marketing & Human Resource Management',
        description: 'Consumer strategy, advertising, and training and industrial relations.',
        Icon: Megaphone,
        subjects: [
          'Consumer Behaviour and Marketing Strategy',
          'Training and Development',
          'Advertising and Sales Promotion',
          'Industrial Relations',
          'Services Marketing',
          'Labour Legislation',
          'International Marketing Management',
          'International Human Resource Management',
        ],
      },
      {
        id: 'group-c',
        title: 'Accounting & Human Resource Management',
        description: 'Financial accounting expertise combined with people management.',
        Icon: Users,
        subjects: [
          'Advanced Financial Accounting',
          'Training and Development',
          'Accounting Theory and Analysis',
          'Industrial Relations',
          'Advanced Management Accounting',
          'Labour Legislation',
          'Strategic Cost Management',
          'International Human Resource Management',
        ],
      },
      {
        id: 'group-d',
        title: 'Marketing & Finance',
        description: 'Marketing strategy paired with financial systems and investment.',
        Icon: Calculator,
        subjects: [
          'Consumer Behaviour and Marketing Strategy',
          'Indian Financial System',
          'Advertising and Sales Promotion',
          'Financial Management',
          'Services Marketing',
          'Project Appraisal and Infrastructure Finance',
          'International Marketing Management',
          'Investment Management',
        ],
      },
    ],
  },

  curriculum: {
    subtitle:
      'A structured four-semester curriculum of core commerce papers, plus your chosen dual specialization.',
    note: 'The two specialization papers each semester depend on the dual-specialization group chosen — see M.Com Dual Specializations above.',
    terms: [
      {
        id: 'sem1',
        label: 'Semester 01',
        credits: 20,
        subjects: [
          { title: 'Management and Behavioural Process', type: 'Hard Core', credits: 4 },
          { title: 'Business Policy and Environment', type: 'Hard Core', credits: 4 },
          { title: 'Marketing Management', type: 'Hard Core', credits: 4 },
          { title: 'Inter-disciplinary Course - I', type: 'Elective', credits: 2 },
        ],
        electiveNote: 'Plus 2 specialization papers (6 credits) from your chosen dual-specialization group.',
      },
      {
        id: 'sem2',
        label: 'Semester 02',
        credits: 20,
        subjects: [
          { title: 'Human Resource Management', type: 'Hard Core', credits: 4 },
          { title: 'Advanced E-Commerce', type: 'Hard Core', credits: 4 },
          { title: 'Business Taxation and GST', type: 'Hard Core', credits: 4 },
          { title: 'Inter-disciplinary Course - II', type: 'Elective', credits: 2 },
        ],
        electiveNote: 'Plus 2 specialization papers (6 credits) from your chosen dual-specialization group.',
      },
      {
        id: 'sem3',
        label: 'Semester 03',
        credits: 20,
        subjects: [
          { title: 'Research Methodology', type: 'Hard Core', credits: 4 },
          { title: 'Quantitative Techniques', type: 'Hard Core', credits: 4 },
          { title: 'International Business', type: 'Hard Core', credits: 4 },
          { title: 'Principles and Practice of Banking', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 specialization papers (6 credits) from your chosen dual-specialization group.',
      },
      {
        id: 'sem4',
        label: 'Semester 04',
        credits: 20,
        subjects: [
          { title: 'Entrepreneurship Development', type: 'Hard Core', credits: 4 },
          { title: 'Project Report', type: 'Hard Core', credits: 8 },
          { title: 'Principles and Practice of Insurance', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 specialization papers (6 credits) from your chosen dual-specialization group.',
      },
    ],
  },

  careerContext:
    'Build your profile, prepare with confidence and discover career opportunities across accounting, finance, taxation and business.',

  degree: {
    titleAccent: 'M.Com Degree from KSOU',
    description: 'Complete your M.Com journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Priya N.',
      programme: 'M.Com Student',
      quote:
        'Choosing the Accounting & Finance specialization let me focus my postgraduate studies on exactly where my career was headed.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Vikram H.',
      programme: 'M.Com Student',
      quote: 'The online format meant I could pursue my M.Com without pausing my job.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online M.Com?',
        answer: 'The KSOU Online M.Com is a 2-year programme structured across 4 semesters, carrying a total of 80 credits.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online M.Com?',
        answer:
          'Candidates who have passed a three-year B.Com, BBM or BBA degree examination of a recognized university are eligible. Candidates without a commerce-cognate degree must qualify the Master’s Preparatory Programme (MPP) conducted by KSOU.',
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online M.Com?',
        answer:
          'The total programme fee is ₹40,000, payable as ₹20,000 in each of the two years. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online M.Com UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'specializations',
        question: 'What specializations are available in the M.Com programme?',
        answer:
          'Students can choose one dual-specialization group: Accounting & Finance, Marketing & Human Resource Management, Accounting & Human Resource Management, or Marketing & Finance.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online M.Com programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'project-report',
        question: 'Is a project report required for the M.Com programme?',
        answer:
          'Yes. During the fourth semester, students are required to prepare and submit a project report, followed by a viva-voce examination.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online M.Com is English only.',
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online M.Com?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online M.Com?',
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
        answer: 'No. Examination fees are charged separately, in addition to the ₹40,000 programme fee.',
      },
      {
        id: 'degree-validity',
        question: 'Is the M.Com degree valid for employment and higher education?',
        answer:
          'Yes. As a UGC-entitled degree from a government university, the KSOU Online M.Com is valid for higher studies and employment, on par with other recognized degrees.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the M.Com from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online M.Com can be pursued from anywhere, without needing to relocate to Karnataka.',
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
