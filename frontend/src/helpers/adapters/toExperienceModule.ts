import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { type IJobDescriptionProps } from '@molecules/JobDescription';
import { type IWorkExperienceModuleProps } from '@organisms/Modules/JobCardModule';
import { type PortableTextBlock } from '@portabletext/types';

type TExperienceModulePayload = Extract<
  NonNullable<PAGE_QUERY_RESULT>['modules'][number],
  { _type: 'experienceModule' }
>;

export const formatExperienceDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
};

export const toExperienceBlock = (
  experienceBlock: TExperienceModulePayload['experienceBlocks'][number],
): IJobDescriptionProps => {
  return {
    companyTitle: experienceBlock.company,
    jobTitle: experienceBlock.role,
    description: experienceBlock.body as unknown as PortableTextBlock[],
    startDate: formatExperienceDate(experienceBlock.startDate),
    endDate: experienceBlock.endDate
      ? formatExperienceDate(experienceBlock.endDate)
      : undefined,
    isCurrentRole: !experienceBlock.endDate,
  };
};

export const toExperienceBlockModule = (
  payload: TExperienceModulePayload,
): Omit<IWorkExperienceModuleProps, 'ref'> => {
  return {
    title: payload.title,
    jobCards: payload.experienceBlocks.map(toExperienceBlock),
  };
};
