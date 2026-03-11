import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './PageWrapper.module.css';

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return <div className={clsx([styles.pageWrapper])}>{children}</div>;
};
