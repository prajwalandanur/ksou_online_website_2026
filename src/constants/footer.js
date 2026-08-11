import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/common/SocialIcons';

// No official KSOU Online social handles have been supplied yet — these are
// styled placeholders (see FOOTER_SOCIAL_LINKS usage) until real profiles exist.
export const FOOTER_SOCIAL_LINKS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
  { label: 'LinkedIn', Icon: LinkedinIcon },
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
      { label: 'Prospectus', to: '/prospectus' },
      { label: 'Academic Planner', to: '/academic-planner' },
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

export const FOOTER_COPYRIGHT = '© 2026 KSOU Online. All Rights Reserved.';
