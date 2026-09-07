import { SiteContainer } from '@atoms/SiteContainer';
import { type TVariants, type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './ModuleSectionWrapper.module.css';

type TModuleSectionWrapperProps = TWithClassName<{
  isFullBleed?: boolean;
  variant?: Extract<TVariants, 'primary' | 'secondary'>;
}>;

export const ModuleSectionWrapper = ({
  children,
  className,
  isFullBleed = false,
  variant = 'primary',
}: PropsWithChildren<TModuleSectionWrapperProps>) => {
  return (
    <section
      className={clsx(
        styles.moduleSectionWrapper,
        isFullBleed && styles.fullBleed,
        styles[variant],
        className,
      )}
    >
      <SiteContainer>{children}</SiteContainer>
    </section>
  );
};
