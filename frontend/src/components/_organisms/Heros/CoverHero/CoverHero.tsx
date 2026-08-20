import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import NextImage from 'next/image';

import styles from './CoverHero.module.css';

interface ICoverHeroProps {
  title: string;
  subtitle: string;
  label: string;
}

export const CoverHero = ({ title, label, subtitle }: ICoverHeroProps) => {
  return (
    <ModuleSectionWrapper>
      <div className={styles.coverHero}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentInner}>
            <Eyebrow
              variant="primary"
              size="md"
              label={label}
            />
            <Text variant="heading2xl">{title}</Text>
            <Text
              as="p"
              variant="headingXl"
            >
              {subtitle}
            </Text>
            <div className={styles.ctaRow}>
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
        <div className={styles.imageContainer}>
          <NextImage
            src="/adam.png"
            alt="adam hopkins"
            width={400}
            height={400}
          />
        </div>
      </div>
    </ModuleSectionWrapper>
  );
};
