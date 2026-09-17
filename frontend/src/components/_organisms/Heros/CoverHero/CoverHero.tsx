import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { IconButton } from '@atoms/IconButton';
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
            <ul className={styles.ctaRow}>
              <li>
                <Button
                  as={NextLink}
                  href="#footer"
                  variant="primary"
                >
                  Email me
                </Button>
              </li>
              <li>
                <IconButton
                  as={NextLink}
                  href="https://github.com/justadamhopkins"
                  variant="secondary"
                  icon={<RiGithubLine size={18} />}
                >
                  GitHub
                </IconButton>
              </li>
              <li>
                <IconButton
                  as={NextLink}
                  href="https://www.linkedin.com/in/adamhopkins1989/"
                  variant="secondary"
                  icon={<LuLinkedin size={18} />}
                >
                  LinkedIn
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <NextImage
            src="/adam.webp"
            alt="adam hopkins"
            width={400}
            height={400}
          />
        </div>
      </div>
    </ModuleSectionWrapper>
  );
};
