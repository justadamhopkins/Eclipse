import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

// export interface IAboutMeProps {
//   description: string;
// }

export const AboutMe = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="What i am about"
        title="About me"
      ></FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
