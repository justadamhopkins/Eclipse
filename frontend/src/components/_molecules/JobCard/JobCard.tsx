import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from './JobCard.module.css';

type TLogoProps = TWithClassName<{ src: string; alt: string; size?: number }>;

const Logo = ({ src, alt, size = 32, className }: TLogoProps) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={clsx(styles.jobCard__logo, className)}
  />
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
    <article className={clsx(styles.jobCard, className)}>
      <div className={styles.jobCard__inner}>{children}</div>
    </article>
  );
};

JobCard.Logo = Logo;
JobCard.Title = Title;
JobCard.Meta = Meta;
JobCard.Description = Description;
