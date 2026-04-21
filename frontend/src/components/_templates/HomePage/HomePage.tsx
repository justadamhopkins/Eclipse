import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { CoverHero } from '@organisms/Heros/CoverHero';
import {
  type IWorkExperienceModuleProps,
  JobCardModule,
} from '@organisms/Modules/JobCardModule';

export const MOCK_JOB_CARDS = [
  {
    startDate: 'Jan 2023',
    endDate: 'Dec 2024',
    description:
      'Developed and maintained core features using React and TypeScript.',
    isCurrentRole: false,
    title: 'Senior Frontend Engineer',
  },
  {
    startDate: 'Jun 2024',
    // endDate omitted because this is current role
    description:
      'Leading frontend architecture and mentoring junior developers.',
    isCurrentRole: true,
    title: 'Tech Lead - Frontend',
  },
  {
    startDate: 'Mar 2021',
    endDate: 'Dec 2022',
    description:
      'Built and shipped multiple user-facing features with focus on performance.',
    isCurrentRole: false,
    title: 'Frontend Engineer',
  },
  {
    startDate: 'Mar 2021',
    endDate: 'Dec 2022',
    description:
      'Built and shipped multiple user-facing features with focus on performance.',
    isCurrentRole: false,
    title: 'Frontend Engineer',
  },
] satisfies IWorkExperienceModuleProps['jobCards'];

export const HomePage = () => {
  return (
    <>
      <CoverHero
        label="Senior Software engineer"
        title="Hi, I'm Adam Hopkins"
        subtitle="London-based senior software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <ModuleSectionWrapper>
        <JobCardModule jobCards={MOCK_JOB_CARDS} />
      </ModuleSectionWrapper>
    </>
  );
};
