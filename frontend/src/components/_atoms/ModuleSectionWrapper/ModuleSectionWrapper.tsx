import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './ModuleSectionWrapper.module.css';

type TModuleSectionWrapperProps = TWithClassName<{
  isFullBleed?: boolean;
}>;

export const ModuleSectionWrapper = ({
  children,
  className,
  isFullBleed = false,
}: PropsWithChildren<TModuleSectionWrapperProps>) => {
  return (
    <section
      className={clsx(
        styles.moduleSectionWrapper,
        isFullBleed && styles.fullBleed,
        className,
      )}
    >
      {children}
    </section>
  );
};
