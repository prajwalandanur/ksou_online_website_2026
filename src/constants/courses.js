import {
  BookOpen,
  Briefcase,
  Calculator,
  Languages,
  Sigma,
  TrendingUp,
} from 'lucide-react';
import mbaImage from '@/assets/courses/mba.png';
import baImage from '@/assets/courses/ba.png';
import bcomImage from '@/assets/courses/bcom.png';
import maImage from '@/assets/courses/ma.png';
import mcomImage from '@/assets/courses/mcom.png';
import mscImage from '@/assets/courses/msc.png';

// `questionPapers` holds the real previous-question-paper PDFs, served from
// public/question-papers/ (static files, not bundled — they're documents to
// download, and several are 1–3 MB). Always an array: most programmes have a
// single combined paper, MA's are split per discipline, so the card renders
// one download button or a short picker off the same field.
//
// Sourced from KSOU_Online_Programmes_Prospectus.pdf — do not invent programmes.
export const UG_COURSES = [
  {
    id: 'ba',
    name: 'Bachelor of Arts',
    description:
      'Choose from History, Economics, and Political Science with two languages of your choice.',
    duration: '3 Years',
    eligibility: '10+2 / PUC or equivalent',
    fee: '₹10,000',
    Icon: BookOpen,
    image: baImage,
    detailPath: '/programmes/ba',
    questionPapers: [{ href: '/question-papers/ba.pdf' }],
  },
  {
    id: 'bcom',
    name: 'Bachelor of Commerce',
    description: 'Build a strong foundation in accounting, finance, and business law.',
    duration: '3 Years',
    eligibility: '10+2 / PUC or equivalent',
    fee: '₹12,000',
    Icon: Briefcase,
    image: bcomImage,
    detailPath: '/programmes/bcom',
    questionPapers: [{ href: '/question-papers/bcom.pdf' }],
  },
];

export const PG_COURSES = [
  {
    id: 'mcom',
    name: 'Master of Commerce',
    description: 'Deepen your expertise in commerce, finance, and business policy.',
    duration: '4 Semesters',
    eligibility: 'B.Com / BBM / BBA graduates',
    fee: '₹20,000',
    Icon: Calculator,
    image: mcomImage,
    detailPath: '/programmes/mcom',
    questionPapers: [{ href: '/question-papers/mcom.pdf' }],
  },
  {
    id: 'ma',
    name: 'Master of Arts',
    description:
      'Choose from M.A. programmes in Kannada, English, Hindi, Sanskrit, and Economics.',
    specializations: ['Kannada', 'English', 'Hindi', 'Sanskrit', 'Economics'],
    duration: '4 Semesters',
    eligibility: "Bachelor's degree (subject-specific eligibility varies by specialization)",
    fee: '₹15,000',
    Icon: Languages,
    image: maImage,
    detailPath: '/programmes/ma',
    questionPapers: [
      { label: 'Kannada', href: '/question-papers/ma-kannada.pdf' },
      { label: 'English', href: '/question-papers/ma-english.pdf' },
      { label: 'Hindi', href: '/question-papers/ma-hindi.pdf' },
      { label: 'Sanskrit', href: '/question-papers/ma-sanskrit.pdf' },
      // No Economics paper has been supplied — deliberately absent rather
      // than pointed at another discipline's file.
    ],
  },
  {
    id: 'mba',
    name: 'Master of Business Administration',
    description: 'Advance into leadership and management roles with a UGC-approved online MBA.',
    duration: '4 Semesters',
    eligibility: "Bachelor's degree (any stream)",
    fee: '₹40,000',
    Icon: TrendingUp,
    image: mbaImage,
    detailPath: '/programmes/mba',
    questionPapers: [{ href: '/question-papers/mba.pdf' }],
  },
  {
    id: 'msc-mathematics',
    name: 'Master of Science – Mathematics',
    description: 'Postgraduate study in advanced mathematics for analytical and research careers.',
    duration: '4 Semesters',
    eligibility: "Bachelor's degree (any recognized university)",
    fee: '₹40,000',
    Icon: Sigma,
    image: mscImage,
    detailPath: '/programmes/msc-mathematics',
    questionPapers: [{ href: '/question-papers/msc-mathematics.pdf' }],
  },
];
