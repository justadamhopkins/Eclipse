import { Chip } from '@atoms/Chip';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { ListRenderer } from '@utilities/ListRenderer';

import styles from './TechStackModule.module.css';

export const TechStackModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock title="Tooling">
        <ul className={styles.techStackModule}>
          <ListRenderer
            items={[
              { label: 'Next.js' },
              { label: 'React' },
              { label: 'TypeScript' },
              { label: 'Next.js' },
              { label: 'React' },
              { label: 'TypeScript' },
              { label: 'Next.js' },
              { label: 'React' },
              { label: 'TypeScript' },
              { label: 'Next.js' },
              { label: 'React' },
              { label: 'TypeScript' },
              { label: 'Next.js' },
              { label: 'React' },
              { label: 'TypeScript' },
            ]}
            render={({ item }) => (
              <li>
                <Chip
                  key={item.label}
                  label={item.label}
                />
              </li>
            )}
          />
        </ul>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
