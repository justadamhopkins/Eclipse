import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import clsx from 'clsx';

import styles from './AboutMeModule.module.css';

export interface IAboutMeModuleProps {
  description: string;
}

export const AboutMeModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="My Story"
        title="About me"
      >
        <div>
          <div className={clsx(['u-flow--s', styles.aboutMe__bodyWrapper])}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
              blanditiis, debitis explicabo impedit iusto perspiciatis placeat
              quo voluptatem. Ab alias, eius enim minus molestias necessitatibus
              nulla pariatur quibusdam rem sed.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
              blanditiis, debitis explicabo impedit iusto perspiciatis placeat
              quo voluptatem. Ab alias, eius enim minus molestias necessitatibus
              nulla pariatur quibusdam rem sed.
            </p>
          </div>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
