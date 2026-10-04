import { Eyebrow } from '@atoms/Eyebrow';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import {
  ActionRow,
  type TActionRowItem,
} from '@organisms/Heros/CoverHero/components/ActionRow/ActionRow';
import NextImage from 'next/image';

import styles from './CoverHero.module.css';

export interface ICoverHeroProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  actions: TActionRowItem[];
}

export const CoverHero = ({
  title,
  eyebrow,
  subtitle,
  actions,
}: ICoverHeroProps) => {
  return (
    <ModuleSectionWrapper>
      <div className={styles.coverHero}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentInner}>
            <Eyebrow
              variant="primary"
              size="md"
              label={eyebrow}
            />
            <Text variant="display">{title}</Text>
            <Text
              as="p"
              variant="headingXl"
            >
              {subtitle}
            </Text>
            <ActionRow items={actions} />
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
