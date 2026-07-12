import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FactBox } from '@molecules/FactBox';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import clsx from 'clsx';

import styles from './AboutMe.module.css';
// export interface IAboutMeProps {
//   description: string;
// }

export const AboutMe = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="What i am about"
        title="About me"
      >
        <div className={styles.aboutMe__contentWrapper}>
          <div className={clsx(['u-flow--s-m', styles.aboutMe__bodyWrapper])}>
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
          <FactBox
            facts={[
              { title: 'Based in', value: 'London, UK' },
              { title: 'Focus', value: 'Full stack' },
              { title: 'Availability', value: 'Open to roles' },
              { title: 'Timezone', value: 'GMT / BST' },
            ]}
          />
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
