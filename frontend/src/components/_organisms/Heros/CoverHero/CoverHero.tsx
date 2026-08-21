import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { LuLinkedin } from 'react-icons/lu';
import { RiGithubLine } from 'react-icons/ri';

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
            <Text variant="display">{title}</Text>
            <Text
              as="p"
              variant="headingXl"
            >
              {subtitle}
            </Text>
            <div className={styles.ctaRow}>
              <Button
                as={NextLink}
                href="#footer"
                variant="primary"
              >
                Email me
              </Button>
              <Button
                as={NextLink}
                href="/contact"
                variant="secondary"
                isLabelHiddenOnMobile={true}
                startIcon={<RiGithubLine size={18} />}
              >
                GitHub
              </Button>
              <Button
                as={NextLink}
                href="/contact"
                variant="secondary"
                isLabelHiddenOnMobile={true}
                startIcon={<LuLinkedin size={18} />}
              >
                LinkedIn
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
