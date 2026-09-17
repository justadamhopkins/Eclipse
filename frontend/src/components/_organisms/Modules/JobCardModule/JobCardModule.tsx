import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import {
  type IJobDescriptionProps,
  JobDescription,
} from '@molecules/JobDescription';
import { type TMaybe } from '@typings/utils';
import { ListRenderer } from '@utilities/ListRenderer';
import { type PropsWithChildren } from 'react';

import styles from './JobCardModule.module.css';

export interface IWorkExperienceModuleProps {
  jobCards: IJobDescriptionProps[];
  ref: (element: TMaybe<HTMLElement>) => void;
}

export const JobCardModule = ({
  jobCards,
  ...rest
}: PropsWithChildren<IWorkExperienceModuleProps>) => {
  return (
    <ModuleSectionWrapper {...rest}>
      <FeaturedHeaderBlock title="Experience">
        <ul className={styles.jobCardModule}>
          <ListRenderer
            items={jobCards}
            render={({ item }) => (
              <li>
                <JobDescription {...item} />
              </li>
            )}
          />
        </ul>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
