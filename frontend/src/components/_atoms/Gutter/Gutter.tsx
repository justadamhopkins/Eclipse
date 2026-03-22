import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './Gutter.module.css';

export const Gutter = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => {
  return <div className={clsx([styles.gutter, className])}>{children}</div>;
};
