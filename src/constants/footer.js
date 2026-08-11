import { FacebookIcon, InstagramIcon } from '@/components/common/SocialIcons';

// No official KSOU Online social handles have been supplied yet — these are
// styled placeholders (see FOOTER_SOCIAL_LINKS usage) until real profiles exist.
export const FOOTER_SOCIAL_LINKS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
];

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
    title: 'Online Degrees',
    links: [
      { label: 'MBA', to: '/programmes' },
      { label: 'M.Com', to: '/programmes' },
      { label: 'MA', to: '/programmes' },
      { label: 'M.Sc Mathematics', to: '/programmes' },
      { label: 'BA', to: '/programmes' },
      { label: 'B.Com', to: '/programmes' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', href: '/#blog-heading' },
      { label: 'FAQs', href: '/#faq-heading' },
      { label: 'Student Support', to: '/student-support' },
      { label: 'Admissions', to: '/admissions' },
    ],
  },
];

export const FOOTER_COPYRIGHT = '© 2026 KSOU Online. All Rights Reserved.';
