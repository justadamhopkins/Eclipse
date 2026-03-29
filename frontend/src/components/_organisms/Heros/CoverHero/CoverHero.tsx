import { Button } from '@atoms/Button';
import clsx from 'clsx';
import NextImage from 'next/image';

import styles from './CoverHero.module.css';

interface ICoverHeroProps {
  title: string;
  subtitle: string;
  label: string;
}

export const CoverHero = ({ title, label, subtitle }: ICoverHeroProps) => {
  return (
    <section className={clsx([styles.coverHero])}>
      <div className={styles.coverHero__contentWrapper}>
        <div className={styles.coverHero__contentInner}>
          <span className={styles.coverHero__label}>{label}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles.coverHero__ctaRow}>
            <Button
              href="#footer"
              variant="primary"
            >
              View my work
            </Button>
            <Button
              href="/contact"
              variant="secondary"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.coverHero__imageWrapper}>
        <NextImage
          src="/adam.png"
          alt="adam hopkins"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
};
