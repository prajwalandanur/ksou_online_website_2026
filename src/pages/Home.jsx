import { Hero } from '@/components/sections/Hero/Hero';
import { Courses } from '@/components/sections/Courses/Courses';
import { WhyChooseKsou } from '@/components/sections/WhyChooseKsou/WhyChooseKsou';
import { HowItWorks } from '@/components/sections/HowItWorks/HowItWorks';
import { Blog } from '@/components/sections/Blog/Blog';
import { Faq } from '@/components/sections/Faq/Faq';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { JsonLd } from '@/components/common/JsonLd';
import { useContent } from '@/i18n/content';
import { useLanguage } from '@/i18n/useLanguage';
import { KANNADA, localizePath } from '@/i18n/language';
import { buildFaqSchema, buildOrganizationSchema } from '@/utils/schema';

const HOME_SEO = {
  en: {
    title: 'KSOU Online Programmes — Admissions Open 2026',
    description:
      'Apply for UGC-approved online degrees from Karnataka State Open University. NAAC A+ rated. MBA MA MCom BA BCom. Fees from ₹10000/year.',
  },
  // ⚠ MACHINE-DRAFTED KANNADA — AWAITING NATIVE REVIEW.
  kn: {
    title: 'KSOU ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮಗಳು — ಪ್ರವೇಶಾತಿ ತೆರೆದಿದೆ 2026',
    description:
      'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯದಿಂದ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ಆನ್‌ಲೈನ್ ಪದವಿಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. NAAC A+ ಸರ್ಕಾರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ. MBA, MA, M.Com, BA, B.Com. ₹10,000/ವರ್ಷದಿಂದ ಶುಲ್ಕ.',
  },
};

export function Home() {
  const language = useLanguage();
  const { faqs } = useContent();

  useDocumentMeta({
    ...(language === KANNADA ? HOME_SEO.kn : HOME_SEO.en),
    ogType: 'website',
    canonicalPath: localizePath('/', language),
    alternates: '/',
  });

  return (
    <main>
      {/* Schemas read the same FAQS the visible accordion renders, so the
          two can never drift apart. */}
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildFaqSchema(faqs)} />

      <Hero />
      <Courses />
      <WhyChooseKsou />
      <HowItWorks />
      <Blog />
      <Faq />
    </main>
  );
}
