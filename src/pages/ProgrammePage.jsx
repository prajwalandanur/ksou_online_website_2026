import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PROGRAMMES } from '@/constants/programmes';
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
  useDocumentMeta(seo.title, seo.description);

  if (!programme) {
    return <PageComingSoon title="Programme" />;
  }

  return (
    <main>
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
