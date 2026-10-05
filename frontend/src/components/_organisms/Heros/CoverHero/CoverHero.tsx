import { Eyebrow } from '@atoms/Eyebrow';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { urlFor } from '@libs/sanity/assets/image';
import {
  ActionRow,
  type TActionRowItem,
} from '@organisms/Heros/CoverHero/components/ActionRow/ActionRow';
import { type TSanityImage } from '@typings/client';
import { Image } from 'next-sanity/image';

import styles from './CoverHero.module.css';

export interface ICoverHeroProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  actions: TActionRowItem[];
  image: TSanityImage;
}

export const CoverHero = ({
  title,
  eyebrow,
  subtitle,
  actions,
  image,
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
          <Image
            src={urlFor(image)
              .width(800)
              .height(800)
              .fit('crop')
              .auto('format')
              .quality(80)
              .url()}
            alt="adam hopkins"
            width={800}
            height={800}
            blurDataURL={image.asset.metadata.lqip}
          />
        </div>
      </div>
    </ModuleSectionWrapper>
  );
};
