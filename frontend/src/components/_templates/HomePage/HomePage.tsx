import { Gutter } from '@atoms/Gutter';
import { CoverHero } from '@organisms/Heros/CoverHero';

export const HomePage = () => {
  return (
    <Gutter>
      <CoverHero
        label="Software engineer"
        title="Hi, i am Adam Hopkins"
        subtitle="Building modern user interfaces out of the UK"
      />
      <p>Home page content goes here.</p>
    </Gutter>
  );
};
