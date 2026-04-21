import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './FeaturedHeaderBlock.module.css';

type TFeaturedHeaderBlockProps = {
  title: string;
};

export const FeaturedHeaderBlock = ({
  title,
  children,
}: PropsWithChildren<TFeaturedHeaderBlockProps>) => {
  return (
    <div className={clsx([styles.featuredHeaderBlock])}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
