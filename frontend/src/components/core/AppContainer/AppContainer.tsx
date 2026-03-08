import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './AppContainer.module.css';

export const AppContainer = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => {
  return (
    <main className={clsx([styles.appContainer, className])}>{children}</main>
  );
};
