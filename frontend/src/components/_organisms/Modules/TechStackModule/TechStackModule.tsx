import { Chip } from '@atoms/Chip';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { type TMaybe } from '@typings/utils';
import { ListRenderer } from '@utilities/ListRenderer';

import styles from './TechStackModule.module.css';

export interface ITechStackModuleProps {
  title: string;
  tagList: { id: string; label: string }[];
  ref: (element: TMaybe<HTMLElement>) => void;
}

export const TechStackModule = ({
  title,
  tagList,
  ...rest
}: ITechStackModuleProps) => {
  return (
    <ModuleSectionWrapper {...rest}>
      <FeaturedHeaderBlock title={title}>
        <ul className={styles.techStackModule}>
          <ListRenderer
            items={tagList}
            render={({ item }) => (
              <li>
                <Chip
                  key={item.id}
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
