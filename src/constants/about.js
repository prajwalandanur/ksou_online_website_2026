import {
  Award,
  BookOpenText,
  GraduationCap,
  Landmark,
  LifeBuoy,
  Library,
  MonitorSmartphone,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { APPLY_NOW_URL } from '@/constants/navigation';
// Official portrait, supplied 2026-08-21 and re-encoded from a 500x614 JPEG.
// Kept at its native 500px: the frame renders ~518 CSS px, so it is already
// ~1:1, and upscaling a source this size only adds blur and bytes. `public/
// vc-portrait.webp` is the same image again for the JSON-LD `image` field —
// schema needs a stable absolute URL and bundled assets get hashed names.
// **Replace both together** if a higher-resolution photograph arrives.
import vcPortrait from '@/assets/about/vc-portrait.webp';

/**
 * ── SOURCING RULES FOR THIS FILE ────────────────────────────────────────
 *
 * This page names a real, serving public official and describes a
 * government university. Two categories of claim live here and they have
 * different rules:
 *
 * 1. **Biographical claims about Prof. A. P. Gnana Prakash.** Every one was
 *    checked against a primary source before publication (see
 *    `LEADERSHIP_SOURCES` below for the exact references). Do not add a
 *    role, date, institution or award that isn't in one of them.
 *
 * 2. **Directional / positioning copy** ("KSOU Online is strengthening…",
 *    "renewed attention on…"). This is deliberately written as institutional
 *    direction, not as personal authorship. The source brief is explicit on
 *    this and it is also the honest reading of the evidence: there is no
 *    document attributing the website, the LMS or any individual programme
 *    to the Vice-Chancellor personally. **Never rewrite these into "he
 *    launched / he built / he introduced".**
 *
 * Institutional figures (NAAC A+, NIRF, 115K+ graduates) come from the same
 * official material the rest of the site already cites, and historical
 * credentials are presented as the foundation the current phase builds on —
 * never as achievements of this tenure.
 *
 * Two claims from the source brief were **removed, not softened**: that he
 * served as "Director of Outreach Programmes" and as "Director of the
 * Institute of Excellence". Neither appears in his official University of
 * Mysore bio-data, on the KSOU site, or in any appointment coverage found.
 * If a document turns up, add a step back to `journey` — don't restore them
 * from memory.
 */

/**
 * The primary sources every biographical line below was checked against.
 * Kept in code (rather than in a commit message) so the next person editing
 * this file can re-verify without redoing the research.
 */
export const LEADERSHIP_SOURCES = [
  // Official University of Mysore bio-data (Dec 2020). Confirms: M.Sc.,
  // M.Phil., Ph.D.; Professor, DOS in Physics, University of Mysore (2013–);
  // Registrar (Evaluation) from 23-12-2020; Post Doctoral Fellow, National
  // Dong Hwa University, Hualien, Taiwan (Feb 2003–Jul 2004); Post Doctoral
  // Fellow, School of Electrical & Computer Engineering, Georgia Institute
  // of Technology, Atlanta (Aug 2004–Jul 2006).
  'https://uni-mysore.ac.in/sites/default/files/content/prof._a._p._gnana_prakash-dec_2020.pdf',
  // Appointment coverage. Confirms: appointed Vice-Chancellor of KSOU (June
  // 2026), previously Chairman of the Department of Studies in Physics and
  // Registrar at the University of Mysore, member and co-ordinator of NAAC
  // peer teams, three-year term.
  'https://starofmysore.com/ksou-gets-new-vc/',
  // KSOU's own site — institutional facts (1969 ICC&CE roots, 1992 Act,
  // 1 June 1996, the "Higher Education for Everyone, Everywhere" motto).
  'https://www.ksoumysuru.ac.in/',
];

export const VICE_CHANCELLOR = {
  name: 'Prof. A. P. Gnana Prakash',
  designation: 'Vice-Chancellor',
  institution: 'Karnataka State Open University',
};

/* ── 01 · HERO ─────────────────────────────────────────────────────────── */

export const ABOUT_HERO = {
  eyebrow: 'About KSOU Online',
  heading: 'A New Direction for Online Education.',
  body: [
    'Karnataka State Open University has a long-standing mission of making higher education more accessible.',
    'As the needs of learners evolve, KSOU Online is entering a new phase — strengthening digital education, learner support, technology and the overall student experience.',
  ],
  motto: 'Higher Education for Everyone, Everywhere.',
  /**
   * A leadership cue, not a profile. The portrait is deliberately held back
   * until section 02 so the first screen reads as institutional.
   *
   * Split into four parts rather than one sentence because English and
   * Kannada put the name in different places. English leads with the phrase
   * ("Under the leadership of **Name**"); Kannada puts the name first and the
   * phrase after it ("**ಹೆಸರು** ಅವರ ನೇತೃತ್ವದಲ್ಲಿ"). `nameSuffix` is what lets
   * the Kannada file move the phrase across without the component knowing —
   * it is empty in English and carries the whole phrase in Kannada.
   */
  leadershipCue: {
    prefix: 'Under the leadership of',
    name: VICE_CHANCELLOR.name,
    nameSuffix: '',
    suffix: `${VICE_CHANCELLOR.designation}, ${VICE_CHANCELLOR.institution}`,
  },
  imageAlt:
    'The Karnataka State Open University campus building in Mysuru, with the KSOU lettering on the lawn',
};

/* ── 02 · LEADERSHIP FEATURE ───────────────────────────────────────────── */

export const ABOUT_LEADERSHIP = {
  eyebrow: 'Leadership',
  heading: 'Meet the Academic Leader Behind KSOU’s Next Chapter',

  /**
   * The official portrait, supplied 2026-08-21. `ProfilePortrait` falls back
   * to an editorial reserved slot if this is ever null again. Do **not**
   * substitute a stock photograph or a likeness from elsewhere — this is a
   * real, serving public official.
   *
   * The source is 500x614 (ratio 0.814) against the frame's 4:5 (0.800), so
   * `object-cover` trims under 2% from the sides and the subject is never
   * cropped. Swapping in a photograph of a very different ratio means
   * re-checking that.
   */
  portrait: vcPortrait,
  portraitAlt: `Official portrait of ${VICE_CHANCELLOR.name}, ${VICE_CHANCELLOR.designation} of ${VICE_CHANCELLOR.institution}`,
  portraitLabel: 'Official portrait',

  name: VICE_CHANCELLOR.name,
  designation: [VICE_CHANCELLOR.designation, VICE_CHANCELLOR.institution],

  intro: [
    'Prof. A. P. Gnana Prakash brings to Karnataka State Open University an academic career shaped by teaching, research, institutional administration and educational outreach.',
    'His appointment comes at a significant stage in the university’s evolution, as KSOU continues to expand its online education ecosystem and strengthen the digital experience surrounding its learners.',
  ],

  journeyHeading: 'Academic & Administrative Journey',
  /**
   * Every entry is documented — see LEADERSHIP_SOURCES. The brief's fourth
   * step ("Director of Outreach Programmes / Institute of Excellence") was
   * replaced with academic service that is actually evidenced, rather than
   * published unverified. Wording stays factual: positions held, not
   * outcomes claimed.
   */
  journey: [
    {
      id: 'academia',
      era: 'Academia',
      title: 'Professor of Physics',
      body: 'A career rooted in higher education, teaching and academic research at the University of Mysore, where he went on to chair the Department of Studies in Physics.',
    },
    {
      id: 'research',
      era: 'Research',
      title: 'International Research Experience',
      body: 'Postdoctoral research at the National Dong Hwa University in Taiwan and at the Georgia Institute of Technology in the United States.',
    },
    {
      id: 'administration',
      era: 'Academic Administration',
      title: 'University of Mysore',
      body: 'Experience in academic and institutional administration, including service as Registrar (Evaluation).',
    },
    {
      id: 'service',
      era: 'Academic Service',
      title: 'Quality Assurance & Assessment',
      body: 'Service on academic assessment and quality-assurance bodies, including as a member and co-ordinator of NAAC peer teams.',
    },
    {
      id: 'ksou',
      era: 'KSOU',
      title: 'Vice-Chancellor',
      body: 'Leading Karnataka State Open University during its next phase of digital and institutional development.',
    },
  ],

  profileHeading: 'Academic Depth. Administrative Experience. Institutional Vision.',
  profile: [
    'The combination of academic experience, research exposure and university administration provides a distinctive foundation for leading an institution whose core purpose is expanding access to higher education.',
    'At KSOU, this experience is being brought into an environment where traditional open learning increasingly intersects with digital platforms, online programmes, learner support and technology-enabled education.',
    'The result is a leadership story that is not only about expanding programmes, but about strengthening the systems around the learner.',
  ],
};

/* ── 03 · THE LEADERSHIP VISION ────────────────────────────────────────── */

export const ABOUT_VISION = {
  eyebrow: 'The Vision',
  heading: 'Beyond Putting Education Online',
  intro: [
    'Online education is not simply about moving a classroom onto a screen.',
    'It requires an ecosystem that makes it easier for learners to discover programmes, understand their options, access academic resources, receive support and remain connected to their university.',
    'The current direction at KSOU places renewed attention on this wider learner experience.',
  ],
  priorities: [
    {
      id: 'access',
      title: 'Access',
      body: 'Making higher education available to learners whose professional, personal or geographical circumstances may make conventional campus education difficult.',
    },
    {
      id: 'digital',
      title: 'Digital Education',
      body: 'Strengthening online programmes and digital learning resources as an important part of KSOU’s evolving educational ecosystem.',
    },
    {
      id: 'experience',
      title: 'Student Experience',
      body: 'Looking beyond the programme itself to the resources, technology and support systems surrounding the learner.',
    },
    {
      id: 'quality',
      title: 'Quality & Accountability',
      body: 'Emphasising quality, transparency, institutional responsibility and adherence to applicable regulatory requirements.',
    },
  ],
  /**
   * Editorial positioning, NOT a quotation. It carries no quote marks and no
   * attribution line for exactly that reason — the Vice-Chancellor has not
   * been quoted saying this, and setting it in quotes would invent a
   * statement. If a real quote is ever supplied, add it as its own field
   * with an attribution rather than dressing this one up.
   */
  statement: ['The goal is not simply to take education online.', 'It is to make the entire learning journey more connected.'],
};

/* ── 04 · FROM VISION TO DIGITAL EXPERIENCE ────────────────────────────── */

export const ABOUT_DIGITAL = {
  eyebrow: 'The Digital Evolution',
  heading: 'Turning Direction Into Experience',
  intro: [
    'A university’s digital transformation is visible not only in the programmes it offers, but in the way students experience the institution.',
    'From discovering a course to accessing learning resources, the digital journey increasingly becomes part of the educational journey itself.',
    'KSOU Online is strengthening this experience through its online programmes, digital academic resources, learner-support systems and evolving web platform.',
  ],

  websiteHeading: 'A New Digital Front Door for KSOU Online',
  websiteBody: [
    'The new KSOU Online website is being developed as a more modern digital gateway to the university’s online education ecosystem.',
  ],
  websiteLead: 'It is designed to help learners:',
  capabilities: [
    { id: 'discover', title: 'Discover', body: 'Find programmes and areas of study.' },
    { id: 'understand', title: 'Understand', body: 'Access clearer information about their academic options.' },
    { id: 'explore', title: 'Explore', body: 'Navigate the university’s online education ecosystem.' },
    { id: 'connect', title: 'Connect', body: 'Move more naturally towards enquiry, counselling and admission.' },
  ],

  /**
   * Phrased as institutional direction on purpose. There is no document
   * attributing this website to the Vice-Chancellor personally, so it is
   * placed within the university's current leadership phase rather than
   * credited to an individual. See the sourcing rules at the top of this file.
   */
  leadershipConnection:
    'The new digital platform forms part of the wider technology and online-education direction being pursued during the university’s current leadership phase.',

  // Desktop only — the phone frame that sat alongside this was removed on
  // 2026-08-21, along with its capture and that capture's entry in
  // scripts/generate-site-screenshots.mjs.
  desktopAlt: 'The new KSOU Online website shown on a desktop screen',
};

/* ── 05 · ONLINE EDUCATION AT KSOU ─────────────────────────────────────── */

export const ABOUT_ECOSYSTEM = {
  eyebrow: 'KSOU Online',
  heading: 'An Expanding Digital Learning Ecosystem',
  intro: [
    'KSOU Online brings the university’s open-learning philosophy into a digital environment designed for today’s learners.',
    'The ecosystem extends beyond individual programmes to include digital academic resources, online learning content, e-library access, technology platforms and learner-support infrastructure.',
  ],

  hub: 'KSOU Online',
  /**
   * Six nodes, rendered on a ring at `lg` and as a plain grid below it.
   * `EcosystemDiagram` positions them by index, so the order here is the
   * order around the ring — adding a seventh means re-deriving the angles.
   */
  nodes: [
    { id: 'programmes', label: 'Online Programmes', Icon: GraduationCap },
    { id: 'platform', label: 'Digital Academic Platform', Icon: MonitorSmartphone },
    { id: 'library', label: 'E-Library', Icon: Library },
    { id: 'content', label: 'Digital Learning Content', Icon: BookOpenText },
    { id: 'support', label: 'Student Support', Icon: LifeBuoy },
    { id: 'website', label: 'New Website', Icon: Landmark },
  ],

  programmesHeading: 'Learning That Fits Around Life',
  programmesBody:
    'Whether a learner is working, managing family responsibilities, living away from a traditional campus or looking to continue their education after a break, online learning can provide a more flexible route to academic progression.',
  /**
   * A preview, not a second Courses page — names only, no fees, durations or
   * eligibility. Those live on `/programmes` and the six detail pages, and
   * restating them here is how two pages end up disagreeing about a fee.
   */
  programmeGroups: [
    { id: 'ug', label: 'Undergraduate', names: ['BA', 'B.Com'] },
    { id: 'pg', label: 'Postgraduate', names: ['MA', 'M.Com', 'M.Sc'] },
    { id: 'professional', label: 'Professional', names: ['MBA'] },
  ],
  programmesCta: 'Explore All Online Programmes',

  foundationHeading: 'Building on a Strong Institutional Foundation',
  /**
   * Verified credentials only. NCVET recognition is named as a possibility in
   * the source brief but has no supporting reference anywhere in this
   * project, so it is deliberately absent — add it only with a citation.
   *
   * The UGC panel states no recognition *period*: entitlement applies per
   * programme and academic session, and publishing a window that may have
   * lapsed is worse than linking to the official source. This matches the
   * wording the programme pages already use.
   */
  foundation: [
    {
      id: 'naac',
      credential: 'NAAC A+',
      Icon: Award,
      body: 'Accredited with an A+ grade, at a GPA of 3.31 on a seven-point scale.',
    },
    {
      id: 'nirf',
      credential: 'NIRF 2025',
      Icon: Trophy,
      body: 'Ranked 2nd among Open Universities in the Ministry of Education’s NIRF 2025 rankings.',
    },
    {
      id: 'ugc',
      credential: 'UGC Entitled',
      Icon: ShieldCheck,
      body: 'Online programmes offered under the UGC ODL & OL Regulations, 2020. Entitlement applies per programme and session — confirm the current status on the official university website.',
      linkLabel: 'Official university website',
    },
    {
      id: 'state',
      credential: 'State Public University',
      Icon: Landmark,
      body: 'Established under the Karnataka State Open University Act and brought into force on 1 June 1996, with roots reaching back to 1969.',
    },
  ],
  /**
   * The sentence that keeps the credibility strip honest: these credentials
   * predate the current tenure and are presented as its foundation, never as
   * its achievements.
   */
  foundationNote:
    'KSOU’s established institutional credentials provide the foundation on which its current leadership continues to build.',
};

/* ── 06 · THE ROAD AHEAD ───────────────────────────────────────────────── */

export const ABOUT_ROAD_AHEAD = {
  eyebrow: 'The Next Chapter',
  heading: 'A University Moving With Its Learners',
  body: [
    'The future of open and online education will depend not only on access to programmes, but on the quality of the experience surrounding them.',
    'For KSOU, the next phase brings together a long-standing commitment to accessible education with a stronger emphasis on digital learning, technology, student support and institutional quality.',
  ],
  // Rendered with the name emphasised; kept as three pieces so the component
  // never has to parse a sentence to find it.
  leadershipLine: {
    prefix: 'Under the leadership of',
    name: VICE_CHANCELLOR.name,
    suffix: ', this evolving direction places the learner at the centre of the university’s digital journey.',
  },
  objectiveLead: 'The objective is clear:',
  objectives: [
    'Make higher education more accessible.',
    'Make learning more connected.',
    'Make the digital experience easier to navigate.',
  ],

  /**
   * The brief asks for a second, different photograph of the Vice-Chancellor
   * here (or a campus image with a subtle portrait overlay). Only the campus
   * image exists today, so the section runs campus-only and renders the
   * overlay the moment a second photograph is set. A dashed placeholder is
   * deliberately NOT used on this dark closing panel — it would read as a
   * broken image rather than as a reserved slot.
   */
  portrait: null,
  portraitAlt: `${VICE_CHANCELLOR.name}, ${VICE_CHANCELLOR.designation} of ${VICE_CHANCELLOR.institution}`,

  closingHeading: 'Higher Education for Everyone, Everywhere.',
  closingBody: 'Explore KSOU Online and discover a flexible path to continue your education.',
  primaryCta: { label: 'Explore Programmes', to: '/programmes' },
  // "Talk to a Counsellor" is deliberately absent: MainLayout appends the
  // global counsellor CTA immediately below this section, so adding it here
  // would put the same action on screen twice.
  secondaryCta: { label: 'Apply Now', to: APPLY_NOW_URL },
};

/**
 * 50-character title, 152-character description — inside the ~60/~155 Google
 * renders, the same budget the programme pages were rewritten to. The first
 * draft ran to 170 and lost "NAAC A+ quality" off the end, which is the half
 * a prospective student is scanning for.
 */
export const ABOUT_SEO = {
  title: 'About KSOU Online — Leadership & Digital Direction',
  description:
    'Karnataka State Open University’s next chapter under Vice-Chancellor Prof. A. P. Gnana Prakash — digital education, learner support and NAAC A+ quality.',
};

/**
 * The whole page as one object, registered in `src/i18n/content.js` so the
 * About sections read it through `useContent()` and `/kn/about` renders the
 * Kannada mirror in `src/locales/kn/about.js`.
 *
 * The individual exports above stay — they are the same object references, so
 * the two views cannot drift — and they remain the readable place to keep the
 * sourcing rules that govern this page.
 */
export const ABOUT = {
  vc: VICE_CHANCELLOR,
  hero: ABOUT_HERO,
  leadership: ABOUT_LEADERSHIP,
  vision: ABOUT_VISION,
  digital: ABOUT_DIGITAL,
  ecosystem: ABOUT_ECOSYSTEM,
  roadAhead: ABOUT_ROAD_AHEAD,
  seo: ABOUT_SEO,
};
