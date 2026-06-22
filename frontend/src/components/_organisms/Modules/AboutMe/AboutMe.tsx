import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

import styles from './AboutMe.module.css';
export interface IAboutMeProps {
  description: string;
}

export const AboutMe = ({ description }: IAboutMeProps) => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="What i am about"
        title="About me"
      >
        <div className={styles.aboutMe}>
          <p>{description}</p>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
