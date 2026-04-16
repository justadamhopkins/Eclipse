import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';

import styles from './JobCard.module.css';

type TJobCardProps = TWithClassName<{
  toDate: string;
  fromDate: string;
  company: string;
  position: string;
  description: string;
}>;

export const JobCard = ({ className }: TJobCardProps) => {
  return (
    <article className={clsx([styles.jobCard, className])}>
      <div className={styles['jobCard__wrapper']}>
        <p>logo</p>
        <h3>Travelex</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          architecto culpa esse iure possimus? Dignissimos esse est incidunt
          perspiciatis voluptatem? Aut dignissimos doloribus incidunt iusto
          labore maxime omnis perspiciatis quasi.
        </p>
      </div>
    </article>
  );
};
