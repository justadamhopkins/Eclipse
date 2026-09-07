import { Text } from '@atoms/Text';
import { type TVariants, type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type ReactNode } from 'react';

import styles from './FeaturedHeaderBlock.module.css';

type TFeaturedHeaderBlockProps = {
  title: string;
  children?: ReactNode;
  variant?: Extract<TVariants, 'primary' | 'secondary'>;
};

export const FeaturedHeaderBlock = ({
  title,
  children,
  variant = 'primary',
  className,
}: TWithClassName<TFeaturedHeaderBlockProps>) => {
  return (
    <div
      className={clsx([styles.featuredHeaderBlock, styles[variant], className])}
    >
      <header>
        <Text
          variant="headingMd"
          as="h2"
        >
          {title}
        </Text>
      </header>
      {children}
    </div>
  );
};
