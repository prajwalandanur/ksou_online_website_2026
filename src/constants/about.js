import { Award, Landmark, ShieldCheck } from 'lucide-react';

/**
 * Every figure and claim below comes from the source brief
 * (`KSOU Online — Build a Dedicated Abo.md`), which cites KSOU's own site
 * and official material. **Do not invent additional statistics**, and do
 * not "round up" these — if an official source is updated, change the
 * value here rather than restating it inline anywhere.
 *
 * One deliberate omission: the brief warns against publishing a UGC
 * recognition *period* without checking current applicability, so the
 * recognition panel states the entitlement in the same conservative terms
 * the programme pages already use and links to KSOU's official site
 * instead of naming dates that may have lapsed.
 */

export const ABOUT_HERO = {
  eyebrow: 'About KSOU',
  heading: 'Higher Education for Everyone, Everywhere.',
  body: 'For decades, Karnataka State Open University has worked to make higher education accessible beyond the boundaries of the conventional classroom. From its roots in correspondence education to today’s online learning environment, KSOU continues to expand opportunities for learners across different circumstances and locations.',
  imageAlt:
    'The Karnataka State Open University campus building in Mysuru, with the KSOU lettering on the lawn',
};

export const ABOUT_LEGACY = {
  heading: 'A Legacy Measured in People, Programmes and Possibility.',
  // Four peers, not one hero figure plus three footnotes — every entry
  // carries a description so none reads as an afterthought.
  stats: [
    {
      value: '115K+',
      label: 'Graduated Students',
      body: 'Learners who have completed their academic journey with KSOU.',
    },
    {
      value: '120+',
      label: 'Degree Programmes',
      body: 'Spanning humanities, social sciences, science, commerce and management.',
    },
    {
      value: '85+',
      label: 'KSOU Faculties',
      body: 'Academic communities supporting teaching, assessment and student guidance.',
    },
    {
      value: 'A+',
      label: 'NAAC Accreditation',
      body: 'Awarded with a GPA of 3.31 on a seven-point scale.',
    },
  ],
};

export const ABOUT_STORY = {
  heading: 'From Open Learning to a Digital Future.',
  intro:
    'KSOU was established as a State Public University under the Karnataka State Open University Act, brought into force on 1 June 1996. Its roots reach back to the correspondence and continuing-education system associated with the University of Mysore.',
  milestones: [
    {
      year: '1969',
      title: 'The Roots',
      body: 'The university’s institutional roots can be traced to the Institute of Correspondence Courses and Continuing Education under the University of Mysore.',
    },
    {
      year: '1992',
      title: 'The Act',
      body: 'The Karnataka State Open University Act established the legislative framework for the university.',
    },
    {
      year: '1996',
      title: 'KSOU',
      body: 'KSOU came into force as a full-fledged university on 1 June 1996.',
    },
    {
      year: 'Today',
      title: 'Online Education',
      body: 'KSOU continues its open-learning mission through digital and online education, extending access beyond conventional campus learning.',
    },
  ],
};

export const ABOUT_VALUES = {
  heading: 'Education Shouldn’t Stop Because Life Gets Busy.',
  // Two symmetrical blocks: oversized words on the left, the copy that
  // explains them on the right. Both carry body text — an earlier version
  // gave the second block none, which left half the row visibly empty.
  blocks: [
    {
      id: 'access',
      words: ['Access.', 'Equity.', 'Quality.'],
      body: [
        'KSOU was created to extend higher education to learners who may not be able to follow a conventional campus-based path.',
        'Its open-learning approach has supported working professionals, learners from different backgrounds, and people whose personal or geographical circumstances make traditional education difficult.',
      ],
    },
    {
      id: 'affordability',
      words: ['Affordability.', 'Accountability.'],
      body: [
        'Affordability is part of the mandate rather than an afterthought. Programme fees are published openly and in full, so learners can weigh the real cost of a qualification before committing to it.',
        'Accountability is what holds the rest together: curricula, credits and examinations are prescribed and published, and the university’s academic standards are subject to external review — reflected in its NAAC A+ accreditation.',
      ],
    },
  ],
  note: 'KSOU’s official material identifies these as core institutional objectives.',
};

export const ABOUT_ONLINE_TODAY = {
  heading: 'Today, Learning Can Travel With You.',
  subtitle:
    'KSOU brings its long-standing commitment to accessible higher education into a flexible online learning environment.',
  body: 'With KSOU Online, learners can access structured academic programmes, digital learning resources and online support designed to fit around work, location and everyday responsibilities. It brings the university’s open-learning philosophy into a more connected digital experience.',
  stats: [
    { value: '30+', label: 'Years of Excellence' },
    { value: '1,000+', label: 'Video Lectures' },
    { value: '82K+', label: 'Hours of Support' },
    { value: '10+', label: 'Online Programmes' },
  ],
};

export const ABOUT_CREDIBILITY = {
  heading: 'A University Built on Academic Credibility',
  panels: [
    {
      id: 'naac',
      credential: 'NAAC A+',
      Icon: Award,
      body: 'KSOU’s official university material states that the university received NAAC A+ accreditation, with a GPA of 3.31 on a seven-point scale.',
    },
    {
      id: 'state',
      credential: 'State Public University',
      Icon: Landmark,
      body: 'KSOU is a State Public University, established under the Karnataka State Open University Act and brought into force on 1 June 1996.',
    },
    {
      id: 'ugc',
      credential: 'UGC Entitled',
      Icon: ShieldCheck,
      body: 'KSOU’s online programmes are presented as UGC-entitled under the UGC ODL & OL Regulations, 2020. Recognition applies per programme and academic session — always confirm the current status on the official university website.',
      // Deliberately no recognition period stated here; see the file note.
      linkLabel: 'Official university website',
    },
  ],
};

export const ABOUT_COMMUNITY = {
  heading: 'An Academic Community Built to Support Learning',
  anchor: { value: '85+', label: 'KSOU Faculties' },
  body: 'Across its schools and departments, KSOU brings together academic communities spanning disciplines including humanities, social sciences, science, commerce and management.',
  // No named faculty profiles — none have been supplied, and inventing them
  // would misrepresent real people.
  disciplines: [
    'Humanities',
    'Social Sciences',
    'Science',
    'Commerce',
    'Management',
    'Education',
    'Languages',
  ],
};

export const ABOUT_PROMISE = {
  heading: 'Higher Education for Everyone, Everywhere.',
  body: 'From correspondence education to online learning, KSOU’s journey has always been about extending the reach of higher education. The technology may change. The purpose remains the same.',
};

export const ABOUT_SEO = {
  title: 'About KSOU — Karnataka State Open University | KSOU Online',
  description:
    'Karnataka State Open University: established 1996, NAAC A+ accredited, 115K+ graduated students and 120+ degree programmes. Higher education for everyone, everywhere.',
};
