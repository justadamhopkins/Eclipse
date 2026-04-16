import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { JobCard } from '@molecules/JobCard';
import { CoverHero } from '@organisms/Heros/CoverHero';

export const HomePage = () => {
  return (
    <>
      <CoverHero
        label="Senior Software engineer"
        title="Hi, I'm Adam Hopkins"
        subtitle="London-based senior software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <ModuleSectionWrapper>
        <FeaturedHeaderBlock title="Featured Work">
          <div style={{ display: 'flex', gap: '20px' }}>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </FeaturedHeaderBlock>
      </ModuleSectionWrapper>
    </>
  );
};
