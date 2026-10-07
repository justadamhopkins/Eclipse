'use client';

import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { PageModuleRenderer } from '@organisms/PageRenderer';

type THomePageProps = {
  data: NonNullable<PAGE_QUERY_RESULT>;
};

export const HomePage = ({ data }: THomePageProps) => {
  return <PageModuleRenderer data={data} />;
};
