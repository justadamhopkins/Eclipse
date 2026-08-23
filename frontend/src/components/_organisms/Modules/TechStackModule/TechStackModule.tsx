import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { TechStackCard } from '@molecules/Cards/TechStackCard';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

import styles from './TechStackModule.module.css';

export const TechStackModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock title="Tooling">
        <div className={styles.techStackModule}>
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
