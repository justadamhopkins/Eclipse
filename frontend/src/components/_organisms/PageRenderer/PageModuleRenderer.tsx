import { toCoverHero } from '@helpers/adapters/toCoverHero';
import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { CoverHero } from '@organisms/Heros/CoverHero';
import { ListRenderer } from '@utilities/ListRenderer';

export interface IPageModuleRendererProps {
  data: NonNullable<PAGE_QUERY_RESULT>;
}

export const PageModuleRenderer = ({ data }: IPageModuleRendererProps) => {
  return (
    <ListRenderer
      items={data.modules}
      render={({ item }) => {
        switch (item._type) {
          case 'hero':
            return (
              <CoverHero
                key={item._key}
                {...toCoverHero(item)}
              />
            );

          default:
            return null;
        }
      }}
    />
  );
};
