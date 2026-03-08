import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './SiteContainer.module.css';

export const SiteContainer = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => {
  return (
    <div className={clsx([styles.siteContainer, className])}>{children}</div>
  );
};
