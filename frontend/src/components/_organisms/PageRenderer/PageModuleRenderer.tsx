import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { CoverHero } from '@organisms/Heros/CoverHero';
import { ListRenderer } from '@utilities/ListRenderer';

export interface IPageModuleRendererProps {
  modules: NonNullable<PAGE_QUERY_RESULT>['modules'];
}

export const PageModuleRenderer = ({ modules }: IPageModuleRendererProps) => {
  return (
    <ListRenderer
      items={modules}
      render={({ item }) => {
        switch (item._type) {
          case 'hero':
            return (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <CoverHero
                key={item._key}
                {...module}
              />
            );

          default:
            return null;
        }
      }}
    />
  );
};
