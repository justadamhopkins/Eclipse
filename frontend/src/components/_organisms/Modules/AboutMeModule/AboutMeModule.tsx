import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { PortableText } from '@portabletext/react';
import { type PortableTextBlock } from '@portabletext/types';

import styles from './AboutMeModule.module.css';

export interface IAboutMeModuleProps {
  title: string;
  body: PortableTextBlock[];
}

export const AboutMeModule = ({ title, body, ...rest }) => {
  return (
    <ModuleSectionWrapper {...rest}>
      <FeaturedHeaderBlock title={title}>
        <div className={styles.aboutMe}>
          <PortableText
            value={body}
            components={{
              block: {
                normal: ({ children }) => <Text>{children}</Text>,
              },
            }}
          />
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
