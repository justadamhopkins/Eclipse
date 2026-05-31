import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

interface IAboutMeModuleProps {
  label?: string;
}

export const AboutMeModule = ({
  label = 'Coming soon',
}: IAboutMeModuleProps) => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="About"
        title="A bit about me"
      >
        {label}
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
