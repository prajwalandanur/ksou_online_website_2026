import { FacebookIcon, InstagramIcon } from '@/components/common/SocialIcons';
import { ACADEMIC_CALENDAR_URL, PROSPECTUS_URL } from './navigation';

/**
 * Real, official profiles — these stopped being placeholders on 2026-08-13.
 *
 * **Instagram is the KSOU Online account; Facebook is the parent
 * university's.** That asymmetry is intentional and comes from the supplied
 * links, not an oversight — don't "fix" it by inventing a KSOU Online
 * Facebook page.
 *
 * YouTube and LinkedIn were removed outright (icons deleted from
 * SocialIcons.jsx too): no accounts exist, and four icons where two are dead
 * placeholders reads worse than two that all work.
 *
 * The supplied URLs carried `utm_source=chatgpt.com` and an `igsh` share
 * token. Both are stripped — they are artefacts of how the links were
 * copied, and shipping them would attribute the site's own social traffic to
 * a chat session.
 */
export const FOOTER_SOCIAL_LINKS = [
  {
    label: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/ksou_online',
  },
  {
    label: 'Facebook',
    Icon: FacebookIcon,
    href: 'https://www.facebook.com/karnatakastateopenuniversitymysuru',
  },
];

// The parent university's own site — a real external destination, unlike the
// social placeholders above. Rendered as the footer's institutional identity
// card so KSOU Online reads as KSOU's online platform, not a separate brand.
export const KSOU_MAIN_WEBSITE_URL = 'https://www.ksoumysuru.ac.in/';

// Each link is either `{ to }` (client-side route) or `{ href }` (plain anchor,
// used for the two links that jump to an in-page section on the homepage).
export const FOOTER_LINK_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      // PDFs, matching the navbar — `/prospectus` and `/academic-planner`
      // are no longer registered routes.
      { label: 'Prospectus', href: PROSPECTUS_URL, newTab: true },
      { label: 'Academic Planner', href: ACADEMIC_CALENDAR_URL, newTab: true },
    ],
  },
  {
    // Deep links to each real programme page rather than the (still unbuilt)
    // /programmes listing — these are the site's most crawlable pages.
    title: 'Online Degrees',
    links: [
      { label: 'MBA', to: '/programmes/mba' },
      { label: 'M.Com', to: '/programmes/mcom' },
      { label: 'MA', to: '/programmes/ma' },
      { label: 'M.Sc Mathematics', to: '/programmes/msc-mathematics' },
      { label: 'BA', to: '/programmes/ba' },
      { label: 'B.Com', to: '/programmes/bcom' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', to: '/blogs' },
      { label: 'FAQs', href: '/#faq-heading' },
      { label: 'Student Support', to: '/student-support' },
      { label: 'Admissions', to: '/admissions' },
    ],
  },
];

// The fifth footer column. Its *values* (address, numbers, email) come from
// constants/contact.js and navigation.js — only the labels live here.
export const FOOTER_CONTACT_TITLE = 'Get in Touch';

export const FOOTER_CONTACT_LABELS = {
  helpline: 'General helpline',
};

export const FOOTER_COPYRIGHT = '© 2026 KSOU Online. All Rights Reserved.';
