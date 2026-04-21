import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { JobCard } from '@molecules/JobCard';
import { ListRenderer } from '@utilities/ListRenderer';

import styles from './JobCardModule.module.css';

export interface IWorkExperienceModuleProps {
  jobCards: {
    startDate: string;
    endDate?: string;
    description: string;
    isCurrentRole: boolean;
    title: string;
  }[];
}

export const JobCardModule = ({ jobCards }: IWorkExperienceModuleProps) => {
  return (
    <FeaturedHeaderBlock title="Featured Work">
      <div className={styles.jobCardModule}>
        <ListRenderer
          items={jobCards}
          render={({ item }) => (
            <JobCard>
              <JobCard.Logo
                src="/brand-logo-2.svg"
                alt="brand logo"
                size={60}
              />
              <JobCard.Title>{item.title}</JobCard.Title>
              <JobCard.Meta>
                {`${item.startDate} - ${item.isCurrentRole ? 'Present' : item.endDate}`}
              </JobCard.Meta>
              <JobCard.Description>{item.description}</JobCard.Description>
            </JobCard>
          )}
        />
      </div>
    </FeaturedHeaderBlock>
  );
};
