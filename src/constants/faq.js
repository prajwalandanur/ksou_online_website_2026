/**
 * Homepage FAQs.
 *
 * These are worded to match how people actually search — "Is KSOU online
 * degree valid for government jobs?" rather than "Regarding degree
 * validity" — because this array is the single source for both the visible
 * accordion and the FAQPage JSON-LD (utils/schema.js), and rich results only
 * trigger when the question matches the query. Keep any new entry phrased as
 * the question a student would type.
 *
 * **Order is meaningful**: Faq.jsx shows only the first five until "Show
 * More" is pressed, so the five highest-volume queries lead.
 *
 * Every figure here is already sourced elsewhere in the repo — fees from
 * constants/programmes/*.js (themselves from the prospectus), recognition
 * wording from programmes/shared.js, and the ABC/DEB ID process from KSOU's
 * own public/documents/announcements/abc-deb-id-creation-process.pdf. Do not
 * add a fee, date, ranking or approval claim that isn't traceable to one of
 * those.
 */
export const FAQS = [
  {
    id: 'degree-validity',
    question: 'Is a KSOU online degree valid for government jobs?',
    answer:
      'Yes. KSOU is a state government university and its online programmes are UGC-entitled under the UGC ODL & OL Regulations, 2020. A degree earned through KSOU Online carries the same standing as one earned on campus, and is accepted for government job applications, public-sector recruitment and further higher education across India.',
  },
  {
    id: 'ugc-recognised',
    question: 'Is KSOU approved by UGC?',
    answer:
      "Yes. Karnataka State Open University's online programmes are presented as UGC-entitled under the UGC ODL & OL Regulations, 2020, and the MBA is additionally approved by AICTE. KSOU itself holds NAAC A+ accreditation with a GPA of 3.31 on a seven-point scale, valid for five years from May 19, 2023.",
  },
  {
    id: 'fees',
    question: 'What is the fee for KSOU online MBA, BA, B.Com and other programmes?',
    answer:
      'KSOU Online fees are among the lowest for a UGC-entitled degree in Karnataka. Total programme fees are: BA ₹30,000 (₹10,000/year for 3 years), B.Com ₹36,000 (₹12,000/year for 3 years), MA ₹30,000 (₹15,000/year for 2 years), M.Com ₹40,000 (₹20,000/year for 2 years), MBA ₹80,000 (₹40,000/year for 2 years) and M.Sc Mathematics ₹80,000 (₹40,000/year for 2 years). Examination fees are charged separately.',
  },
  {
    id: 'how-to-apply',
    question: 'How do I apply for KSOU online admission in 2026?',
    answer:
      'Applications for the July 2026 admission cycle are open. Choose your programme on this site and select "Apply Now", then fill in your personal and academic details, upload the required documents, and pay the admission fee to confirm your seat. You will also need an ABC ID and a DEB ID before your admission can be completed — both are free and created online. The whole process is completed online, without visiting the KSOU campus in Mysuru.',
  },
  {
    id: 'abc-deb-id',
    question: 'What is ABC ID and DEB ID, and do I need them for KSOU admission?',
    answer:
      'Yes, both are mandatory. The ABC ID (Academic Bank of Credits ID) is created free through DigiLocker at digilocker.gov.in and acts as a permanent academic identifier that stores your credits. The DEB ID (Distance Education Bureau ID) is then created from your ABC ID at deb.ugc.ac.in/StudentDEBId. UGC requires every learner taking admission to an online or distance programme to hold a DEB ID — it confirms you are joining a UGC-recognised institution and an approved programme. Create the ABC ID first, then the DEB ID, then complete your KSOU admission using it.',
  },
  {
    id: 'what-is-ksou-online',
    question: 'What is KSOU Online and is it a government university?',
    answer:
      'KSOU Online is the official online-learning initiative of Karnataka State Open University (KSOU), a government university based in Mysuru, Karnataka, established in 1996. It offers UGC-entitled online undergraduate and postgraduate degrees designed for working professionals and students who need flexible, affordable higher education.',
  },
  {
    id: 'programmes-offered',
    question: 'What online courses does KSOU offer?',
    answer:
      'KSOU Online offers two undergraduate programmes — Bachelor of Arts (BA) and Bachelor of Commerce (B.Com) — and four postgraduate programmes: Master of Arts (MA) in Kannada, English, Hindi, Sanskrit or Economics; Master of Commerce (M.Com); Master of Business Administration (MBA); and M.Sc in Mathematics.',
  },
  {
    id: 'eligibility',
    question: 'What is the eligibility for KSOU online admission?',
    answer:
      "Eligibility depends on the programme. The undergraduate programmes (BA, B.Com) require a Class 12 / PUC pass or equivalent. The postgraduate programmes (MA, M.Com, MBA, M.Sc Mathematics) require a bachelor's degree from a recognised university, with subject-specific criteria for some MA disciplines. There is no upper age limit.",
  },
  {
    id: 'outside-karnataka',
    question: 'Can I study at KSOU Online from outside Karnataka?',
    answer:
      'Yes. KSOU Online programmes are delivered entirely online, so you can study from anywhere in India without relocating to Karnataka. Learning, study material and assignments are accessed through the KSOU Online LMS.',
  },
  {
    id: 'two-degrees',
    question: 'Can I do two degrees at the same time from KSOU?',
    answer:
      'Yes. UGC permits a student to pursue two academic programmes simultaneously, and KSOU allows this — for example one degree in online mode alongside another. You must meet the eligibility criteria for each programme and complete the admission requirements, including fee payment, separately for both.',
  },
  {
    id: 'study-while-working',
    question: 'Can I do a KSOU online degree while working full-time?',
    answer:
      'Yes. KSOU Online programmes are built for working professionals. Learning is self-paced through the online LMS with recorded lectures and digital study material, so there are no fixed class timings and no physical attendance requirement.',
  },
  {
    id: 'how-learning-works',
    question: 'How does online learning work at KSOU?',
    answer:
      'After admission you receive access to the KSOU Online Learning Management System (LMS), where lectures, e-study material and assignments are available anytime. You progress at your own pace and engage with faculty through the digital platform.',
  },
  {
    id: 'examinations',
    question: 'What is the KSOU online exam pattern and how are exams conducted?',
    answer:
      "Examinations follow the university's official academic calendar and prescribed evaluation process, with schedules communicated in advance through the LMS. Programmes are structured semester-wise, and examination fees are charged separately from the programme fee — ₹1,500 for one paper, ₹2,000 for two, ₹2,500 for three, and ₹3,000 for four or more papers.",
  },
  {
    id: 'duration',
    question: 'How long does a KSOU online degree take to complete?',
    answer:
      'The undergraduate programmes (BA and B.Com) run for 3 years across 6 semesters. The postgraduate programmes (MA, M.Com, MBA and M.Sc Mathematics) run for 2 years across 4 semesters.',
  },
  {
    id: 'documents',
    question: 'What documents are required for KSOU online admission?',
    answer:
      'You will need your academic marks cards and certificates for the qualifying examination, a photo identity document, and your ABC ID and DEB ID. Documents are uploaded during the online application and verified as part of the admission process.',
  },
  {
    id: 'previous-question-papers',
    question: 'Where can I find KSOU previous year question papers?',
    answer:
      'Previous question papers for each programme are published on this site — open the programme you are interested in from the Courses section and use the "Previous QPs" link on its card. Papers for MA are published separately for each discipline.',
  },
];
