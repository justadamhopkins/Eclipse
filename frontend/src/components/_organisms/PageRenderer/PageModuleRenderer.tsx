import { toCoverHeroModule } from '@helpers/adapters/toCoverHeroModule';
import { toTextHeroModule } from '@helpers/adapters/toTextModule';
import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { CoverHero } from '@organisms/Heros/CoverHero';
import { AboutMeModule } from '@organisms/Modules/AboutMeModule';
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

          default:
            return null;
        }
      }}
    />
  );
};
