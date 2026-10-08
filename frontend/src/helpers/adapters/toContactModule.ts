import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { type IContactModuleProps } from '@organisms/Modules/ContactModule/ContactModule';
import { type TLinkItem } from '@typings/client';

type TToolingModulePayload = Extract<
  NonNullable<PAGE_QUERY_RESULT>['modules'][number],
  { _type: 'contactModule' }
>;

export const toContactModule = (
  payload: TToolingModulePayload,
): Omit<IContactModuleProps, 'ref'> => {
  return {
    title: payload.title,
    heading: payload.heading,
    action: payload.action as unknown as TLinkItem,
  };
};
