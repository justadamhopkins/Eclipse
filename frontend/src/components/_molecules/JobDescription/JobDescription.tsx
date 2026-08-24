import { Text } from '@atoms/Text';

import styles from './JobDescription.module.css';
export interface IJobDescriptionProps {
  companyTitle: string;
  isCurrentRole: boolean;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export const JobDescription = ({
  companyTitle,
  isCurrentRole,
  jobTitle,
  description,
  startDate,
  endDate,
}: IJobDescriptionProps) => {
  return (
    <div className={styles.jobDescription}>
      <div className={styles.header}>
        <div>
          <Text variant="headingMd">{companyTitle}</Text>
          <Text>{jobTitle}</Text>
        </div>
        <Text
          as="span"
          variant="headingMd"
        >{`${startDate} - ${isCurrentRole ? 'Present' : endDate}`}</Text>
      </div>
      <Text>{description}</Text>
    </div>
  );
};
