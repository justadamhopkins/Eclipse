import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { type IAboutMeModuleProps } from '@organisms/Modules/AboutMeModule';
import { type PortableTextBlock } from '@portabletext/types';

type TTextModulePayload = Extract<
  NonNullable<PAGE_QUERY_RESULT>['modules'][number],
  { _type: 'textModule' }
>;

export const toTextHeroModule = (
  payload: TTextModulePayload,
): IAboutMeModuleProps => {
  return {
    title: payload.title,
    body: payload.text as unknown as PortableTextBlock[],
  };
};
