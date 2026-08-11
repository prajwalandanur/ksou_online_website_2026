import {
  CircleCheckBig,
  Compass,
  FileText,
  Landmark,
  Target,
  UserRound,
} from 'lucide-react';
import aicteLogo from '@/assets/accreditation/aicte-logo.png';
import ugcLogo from '@/assets/accreditation/ugc-logo.png';
import naacLogo from '@/assets/accreditation/naac-logo.jpg';

// Content shared identically across every KSOU Online programme page — the
// source spec is explicit that Recognition, Career Support's feature list,
// and the Why-KSOU institutional story are about the university, not the
// individual course, and should not be rewritten per programme.
// All facts sourced from KSOU_Online_Programmes_Prospectus.pdf and KSOU's
// official institutional material — do not invent credentials or history.

export const PROGRAMME_RECOGNITION = [
  {
    id: 'ugc',
    label: 'UGC Entitled',
    description:
      "KSOU's online programmes are presented in the prospectus as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
    logo: ugcLogo,
    alt: 'UGC logo',
  },
  {
    id: 'aicte',
    label: 'AICTE Approved',
    description: 'Approved by AICTE — All India Council for Technical Education.',
    logo: aicteLogo,
    alt: 'AICTE logo',
  },
  {
    id: 'naac',
    label: 'NAAC A+',
    description:
      'KSOU received NAAC A+ accreditation with a GPA of 3.31 on a seven-point scale, valid for five years from May 19, 2023.',
    logo: naacLogo,
    alt: 'NAAC A+ accreditation logo',
  },
  {
    id: 'government-university',
    label: 'Government University',
    description:
      'Karnataka State Open University is a public university established in 1996, with its roots in the earlier Institute of Correspondence Courses and Continuing Education.',
    Icon: Landmark,
  },
];

// Reflects features publicly described for the KSOU Online platform at the
// time this content was written — re-verify before assuming they are still
// current if this is revisited later.
export const PROGRAMME_CAREER_SUPPORT = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Smart resume building support to help you present your profile professionally.',
    Icon: FileText,
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Competency benchmarking and skill-gap insights to guide your preparation.',
    Icon: Target,
  },
  {
    id: 'interview',
    title: 'Interview',
    description: 'Mock interviews and photometric profiling to help you prepare with confidence.',
    Icon: UserRound,
  },
  {
    id: 'opportunities',
    title: 'Opportunities',
    description: 'Real-time job availability and AI-based career recommendations.',
    Icon: Compass,
  },
  {
    id: 'job-matching',
    title: 'Job Matching',
    description: 'AI-assisted job matchmaking with a compatibility match percentage.',
    Icon: CircleCheckBig,
  },
];

export const PROGRAMME_DEGREE_TAGS = ['Verified', 'Recognized', 'Official'];

// Vision statement quoted verbatim from the prospectus — a differently
// worded tagline could not be verified against an official source, so the
// documented prospectus wording is used instead.
export const PROGRAMME_UNIVERSITY_VISION =
  "To be one among the top five Open Universities in India by providing quality higher education with emphasis on learners' transformation through multidisciplinary, relevant, accessible and affordable academic programs.";

export const PROGRAMME_UNIVERSITY_MILESTONES = [
  {
    year: '1996',
    title: 'University Established',
    description:
      'Karnataka State Open University is established as a public university, with its roots in the earlier Institute of Correspondence Courses and Continuing Education.',
  },
  {
    year: '2020',
    title: 'UGC-Entitled Online Learning',
    description:
      "KSOU's online programmes are presented as UGC-entitled under the UGC ODL & OL Regulations, 2020.",
  },
  {
    year: '2023',
    title: 'NAAC A+ Accreditation',
    description:
      'KSOU is accredited with an A+ grade by NAAC, with a GPA of 3.31 on a seven-point scale, valid for five years from May 19, 2023.',
  },
];

// Examination Fee table applies identically across every programme
// (B.A, B.Com, M.A, M.Com, MBA, M.Sc) per the prospectus's Examination Fee
// page — one shared table rather than repeating identical values per file.
export const PROGRAMME_EXAM_FEES = [
  { label: '1 paper', value: '₹1,500' },
  { label: '2 papers', value: '₹2,000' },
  { label: '3 papers', value: '₹2,500' },
  { label: '4 or more papers / full fee', value: '₹3,000' },
];

export const PROGRAMME_EXAM_FEE_NOTE =
  'Examination fees are charged separately according to the applicable examination fee structure.';
