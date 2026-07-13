import { CardShell } from '@atoms/CardShell';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { TechStackCard } from '@molecules/Cards/TechStackCard';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';

export const TechStackModule = () => {
  return (
    <ModuleSectionWrapper>
      <FeaturedHeaderBlock
        eyebrow="Tech Stack"
        title="Tools i reach for"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          <TechStackCard>
            <TechStackCard.Header category="tooling">
              Tooling
            </TechStackCard.Header>
          </TechStackCard>
          <CardShell>efrfrf</CardShell>
          <CardShell>efrfrf</CardShell>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
