import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { type ICoverHeroProps } from '@organisms/Heros/CoverHero';
import { type TActionRowItem } from '@organisms/Heros/CoverHero/components/ActionRow/ActionRow';
import { assertNever } from 'ts-extras';

type THeroPayload = Extract<
  NonNullable<PAGE_QUERY_RESULT>['modules'][number],
  { _type: 'hero' }
>;

export const toCoverHero = (payload: THeroPayload): ICoverHeroProps => {
  return {
    title: payload.headline,
    subtitle: payload.subheadline,
    eyebrow: payload.eyebrow,
    actions: payload.callToActions.map(renderCallToAction),
  };
};

const renderCallToAction = (
  cta: THeroPayload['callToActions'][number],
): TActionRowItem => {
  switch (cta._type) {
    case 'link':
      return {
        id: cta._key,
        type: 'link',
        label: cta.label,
        href: cta.href ?? '',
      };
    case 'socialProfile':
      return {
        id: cta._key,
        type: 'socialProfile',
        label: cta.link.label,
        href: cta.link.href ?? '',
        platform: cta.platform,
      };
    default:
      return assertNever(cta);
  }
};
