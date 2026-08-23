import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

import styles from './AboutMeModule.module.css';

export interface IAboutMeModuleProps {
  description: string;
}

export const AboutMeModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock title="About me">
        <div className={styles.aboutMe}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            blanditiis, debitis explicabo impedit iusto perspiciatis placeat quo
            voluptatem. Ab alias, eius enim minus molestias necessitatibus nulla
            pariatur quibusdam rem sed.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            blanditiis, debitis explicabo impedit iusto perspiciatis placeat quo
            voluptatem. Ab alias, eius enim minus molestias necessitatibus nulla
            pariatur quibusdam rem sed.
          </Text>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
