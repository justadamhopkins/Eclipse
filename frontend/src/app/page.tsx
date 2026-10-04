import { sanityFetch } from '@libs/sanity/client';
import { PAGE_QUERY } from '@libs/sanity/queries/page';
import { HomePage } from '@templates/HomePage';

const HomePageRoot = async () => {
  const data = await sanityFetch({
    query: PAGE_QUERY,
    params: {
      slug: '/',
    },
  });

  console.info('HomePageRoot', data);

  return <HomePage />;
};

export default HomePageRoot;
