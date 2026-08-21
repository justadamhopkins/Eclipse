import { Eyebrow } from '@atoms/Eyebrow';
import clsx from 'clsx';

import styles from './FeaturedHeaderBlock.module.css';

type TFeaturedHeaderBlockProps = {
  title: string;
  eyebrow: string;
  children?: React.ReactNode;
};

export const FeaturedHeaderBlock = ({
  title,
  eyebrow,
  children,
}: TFeaturedHeaderBlockProps) => {
  return (
    <div className={clsx([styles.featuredHeaderBlock])}>
      <header className={styles.header}>
        <Eyebrow
          label={eyebrow}
          variant="primary"
          size="md"
        />
        <h2 className={styles.heading}>{title}</h2>
      </header>
      {children}
    </div>
  );
};
