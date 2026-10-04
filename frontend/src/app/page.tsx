import { sanityFetch } from '@libs/sanity/client';
import { PAGE_QUERY } from '@libs/sanity/queries/page';
import { HomePage } from '@templates/HomePage';
import { notFound } from 'next/navigation';

const HomePageRoot = async () => {
  const data = await sanityFetch<typeof PAGE_QUERY>({
    query: PAGE_QUERY,
    params: {
      slug: '/',
    },
  });

  if (!data) {
    notFound();
  }

  return <HomePage data={data} />;
};

export default HomePageRoot;
