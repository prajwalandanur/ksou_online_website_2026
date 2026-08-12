import {
  BadgeCheck,
  Briefcase,
  CalendarClock,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Megaphone,
  Plane,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { PROGRAMME_EXAM_FEES, PROGRAMME_EXAM_FEE_NOTE } from './shared';

// All facts on this page are sourced from KSOU_Online_Programmes_Prospectus.pdf
// and KSOU's official institutional material — do not invent fees, eligibility,
// credits, specializations, recognition, or programme features.

export const mba = {
  slug: 'mba',
  shortName: 'MBA',
  fullName: 'Master of Business Administration',
  seo: {
    title: 'KSOU Online MBA — Fees, Eligibility & Admission 2026',
    description:
      'KSOU Online MBA — UGC-entitled, AICTE-approved 2-year online MBA from Karnataka State Open University. ₹80,000 total fees. NAAC A+ government university.',
  },

  hero: {
    kicker: 'Online MBA',
    titleLead: 'Online MBA from',
    titleAccent: 'KSOU',
    supporting: 'Build Business Expertise. Advance Your Career.',
    description:
      'Pursue a comprehensive online MBA from Karnataka State Open University, designed to build management knowledge, business skills and professional capabilities.',
    Icon: Briefcase,
    visualLabel: 'Placeholder area reserved for an MBA programme photo',
  },

  infoStrip: [
    { label: 'Duration', value: '2 Years' },
    { label: 'Semesters', value: '4' },
    { label: 'Credits', value: '94' },
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
        'The MBA programme is structured across four semesters and carries a total of 94 credits.',
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
        'Candidates who have passed a degree examination from a recognized university, or an examination considered equivalent, are eligible for the MBA programme.',
      Icon: GraduationCap,
    },
  ],

  whyChoose: {
    intro:
      'A management education experience built around academic depth, accessibility and professional growth.',
    items: [
      {
        number: '01',
        title: 'Government University',
        description:
          'Pursue your MBA through Karnataka State Open University, a state university established to expand access to higher education.',
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
        title: 'Comprehensive Management Curriculum',
        description:
          'Build knowledge across management, economics, finance, marketing, human resources, strategy and business operations.',
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
        title: 'Multiple Elective Areas',
        description:
          'Explore elective areas across finance, marketing, human resources, operations, tourism, corporate law, information technology and healthcare management.',
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
    heading: 'MBA Specializations & Elective Areas',
    subheading: 'Explore the elective areas offered across Semester III and IV of the MBA programme.',
    groups: [
      {
        id: 'finance',
        title: 'Finance',
        description: 'Corporate finance, markets and portfolio management.',
        Icon: Wallet,
        subjects: [
          'Financial Markets and Institutions',
          'Advanced Corporate Finance',
          'Security Analysis and Portfolio Management',
          'Strategic Financial Management',
          'International Financial Management',
          'Derivatives',
        ],
      },
      {
        id: 'marketing',
        title: 'Marketing',
        description: 'Brand, consumer behaviour and market strategy.',
        Icon: Megaphone,
        subjects: [
          'Advertising and Sales Promotions',
          'Rural Marketing',
          'Consumer Behaviour and Marketing Research',
          'Retailing and Supply Chain Management',
          'Business Marketing',
          'International Marketing',
        ],
      },
      {
        id: 'hr',
        title: 'Human Resource Management',
        description: 'People strategy, compensation and labour relations.',
        Icon: Users,
        subjects: [
          'Strategic Human Resource Development',
          'Industrial Relations',
          'Performance Appraisal and Compensation Management',
          'Knowledge Management',
          'International Human Resource Management',
          'Labour Legislation',
        ],
      },
      {
        id: 'operations',
        title: 'Operations',
        description: 'Supply chain, manufacturing and analytics.',
        Icon: Factory,
        subjects: [
          'Operations Research and Analytics',
          'Supply Chain Management',
          'Material and Purchase Management',
          'Strategic Operations Management',
          'World Class Manufacturing',
          'Global Operations Management',
        ],
      },
      {
        id: 'tourism',
        title: 'Tourism',
        description: 'Travel, hospitality and sustainable tourism.',
        Icon: Plane,
        subjects: [
          'Tourism Development',
          'Tourism Sales and Marketing',
          'Hospitality Management',
          'Travel Agency Management',
          'Eco-tourism and Sustainable Development',
          'Global Tourism',
        ],
      },
      {
        id: 'corporate-law',
        title: 'Corporate Law',
        description: 'Business, banking and taxation law.',
        Icon: Scale,
        subjects: [
          'Corporate Law',
          'Insurance Law',
          'Intellectual Property Rights',
          'Law of Banking',
          'International Trade Law',
          'Corporate Taxation Law',
        ],
      },
      {
        id: 'information-technology',
        title: 'Information Technology',
        description: 'Data, analytics and enterprise systems.',
        Icon: Cpu,
        subjects: [
          'Database Management System',
          'Business Intelligence and Analytics',
          'E-commerce',
          'Software Project Management',
          'Information Security',
          'Big Data Analytics using R',
        ],
      },
      {
        id: 'healthcare',
        title: 'Hospital & Healthcare Management',
        description: 'Clinical operations and healthcare administration.',
        Icon: HeartPulse,
        subjects: [
          'Hospital Operations Management',
          'Management of Non-Clinical Services',
          'Legal Aspects in Healthcare & Business Ethics',
          'Hospital Information System',
          'Management of Clinical Services',
          'Hospital Architecture, Planning and Maintenance',
        ],
      },
    ],
  },

  // Sourced directly from the semester-wise syllabus tables in the prospectus.
  // Course titles are verbatim. Semester 3 and 4 elective-group subjects are
  // covered in `structure` above rather than repeated here — each semester
  // lists only its fixed core subjects plus a note pointing back to the
  // elective explorer.
  curriculum: {
    subtitle:
      'A structured four-semester curriculum covering the core areas of modern business and management.',
    terms: [
      {
        id: 'sem1',
        label: 'Semester 01',
        credits: 22,
        subjects: [
          { title: 'Management and Organizational Behaviour', type: 'Hard Core', credits: 4 },
          { title: 'Managerial Economics', type: 'Hard Core', credits: 4 },
          { title: 'Accounting for Managers', type: 'Hard Core', credits: 4 },
          { title: 'Statistics and Optimization Techniques', type: 'Hard Core', credits: 4 },
          { title: 'Legal Aspects of Business', type: 'Hard Core', credits: 4 },
          { title: 'Open Elective', type: 'Soft Core', credits: 2 },
        ],
      },
      {
        id: 'sem2',
        label: 'Semester 02',
        credits: 22,
        subjects: [
          { title: 'Information Technology for Managers', type: 'Hard Core', credits: 4 },
          { title: 'Corporate Finance', type: 'Hard Core', credits: 4 },
          { title: 'Marketing Management', type: 'Hard Core', credits: 4 },
          { title: 'Human Resource Management', type: 'Hard Core', credits: 4 },
          { title: 'Managerial Communication and Research Methods', type: 'Hard Core', credits: 4 },
          { title: 'Open Elective', type: 'Soft Core', credits: 2 },
        ],
      },
      {
        id: 'sem3',
        label: 'Semester 03',
        credits: 22,
        subjects: [
          { title: 'Entrepreneurship and Small Business', type: 'Hard Core', credits: 4 },
          { title: 'Strategic Management', type: 'Hard Core', credits: 4 },
          { title: 'Tools of TQM', type: 'Soft Core', credits: 2 },
        ],
        electiveNote:
          'Plus one Elective Group (3 papers, 12 credits) — Finance, Marketing, Human Resource Management, Operations, Tourism, Corporate Law, Information Technology, or Hospital & Healthcare Management. See Specializations & Elective Areas above.',
      },
      {
        id: 'sem4',
        label: 'Semester 04',
        credits: 28,
        subjects: [
          { title: 'Quality and Operations Management', type: 'Hard Core', credits: 4 },
          { title: 'International Business', type: 'Hard Core', credits: 4 },
          { title: 'Statistical Tools for Management', type: 'Soft Core', credits: 2 },
          { title: 'Project Report', type: 'Hard Core', credits: 4 },
          { title: 'Viva-Voce', type: 'Soft Core', credits: 2 },
        ],
        electiveNote:
          'Plus one Elective Group (3 papers, 12 credits) continuing the same elective area chosen in Semester 3.',
      },
    ],
  },

  careerContext: 'Build your profile, prepare with confidence and discover relevant career opportunities.',

  degree: {
    titleAccent: 'MBA Degree from KSOU',
    description:
      'Complete your MBA journey through KSOU Online and take your academic achievement forward.',
  },

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Ananya R.',
      programme: 'MBA Student',
      quote:
        'The flexibility of online learning has helped me continue my education alongside my professional commitments.',
      isPlaceholder: true,
    },
    {
      id: 'testimonial-2',
      name: 'Rahul K.',
      programme: 'MBA Student',
      quote:
        'The programme gave me a structured way to strengthen my understanding of management while continuing my career.',
      isPlaceholder: true,
    },
  ],

  faqs: {
    defaultIds: ['duration', 'eligibility', 'fee', 'ugc', 'how-to-apply'],
    items: [
      {
        id: 'duration',
        question: 'What is the duration of the KSOU Online MBA?',
        answer:
          'The KSOU Online MBA is a 2-year programme structured across 4 semesters, carrying a total of 94 credits.',
      },
      {
        id: 'eligibility',
        question: 'What is the eligibility for the KSOU Online MBA?',
        answer:
          'Candidates who have passed a degree examination from a recognized university, or an examination considered equivalent, are eligible to apply.',
      },
      {
        id: 'fee',
        question: 'What is the fee for the KSOU Online MBA?',
        answer:
          'The total programme fee is ₹80,000, payable as ₹40,000 in each of the two years. Examination fees are charged separately.',
      },
      {
        id: 'ugc',
        question: 'Is the KSOU Online MBA UGC entitled?',
        answer:
          "Yes. KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
      },
      {
        id: 'aicte',
        question: 'Is the KSOU Online MBA approved by AICTE?',
        answer:
          'Yes, the programme is approved by AICTE — the All India Council for Technical Education.',
      },
      {
        id: 'how-it-works',
        question: 'How does the online MBA programme work?',
        answer:
          'Students access lectures, digital study material and assignments through the KSOU Online LMS, and can learn at their own pace while receiving academic support throughout the programme.',
      },
      {
        id: 'curriculum-subjects',
        question: 'What subjects are included in the MBA curriculum?',
        answer:
          'The curriculum spans four semesters, covering core subjects such as Organizational Behaviour, Managerial Economics, Corporate Finance, Marketing Management and Human Resource Management, along with elective subjects in Semesters 3 and 4.',
      },
      {
        id: 'elective-areas',
        question: 'What elective areas are available?',
        answer:
          'Students can choose one elective group from Finance, Marketing, Human Resource Management, Operations, Tourism, Corporate Law, Information Technology, or Hospital & Healthcare Management.',
      },
      {
        id: 'examinations',
        question: 'How are MBA examinations conducted?',
        answer:
          "Examinations are conducted as per KSOU's official academic calendar and prescribed evaluation process, with schedules communicated in advance through the LMS.",
      },
      {
        id: 'working-professionals',
        question: 'Can working professionals pursue the KSOU Online MBA?',
        answer:
          'Yes. The online format allows students to learn at their own pace while continuing with their professional and personal commitments.',
      },
      {
        id: 'medium',
        question: 'What is the medium of instruction?',
        answer: 'The medium of instruction for the KSOU Online MBA is English.',
      },
      {
        id: 'how-to-apply',
        question: 'How do I apply for the KSOU Online MBA?',
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
        question: 'Is the KSOU Online MBA valid for government jobs?',
        answer:
          'Yes. As a UGC-entitled degree from a state government university, the KSOU Online MBA is accepted for government job applications, public-sector recruitment, private-sector employment and further higher education, on par with a degree earned on campus.',
      },
      {
        id: 'placement-support',
        question: 'Does KSOU provide career or placement assistance?',
        answer:
          'KSOU Online provides career-support resources, including resume assistance, interview preparation and job-matching support, as part of its learner ecosystem — without guaranteeing placement outcomes.',
      },
      {
        id: 'lms-access',
        question: 'How do I access the LMS?',
        answer:
          'Once your admission is confirmed, you will receive access credentials to log in to the KSOU Online Learning Management System.',
      },
      {
        id: 'outside-karnataka',
        question: 'Can I study the MBA from outside Karnataka?',
        answer:
          'Yes. As an online programme, the KSOU Online MBA can be pursued from anywhere, without needing to relocate to Karnataka.',
      },
      {
        id: 'after-completion',
        question: 'What happens after I complete all programme requirements?',
        answer:
          'On successfully completing all programme requirements, including the Project Report and Viva-Voce, you receive your officially recognized KSOU MBA degree.',
      },
      {
        id: 'abc-deb-id',
        question: 'Do I need an ABC ID and DEB ID for KSOU Online MBA admission?',
        answer:
          'Yes — both are mandatory for admission to any online or distance programme. Create your ABC ID (Academic Bank of Credits) free of cost through DigiLocker at digilocker.gov.in, then use that ABC ID to generate your DEB ID (Distance Education Bureau ID) at deb.ugc.ac.in/StudentDEBId. The DEB ID confirms you are enrolling with a UGC-recognised institution, and your KSOU Online MBA admission is completed using it.',
      },
      {
        id: 'two-degrees',
        question: 'Can I pursue the KSOU Online MBA alongside another degree?',
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
