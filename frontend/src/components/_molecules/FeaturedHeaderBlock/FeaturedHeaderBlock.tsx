import { Eyebrow } from '@atoms/Eyebrow';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './FeaturedHeaderBlock.module.css';

type TFeaturedHeaderBlockProps = {
  title: string;
  eyebrow: string;
};

export const FeaturedHeaderBlock = ({
  title,
  eyebrow,
  children,
}: PropsWithChildren<TFeaturedHeaderBlockProps>) => {
  return (
    <div className={clsx([styles.featuredHeaderBlock])}>
      <Eyebrow
        label={eyebrow}
        variant="primary"
        size="md"
      />
      <h2>{title}</h2>
      {children}
    </div>
  );
};
