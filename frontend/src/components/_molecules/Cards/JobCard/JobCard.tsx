import { Icon, type TIconProps } from '@atoms/Icon';
import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './JobCard.module.css';

type TImgIconProps = Extract<TIconProps, { isInline: false }>;
type TLogoProps = TWithClassName<{ name: TImgIconProps['name'] }>;

const Logo = ({ name, className }: TLogoProps) => (
  <div className={clsx(styles.jobCard__logo, className)}>
    <Icon
      isInline={false}
      name={name}
    />
  </div>
);

const Title = ({ children, className }: TWithClassName<PropsWithChildren>) => (
  <h3 className={clsx(styles.jobCard__title, className)}>{children}</h3>
);

const Meta = ({ children, className }: TWithClassName<PropsWithChildren>) => (
  <span className={clsx(styles.jobCard__meta, className)}>{children}</span>
);

const Description = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => (
  <p className={clsx(styles.jobCard__description, className)}>{children}</p>
);

export const JobCard = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => {
  return (
    <article className={clsx(styles.jobCard, 'u-flow--xs', className)}>
      {children}
    </article>
  );
};

JobCard.Logo = Logo;
JobCard.Title = Title;
JobCard.Meta = Meta;
JobCard.Description = Description;
