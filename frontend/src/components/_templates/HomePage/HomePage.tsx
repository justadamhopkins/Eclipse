import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { JobCard } from '@molecules/JobCard';
import { CoverHero } from '@organisms/Heros/CoverHero';

export const HomePage = () => {
  return (
    <>
      <CoverHero
        label="Senior Software engineer"
        title="Hi, I'm Adam Hopkins"
        subtitle="London-based senior software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <ModuleSectionWrapper>
        <FeaturedHeaderBlock title="Featured Work">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-gap-wide)',
            }}
          >
            <JobCard>
              <JobCard.Logo
                src="/brand-logo-2.svg"
                alt="brand logo"
                size={60}
              />
              <JobCard.Title>Senior Software Engineer</JobCard.Title>
              <JobCard.Meta>2022 — Present</JobCard.Meta>
              <JobCard.Description>
                Building scalable payment infrastructure and frontend systems.
              </JobCard.Description>
            </JobCard>
            <JobCard>
              <JobCard.Logo
                src="/brand-logo-2.svg"
                alt="brand logo"
                size={60}
              />
              <JobCard.Title>Software Engineer</JobCard.Title>
              <JobCard.Meta>2020 — 2022</JobCard.Meta>
              <JobCard.Description>
                Developed customer-facing web applications and internal tooling.
              </JobCard.Description>
            </JobCard>
            <JobCard>
              <JobCard.Logo
                src="/brand-logo-2.svg"
                alt="brand logo"
                size={60}
              />
              <JobCard.Title>Junior Developer</JobCard.Title>
              <JobCard.Meta>2018 — 2020</JobCard.Meta>
              <JobCard.Description>
                Contributed to frontend feature development and testing.
              </JobCard.Description>
            </JobCard>
            <JobCard>
              <JobCard.Logo
                src="/brand-logo-2.svg"
                alt="brand logo"
                size={60}
              />
              <JobCard.Title>Intern</JobCard.Title>
              <JobCard.Meta>2017 — 2018</JobCard.Meta>
              <JobCard.Description>
                Supported development team with prototyping and bug fixes.
              </JobCard.Description>
            </JobCard>
          </div>
        </FeaturedHeaderBlock>
      </ModuleSectionWrapper>
    </>
  );
};
