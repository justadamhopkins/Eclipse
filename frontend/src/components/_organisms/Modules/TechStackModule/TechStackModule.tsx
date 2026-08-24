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
              { label: 'TypeScript' },
              { label: 'React' },
              { label: 'Next.js' },
              { label: 'Node.js' },
              { label: 'GraphQL' },
              { label: 'AWS Lambda' },
              { label: 'DynamoDB' },
              { label: 'PostgreSQL' },
              { label: 'Prisma' },
              { label: 'Serverless' },
              { label: 'Turborepo' },
              { label: 'Sanity' },
              { label: 'Shopify' },
              { label: 'Vitest' },
              { label: 'Jest' },
              { label: 'Cypress' },
              { label: 'Storybook' },
              { label: 'Datadog' },
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
