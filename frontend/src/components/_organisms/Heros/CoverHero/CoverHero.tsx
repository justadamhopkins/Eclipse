import clsx from 'clsx';

import styles from './CoverHero.module.css';

interface ICoverHeroProps {
  title: string;
  subtitle: string;
  label: string;
}

export const CoverHero = ({ title, label, subtitle }: ICoverHeroProps) => {
  return (
    <section className={clsx([styles.coverHero])}>
      <div className={styles.coverHero__container}>
        <div className={styles.coverHero__contentWrapper}>
          <p className={styles.coverHero__label}>{label}</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className={styles.coverHero__imageWrapper}>image</div>
      </div>
    </section>
  );
};
