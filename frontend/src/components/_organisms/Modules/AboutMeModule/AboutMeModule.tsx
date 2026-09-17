import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

import styles from './AboutMeModule.module.css';

export interface IAboutMeModuleProps {
  description: string;
}

export const AboutMeModule = ({ ...rest }) => {
  return (
    <ModuleSectionWrapper {...rest}>
      <FeaturedHeaderBlock title="About me">
        <div className={styles.aboutMe}>
          <Text>
            I&apos;m a senior software engineer who&apos;s spent the last decade
            shipping large-scale web applications and microservices in the
            JavaScript ecosystem, with a strong lean toward functional
            programming and clean code. Right now I&apos;m on a greenfield
            project at Travelex, migrating legacy systems in a fast-paced
            corporate environment.
          </Text>
          <Text>
            Before Travelex, I worked across ecommerce, global news, marketing,
            and fashion, leading web projects for national and global clients in
            tech, retail, and hospitality. My work has helped grow revenue,
            increase traffic, and streamline content delivery — usually as part
            of a team built to ship fast without cutting corners.
          </Text>
          <Text>
            Technology doesn&apos;t stand still, so I don&apos;t either — lately
            I&apos;ve been deep in structured CMS data modelling and AI agentic
            development. Outside of work I&apos;m usually gaming, DJing,
            watching football, walking the dog, or being a dad to my
            six-year-old son and four-year-old daughter.
          </Text>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
