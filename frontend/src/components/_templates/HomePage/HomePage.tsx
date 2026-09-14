'use client';

import { CoverHero } from '@organisms/Heros/CoverHero';
import { AboutMeModule } from '@organisms/Modules/AboutMeModule/AboutMeModule';
import { ContactModule } from '@organisms/Modules/ContactModule';
import {
  type IWorkExperienceModuleProps,
  JobCardModule,
} from '@organisms/Modules/JobCardModule';
import { TechStackModule } from '@organisms/Modules/TechStackModule';

import { useScrollCtx } from '../../contexts/ScrollProvider/ScrollProvider';

export const JOB_CARDS = [
  {
    startDate: 'Aug 2024',
    // endDate omitted because this is current role
    description:
      'Founding engineer on a greenfield legacy-migration initiative, shaping the architecture and delivery approach adopted across the programme. Led a company-wide multi-brand design system built on design tokens and directed the enterprise migration to a headless Sanity CMS. Drove organisation-wide AI adoption, defining and rolling out Claude Code best practices across engineering teams.',
    isCurrentRole: true,
    companyTitle: 'Travelex',
    jobTitle: 'Senior Software Engineer',
  },
  {
    startDate: 'May 2023',
    endDate: 'Jun 2024',
    description:
      'Core contributor rebuilding the internal React design system using atomic design principles. Built a Node.js quote-recommendation filter using AWS Lambda and MSK/Kafka, and delivered a serverless Salesforce integration via API Gateway and Lambda. Drove adoption of TypeScript and best-in-class automated testing across the platform.',
    isCurrentRole: false,
    companyTitle: 'Togather',
    jobTitle: 'Senior Software Engineer',
  },
  {
    startDate: 'May 2021',
    endDate: 'May 2023',
    description:
      'Core contributor to a TypeScript monorepo spanning Next.js apps, an Express API layer, and a headless CMS. Designed and built a serverless, event-driven microservice architecture for a Screwfix integration using AWS Lambda, API Gateway, SQS, and DynamoDB. Implemented Datadog observability to ensure microservice uptime.',
    isCurrentRole: false,
    companyTitle: 'Lick',
    jobTitle: 'Senior Software Engineer',
  },
  {
    startDate: 'Nov 2019',
    endDate: 'May 2021',
    description:
      'Core engineer building and releasing a new TypeScript React Native puzzles app for iOS and Android. Scoped and delivered a major feature for The Times’ core Node.js Apollo Server within a microservice architecture, and built a new subscription-cancellation application using Apollo, GraphQL, TypeScript, and React.',
    isCurrentRole: false,
    companyTitle: 'News UK (The Times)',
    jobTitle: 'Senior Software Engineer',
  },
] satisfies IWorkExperienceModuleProps['jobCards'];

export const HomePage = () => {
  const { setRef } = useScrollCtx();
  return (
    <>
      <CoverHero
        label="Senior Software engineer"
        title="Adam Hopkins"
        subtitle="London-based product-led senior software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <AboutMeModule ref={setRef(1)} />
      <JobCardModule
        ref={setRef(2)}
        jobCards={JOB_CARDS}
      />
      <TechStackModule ref={setRef(3)} />
      <ContactModule ref={setRef(4)} />
    </>
  );
};
