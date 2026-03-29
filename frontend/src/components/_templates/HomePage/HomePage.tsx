import { Gutter } from '@atoms/Gutter';
import { CoverHero } from '@organisms/Heros/CoverHero';

export const HomePage = () => {
  return (
    <>
      <CoverHero
        label="Software engineer"
        title="Hi, I'm Adam Hopkins"
        subtitle="London-based software engineer crafting high-quality digital products with a focus on performance, accessibility, and long-term scalability."
      />
      <Gutter>
        <p>Home page content goes here.</p>
      </Gutter>
    </>
  );
};
