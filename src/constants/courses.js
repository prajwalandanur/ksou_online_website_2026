import {
  BookOpen,
  Briefcase,
  Calculator,
  Languages,
  Sigma,
  TrendingUp,
} from 'lucide-react';
// WebP, generated from the .png sources by scripts/optimize-images.mjs
// (11.5MB of PNG -> 519KB). The PNGs are kept in the same folder as the
// originals to re-encode from; only these .webp files are imported, so only
// these are bundled. Re-run that script after replacing any photograph.
import mbaImage from '@/assets/courses/mba.webp';
import baImage from '@/assets/courses/ba.webp';
import bcomImage from '@/assets/courses/bcom.webp';
import maImage from '@/assets/courses/ma.webp';
import mcomImage from '@/assets/courses/mcom.webp';
import mscImage from '@/assets/courses/msc.webp';

// `questionPapers` holds the real previous-question-paper PDFs, served from
// public/question-papers/ (static files, not bundled — they're documents to
// download, and several are 1–3 MB). Always an array: most programmes have a
// single combined paper, MA's are split per discipline, so the card renders
// one download button or a short picker off the same field.
//
// Sourced from KSOU_Online_Programmes_Prospectus.pdf — do not invent programmes.
//
// `name` stays the full formal degree title: it is the card's heading and the
// stretched link's text, and it is what the prospectus calls the programme.
// `description` is where the searched form of the name lives ("KSOU Online
// MBA"), because that phrase is what people type and the formal title alone
// carries no ranking power. Fee and duration are deliberately NOT repeated in
// the description — the card renders both as labelled rows immediately below
// it, so the text is already crawlable there and repeating it reads as
// duplicated copy. "UGC-entitled" is the prospectus's own wording; the
// "UGC approved" phrasing people search for is carried by the hero H1 and the
// homepage FAQ instead of overstating the credential here.
// `searchTerms` are the abbreviations and synonyms people type that the formal
// degree title does not contain — "MBA" is nowhere inside "Master of Business
// Administration", and an Indian student looking for M.Sc Mathematics types
// "maths". They exist for the enquiry form's programme combobox and are search
// keys only: nothing renders them, and they state no fact about the programme
// beyond the name it already carries. They stay in Latin script in both
// languages, like every other degree abbreviation on the site.
export const UG_COURSES = [
  {
    id: 'ba',
    searchTerms: ['BA', 'B.A.', 'Arts'],
    name: 'Bachelor of Arts',
    description:
      'KSOU Online BA — a UGC-entitled arts degree with History, Economics and Political Science.',
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
    searchTerms: ['B.Com', 'BCom', 'Commerce'],
    name: 'Bachelor of Commerce',
    description:
      'KSOU Online B.Com — a UGC-entitled commerce degree covering accounting, finance and business law.',
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
    searchTerms: ['M.Com', 'MCom', 'Commerce'],
    name: 'Master of Commerce',
    description:
      'KSOU Online M.Com — a UGC-entitled postgraduate degree in commerce, finance and business policy.',
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
    searchTerms: ['MA', 'M.A.', 'Arts'],
    name: 'Master of Arts',
    description:
      'KSOU Online MA — a UGC-entitled postgraduate arts degree in Kannada, English, Hindi, Sanskrit or Economics.',
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
    searchTerms: ['MBA', 'Management', 'Business'],
    name: 'Master of Business Administration',
    description:
      'KSOU Online MBA — a UGC-entitled, AICTE-approved online MBA for leadership and management roles.',
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
    searchTerms: ['M.Sc', 'MSc', 'Maths', 'Mathematics'],
    name: 'Master of Science – Mathematics',
    description:
      'KSOU Online M.Sc Mathematics — a UGC-entitled postgraduate degree for analytical and research careers.',
    duration: '4 Semesters',
    eligibility: "Bachelor's degree (any recognized university)",
    fee: '₹40,000',
    Icon: Sigma,
    image: mscImage,
    detailPath: '/programmes/msc-mathematics',
    questionPapers: [{ href: '/question-papers/msc-mathematics.pdf' }],
  },
];
