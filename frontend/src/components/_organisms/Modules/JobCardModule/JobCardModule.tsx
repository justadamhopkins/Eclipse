import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { JobCard } from '@molecules/Cards/JobCard';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
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
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="Experience"
        title="My journey"
      >
        <div className={styles.jobCardModule}>
          <div className={styles.jobCardModule__slideWrapper}>
            <ListRenderer
              items={jobCards}
              render={({ item }) => (
                <JobCard className={styles.jobCardModule__slide}>
                  <JobCard.Logo name="lickLogo" />
                  <JobCard.Title>{item.title}</JobCard.Title>
                  <JobCard.Meta>
                    {`${item.startDate} - ${item.isCurrentRole ? 'Present' : item.endDate}`}
                  </JobCard.Meta>
                  <JobCard.Description>{item.description}</JobCard.Description>
                </JobCard>
              )}
            />
          </div>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
