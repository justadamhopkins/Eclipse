import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import {
  type IJobDescriptionProps,
  JobDescription,
} from '@molecules/JobDescription';
import { ListRenderer } from '@utilities/ListRenderer';

import styles from './JobCardModule.module.css';

export interface IWorkExperienceModuleProps {
  jobCards: IJobDescriptionProps[];
}

export const JobCardModule = ({ jobCards }: IWorkExperienceModuleProps) => {
  return (
    <ModuleSectionWrapper>
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
