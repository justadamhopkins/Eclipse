import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { type ITechStackModuleProps } from '@organisms/Modules/TechStackModule';

type TToolingModulePayload = Extract<
  NonNullable<PAGE_QUERY_RESULT>['modules'][number],
  { _type: 'toolingModule' }
>;

export const toToolingModule = (
  payload: TToolingModulePayload,
): Omit<ITechStackModuleProps, 'ref'> => {
  return {
    title: payload.title,
    tagList: payload.tags.map(tag => ({
      id: tag._key,
      label: tag.label ?? '',
    })),
  };
};
