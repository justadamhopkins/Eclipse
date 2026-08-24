'use client';

import { CoverHero } from '@organisms/Heros/CoverHero';
import { AboutMeModule } from '@organisms/Modules/AboutMeModule/AboutMeModule';
import {
  type IWorkExperienceModuleProps,
  JobCardModule,
} from '@organisms/Modules/JobCardModule';
import { TechStackModule } from '@organisms/Modules/TechStackModule';

export const MOCK_JOB_CARDS = [
  {
    startDate: 'Jan 2023',
    endDate: 'Dec 2024',
    description:
      'Senior Software Engineer. Founding engineer on a greenfield legacy migration. Led a multi-brand design system built on design tokens and the move to a headless Sanity CMS.',
    isCurrentRole: false,
    companyTitle: 'Travelex',
    jobTitle: 'Senior Frontend Engineer',
  },
  {
    startDate: 'Jun 2024',
    // endDate omitted because this is current role
    description:
      'Senior Software Engineer. Founding engineer on a greenfield legacy migration. Led a multi-brand design system built on design tokens and the move to a headless Sanity CMS.',
    isCurrentRole: true,
    companyTitle: 'Travelex',
    jobTitle: 'Tech Lead - Frontend',
  },
  {
    startDate: 'Mar 2021',
    endDate: 'Dec 2022',
    description:
      'Senior Software Engineer. Founding engineer on a greenfield legacy migration. Led a multi-brand design system built on design tokens and the move to a headless Sanity CMS.',
    companyTitle: 'Travelex',
    isCurrentRole: false,
    jobTitle: 'Frontend Engineer',
  },
  {
    startDate: 'Mar 2021',
    endDate: 'Dec 2022',
    description:
      'Senior Software Engineer. Founding engineer on a greenfield legacy migration. Led a multi-brand design system built on design tokens and the move to a headless Sanity CMS.',
    isCurrentRole: false,
    companyTitle: 'Travelex',
    jobTitle: 'Frontend Engineer',
  },
] satisfies IWorkExperienceModuleProps['jobCards'];

export const HomePage = () => {
  return (
    <>
      <CoverHero
        label="Senior Software engineer"
        title="Adam Hopkins"
        subtitle="London-based product-led senior software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <AboutMeModule />
      <JobCardModule jobCards={MOCK_JOB_CARDS} />
      <TechStackModule />
    </>
  );
};
