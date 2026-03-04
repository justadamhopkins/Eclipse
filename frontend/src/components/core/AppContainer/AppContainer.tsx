import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './AppContainer.module.css';

interface IAppContainerProps {}

export const AppContainer = ({
  children,
  className,
}: TWithClassName<PropsWithChildren<IAppContainerProps>>) => {
  return (
    <main className={clsx([styles.appContainer, className])}>{children}</main>
  );
};
