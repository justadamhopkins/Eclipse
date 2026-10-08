import { toContactModule } from '@helpers/adapters/toContactModule';
import { toCoverHeroModule } from '@helpers/adapters/toCoverHeroModule';
import { toExperienceBlockModule } from '@helpers/adapters/toExperienceModule';
import { toTextHeroModule } from '@helpers/adapters/toTextModule';
import { toToolingModule } from '@helpers/adapters/toToolingModule';
import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { CoverHero } from '@organisms/Heros/CoverHero';
import { AboutMeModule } from '@organisms/Modules/AboutMeModule';
import { ContactModule } from '@organisms/Modules/ContactModule';
import { JobCardModule } from '@organisms/Modules/JobCardModule';
import { TechStackModule } from '@organisms/Modules/TechStackModule';
import { ListRenderer } from '@utilities/ListRenderer';

import { useScrollCtx } from '../../contexts/ScrollProvider';

export interface IPageModuleRendererProps {
  data: NonNullable<PAGE_QUERY_RESULT>;
}

export const PageModuleRenderer = ({ data }: IPageModuleRendererProps) => {
  const { setRef } = useScrollCtx();

  return (
    <ListRenderer
      items={data.modules}
      render={({ item }) => {
        switch (item._type) {
          case 'hero':
            return (
              <CoverHero
                {...toCoverHeroModule(item)}
                key={item._key}
              />
            );
          case 'textModule':
            return (
              <AboutMeModule
                {...toTextHeroModule(item)}
                ref={setRef(1)}
                key={item._key}
              />
            );
          case 'experienceModule':
            return (
              <JobCardModule
                {...toExperienceBlockModule(item)}
                ref={setRef(2)}
                key={item._key}
              />
            );
          case 'toolingModule':
            return (
              <TechStackModule
                {...toToolingModule(item)}
                key={item._key}
                ref={setRef(3)}
              />
            );
          case 'contactModule':
            return (
              <ContactModule
                {...toContactModule(item)}
                key={item._key}
                ref={setRef(4)}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
};
