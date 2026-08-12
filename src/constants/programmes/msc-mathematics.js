import {
  BadgeCheck,
  CalendarClock,
  Cpu,
  GraduationCap,
  Landmark,
  Network,
  ShieldCheck,
  Sigma,
  Wallet,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// (public/documents/ksou-online-prospectus.pdf) — do not invent fees, eligibility,
// credits, subjects, recognition, or programme features.

export const mscMathematics = {
  slug: 'msc-mathematics',
  shortName: 'M.Sc Mathematics',
  fullName: 'Master of Science – Mathematics',
  seo: {
    title: 'KSOU Online M.Sc Mathematics — Fees, Eligibility & Admission',
    description:
      'KSOU Online M.Sc Mathematics — UGC-entitled 2-year M.Sc from Karnataka State Open University, Mysuru. ₹80,000 total fees. NAAC A+ government university.',
  },

  hero: {
    kicker: 'Online M.Sc Mathematics',
    titleLead: 'Online M.Sc Mathematics from',
    titleAccent: 'KSOU',
    supporting: 'Advance Your Mathematical & Analytical Expertise.',
    description:
      'Pursue a comprehensive online M.Sc in Mathematics from Karnataka State Open University, designed to build advanced knowledge in algebra, analysis, topology and applied mathematics.',
    Icon: Sigma,
    visualLabel: 'Placeholder area reserved for an M.Sc Mathematics programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '2 Years' },
    { label: 'Semesters', value: '4' },
    { label: 'Credits', value: '82' },
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
        'The M.Sc Mathematics programme is structured across four semesters and carries a total of 82 credits.',
      Icon: CalendarClock,
    },
    {
      id: 'fees',
      label: 'Course Fees',
      value: '₹80,000',
      meta: 'Total tuition / admission fee',
      description: 'Fees are payable across the two years of the programme.',
      breakdown: [
        { label: 'Year 1', value: '₹40,000' },
        { label: 'Year 2', value: '₹40,000' },
      ],
      note: PROGRAMME_EXAM_FEE_NOTE,
      examFees: PROGRAMME_EXAM_FEES,
      Icon: Wallet,
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      value: "Bachelor's Degree",
      meta: 'Any recognized university',
      description:
        "Candidates who have obtained a Bachelor's degree from a recognized university are eligible for the M.Sc Mathematics programme.",
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro: 'A mathematics education built around analytical depth, accessibility and research readiness.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your M.Sc through Karnataka State Open University, a state university established to expand access to higher education.',
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
        title: 'Advanced Mathematical Curriculum',
        description:
          'Build advanced knowledge across algebra, real and complex analysis, topology and functional analysis.',
        Icon: Sigma,
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
        title: 'Discipline-Specific Electives',
        description:
          'Choose your focus areas in Semesters III and IV, from number theory and graph theory to operations research.',
        Icon: Network,
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
    heading: 'M.Sc Mathematics Elective Focus Areas',
    subheading: 'Choose 2 of 3 discipline-specific electives in each of Semester III and IV.',
    groups: [
      {
        id: 'number-theory',
        title: 'Number Theory',
        description: 'Properties and structure of integers and number-theoretic functions.',
        meta: 'Semester III · Choose 2 of 3',
        Icon: Sigma,
        subjects: ['Number Theory (MMDSE-3.4)'],
      },
      {
        id: 'q-series',
        title: 'q-Series & Theory of Partition',
        description: 'Partition theory and q-series identities in combinatorics.',
        meta: 'Semester III · Choose 2 of 3',
        Icon: Network,
        subjects: ['q Series and Theory of Partition (MMDSE-3.5)'],
      },
      {
        id: 'mathematical-statistics',
        title: 'Mathematical Statistics',
        description: 'Statistical theory and methods with a mathematical foundation.',
        meta: 'Semester III · Choose 2 of 3',
        Icon: Cpu,
        subjects: ['Mathematical Statistics (MMDSE-3.6)'],
      },
      {
        id: 'graph-theory',
        title: 'Graph Theory',
        description: 'Structural and algorithmic study of graphs and networks.',
        meta: 'Semester IV · Choose 2 of 3',
        Icon: Network,
        subjects: ['Graph Theory (MMDSE-4.4)'],
      },
      {
        id: 'operation-research',
        title: 'Operation Research',
        description: 'Optimization and decision-making models for applied problems.',
        meta: 'Semester IV · Choose 2 of 3',
        Icon: Cpu,
        subjects: ['Operation Research (MMDSE-4.5)'],
      },
      {
        id: 'differential-geometry',
        title: 'Differential Geometry',
        description: 'Geometric structures using differential and integral calculus.',
        meta: 'Semester IV · Choose 2 of 3',
        Icon: Sigma,
        subjects: ['Differential Geometry (MMDSE-4.6)'],
      },
    ],
  },

  curriculum: {
    subtitle: 'A structured four-semester curriculum across algebra, analysis, topology and applied mathematics.',
    terms: [
      {
        id: 'sem1',
        label: 'Semester 01',
        credits: 20,
        subjects: [
          { title: 'Algebra - I', type: 'Core', credits: 4 },
          { title: 'Real Analysis - I', type: 'Core', credits: 4 },
          { title: 'Complex Analysis - I', type: 'Core', credits: 4 },
          { title: 'Ordinary Differential Equations', type: 'Discipline Elective', credits: 3 },
          { title: 'Numerical Analysis', type: 'Discipline Elective', credits: 3 },
          { title: 'Fundamentals of Mathematics', type: 'Open Elective', credits: 2 },
        ],
      },
      {
        id: 'sem2',
        label: 'Semester 02',
        credits: 20,
        subjects: [
          { title: 'Algebra - II', type: 'Core', credits: 4 },
          { title: 'Real Analysis - II', type: 'Core', credits: 4 },
          { title: 'Complex Analysis - II', type: 'Core', credits: 4 },
          { title: 'Partial Differential Equations', type: 'Discipline Elective', credits: 3 },
          { title: 'Discrete Mathematics', type: 'Discipline Elective', credits: 3 },
          { title: 'Combinatorics and Graph Theory', type: 'Open Elective', credits: 2 },
        ],
      },
      {
        id: 'sem3',
        label: 'Semester 03',
        credits: 20,
        subjects: [
          { title: 'Linear Algebra', type: 'Core', credits: 4 },
          { title: 'Topology - I', type: 'Core', credits: 4 },
          { title: 'Functional Analysis', type: 'Core', credits: 4 },
          { title: 'Fuzzy Mathematics', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 of 3 discipline-specific electives (6 credits) — see Elective Focus Areas above.',
      },
      {
        id: 'sem4',
        label: 'Semester 04',
        credits: 20,
        subjects: [
          { title: 'Measure and Integration', type: 'Core', credits: 4 },
          { title: 'Topology - II', type: 'Core', credits: 4 },
          { title: 'Lattice Theory', type: 'Core', credits: 4 },
          { title: 'Algorithms and Computations', type: 'Skill Enhancement', credits: 2 },
        ],
        electiveNote: 'Plus 2 of 3 discipline-specific electives (6 credits) — see Elective Focus Areas above.',
      },
    ],
  },

  careerContext:
    'Build your profile, prepare with confidence and discover career opportunities across analytics, research, data science and education.',

  degree: {
    titleAccent: 'M.Sc Mathematics Degree from KSOU',
    description: 'Complete your M.Sc journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Kavya R.',
      programme: 'M.Sc Mathematics Student',
      quote:
        'The discipline-specific electives let me shape the programme around the areas of mathematics I care about most.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Suresh B.',
      programme: 'M.Sc Mathematics Student',
      quote: 'Studying online gave me the flexibility to go deeper into mathematics while working.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online M.Sc Mathematics?',
        answer:
          'The KSOU Online M.Sc Mathematics is a 2-year programme structured across 4 semesters, carrying a total of 82 credits.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online M.Sc Mathematics?',
        answer: "Candidates who have obtained a Bachelor's degree from a recognized university are eligible to apply.",
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online M.Sc Mathematics?',
        answer:
          'The total programme fee is ₹80,000, payable as ₹40,000 in each of the two years. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online M.Sc Mathematics UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'electives',
        question: 'What electives are available in the M.Sc Mathematics programme?',
        answer:
          'In Semester III, students choose 2 of 3 electives from Number Theory, q-Series & Theory of Partition, and Mathematical Statistics. In Semester IV, students choose 2 of 3 from Graph Theory, Operation Research, and Differential Geometry.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online M.Sc Mathematics programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online M.Sc Mathematics is English only.',
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online M.Sc Mathematics?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online M.Sc Mathematics?',
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
        answer: 'No. Examination fees are charged separately, in addition to the ₹80,000 programme fee.',
      },
      {
        id: 'degree-validity',
        question: 'Is the KSOU Online M.Sc Mathematics valid for government jobs?',
        answer:
          'Yes. As a UGC-entitled degree from a state government university, the KSOU Online M.Sc Mathematics is accepted for government job applications, public-sector recruitment, private-sector employment and further higher education, on par with a degree earned on campus.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the M.Sc Mathematics from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online M.Sc Mathematics can be pursued from anywhere, without needing to relocate to Karnataka.',
      },
      {
        id: 'abc-deb-id',
        question: 'Do I need an ABC ID and DEB ID for KSOU Online M.Sc Mathematics admission?',
        answer:
          'Yes — both are mandatory for admission to any online or distance programme. Create your ABC ID (Academic Bank of Credits) free of cost through DigiLocker at digilocker.gov.in, then use that ABC ID to generate your DEB ID (Distance Education Bureau ID) at deb.ugc.ac.in/StudentDEBId. The DEB ID confirms you are enrolling with a UGC-recognised institution, and your KSOU Online M.Sc Mathematics admission is completed using it.',
      },
      {
        id: 'two-degrees',
        question: 'Can I pursue the KSOU Online M.Sc Mathematics alongside another degree?',
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
