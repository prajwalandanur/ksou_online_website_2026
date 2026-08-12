import { Hero } from '@/components/sections/Hero/Hero';
import { Courses } from '@/components/sections/Courses/Courses';
import { WhyChooseKsou } from '@/components/sections/WhyChooseKsou/WhyChooseKsou';
import { HowItWorks } from '@/components/sections/HowItWorks/HowItWorks';
import { Blog } from '@/components/sections/Blog/Blog';
import { Faq } from '@/components/sections/Faq/Faq';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { JsonLd } from '@/components/common/JsonLd';
import { FAQS } from '@/constants/faq';
import { buildFaqSchema, buildOrganizationSchema } from '@/utils/schema';

const HOME_SEO = {
  title: 'KSOU Online Programmes — Admissions Open 2026',
  description:
    'Apply for UGC-approved online degrees from Karnataka State Open University. NAAC A+ rated. MBA MA MCom BA BCom. Fees from ₹10000/year.',
};

export function Home() {
  useDocumentMeta({ ...HOME_SEO, ogType: 'website', canonicalPath: '/' });

  return (
    <main>
      {/* Schemas read the same FAQS the visible accordion renders, so the
          two can never drift apart. */}
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildFaqSchema(FAQS)} />

      <Hero />
      <Courses />
      <WhyChooseKsou />
      <HowItWorks />
      <Blog />
      <Faq />
    </main>
  );
}
