import { Gutter } from '@atoms/Gutter';
import { CoverHero } from '@organisms/Heros/CoverHero';

export const HomePage = () => {
  return (
    <Gutter>
      <CoverHero
        label="Software engineer"
        title="Hi, i am Adam Hopkins"
        subtitle="Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth."
      />
      <p>Home page content goes here.</p>
    </Gutter>
  );
};
