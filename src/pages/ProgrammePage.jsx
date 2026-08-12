import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PROGRAMMES } from '@/constants/programmes';
import { JsonLd } from '@/components/common/JsonLd';
import {
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildFaqSchema,
} from '@/utils/schema';
import { PageComingSoon } from './PageComingSoon';
import { ProgrammeHero } from '@/components/sections/Programme/ProgrammeHero';
import { ProgrammeLeadGeneration } from '@/components/sections/Programme/ProgrammeLeadGeneration';
import { ProgrammeFeeDurationEligibility } from '@/components/sections/Programme/ProgrammeFeeDurationEligibility';
import { ProgrammeWhyChoose } from '@/components/sections/Programme/ProgrammeWhyChoose';
import { ProgrammeStructure } from '@/components/sections/Programme/ProgrammeStructure';
import { ProgrammeRecognition } from '@/components/sections/Programme/ProgrammeRecognition';
import { ProgrammeCurriculum } from '@/components/sections/Programme/ProgrammeCurriculum';
import { ProgrammeCareerSupport } from '@/components/sections/Programme/ProgrammeCareerSupport';
import { ProgrammeDegreeShowcase } from '@/components/sections/Programme/ProgrammeDegreeShowcase';
import { ProgrammeWhyKsou } from '@/components/sections/Programme/ProgrammeWhyKsou';
import { ProgrammeTestimonials } from '@/components/sections/Programme/ProgrammeTestimonials';
import { ProgrammeFaq } from '@/components/sections/Programme/ProgrammeFaq';

const DEFAULT_SEO = {
  title: 'KSOU Online Programmes — Admissions Open 2026',
  description:
    'Apply for UGC-approved online degrees from Karnataka State Open University. NAAC A+ rated. MBA MA MCom BA BCom. Fees from ₹10000/year.',
};

export function ProgrammePage() {
  const { slug } = useParams();
  const programme = PROGRAMMES[slug];
  const seo = programme?.seo ?? DEFAULT_SEO;
  useDocumentMeta({
    ...seo,
    ogType: 'website',
    canonicalPath: `/programmes/${slug}`,
  });

  if (!programme) {
    return <PageComingSoon title="Programme" />;
  }

  const programmeName = [programme.hero?.titleLead, programme.hero?.titleAccent]
    .filter(Boolean)
    .join(' ');

  return (
    <main>
      <JsonLd data={buildCourseSchema(programme, slug)} />
      <JsonLd data={buildFaqSchema(programme.faqs?.items)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Programmes', path: '/programmes' },
          { name: programmeName, path: `/programmes/${slug}` },
        ])}
      />

      <ProgrammeHero programme={programme} />
      <ProgrammeLeadGeneration />
      <ProgrammeFeeDurationEligibility programme={programme} />
      <ProgrammeWhyChoose programme={programme} />
      <ProgrammeStructure programme={programme} />
      <ProgrammeRecognition />
      <ProgrammeCurriculum programme={programme} />
      <ProgrammeCareerSupport programme={programme} />
      <ProgrammeDegreeShowcase programme={programme} />
      <ProgrammeWhyKsou />
      <ProgrammeTestimonials programme={programme} />
      <ProgrammeFaq programme={programme} />
    </main>
  );
}
