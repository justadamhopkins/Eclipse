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
  title: string;
  jobCards: IJobDescriptionProps[];
  ref: (element: TMaybe<HTMLElement>) => void;
}

export const JobCardModule = ({
  title,
  jobCards,
  ...rest
}: PropsWithChildren<IWorkExperienceModuleProps>) => {
  return (
    <ModuleSectionWrapper {...rest}>
      <FeaturedHeaderBlock title={title}>
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
