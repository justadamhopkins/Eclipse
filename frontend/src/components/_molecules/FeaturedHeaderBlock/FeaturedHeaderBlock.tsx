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
      <header className={styles.featuredHeaderBlock__header}>
        <Eyebrow
          label={eyebrow}
          variant="primary"
          size="md"
        />
        <h2 className={styles.featuredHeaderBlock__heading}>{title}</h2>
      </header>
      {children || (
        <div
          className={clsx([
            'u-flow--s-m',
            styles.featuredHeaderBlock__bodyWrapper,
          ])}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            blanditiis, debitis explicabo impedit iusto perspiciatis placeat quo
            voluptatem. Ab alias, eius enim minus molestias necessitatibus nulla
            pariatur quibusdam rem sed.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            blanditiis, debitis explicabo impedit iusto perspiciatis placeat quo
            voluptatem. Ab alias, eius enim minus molestias necessitatibus nulla
            pariatur quibusdam rem sed.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            blanditiis, debitis explicabo impedit iusto perspiciatis placeat quo
            voluptatem. Ab alias, eius enim minus molestias necessitatibus nulla
            pariatur quibusdam rem sed.
          </p>
        </div>
      )}
    </div>
  );
};
