import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { TechStackCard } from '@molecules/Cards/TechStackCard';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

export const TechStackModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="Tech Stack"
        title="Tools i reach for"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr)',
            gap: '20px',
          }}
        >
          <TechStackCard>
            <TechStackCard.Header category="tooling">
              Tooling
            </TechStackCard.Header>
            <TechStackCard.ListBody
              tags={[
                { label: 'Next.js' },
                { label: 'React' },
                { label: 'TypeScript' },
              ]}
            />
          </TechStackCard>
          <TechStackCard>
            <TechStackCard.Header category="infrastructure">
              Infrastructure
            </TechStackCard.Header>
            <TechStackCard.ListBody
              tags={[
                { label: 'Docker' },
                { label: 'Kubernetes' },
                { label: 'AWS' },
              ]}
            />
          </TechStackCard>
          <TechStackCard>
            <TechStackCard.Header category="frameworks">
              Frameworks
            </TechStackCard.Header>
            <TechStackCard.ListBody
              tags={[
                { label: 'Next.js' },
                { label: 'React' },
                { label: 'TypeScript' },
              ]}
            />
          </TechStackCard>
          <TechStackCard>
            <TechStackCard.Header category="languages">
              Languages
            </TechStackCard.Header>
            <TechStackCard.ListBody
              tags={[
                { label: 'Next.js' },
                { label: 'React' },
                { label: 'TypeScript' },
              ]}
            />
          </TechStackCard>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
