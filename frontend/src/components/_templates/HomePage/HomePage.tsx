'use client';

import { type PAGE_QUERY_RESULT } from '@libs/sanity/types/sanity.types';
import { ContactModule } from '@organisms/Modules/ContactModule';
import { TechStackModule } from '@organisms/Modules/TechStackModule';
import { PageModuleRenderer } from '@organisms/PageRenderer';

import { useScrollCtx } from '../../contexts/ScrollProvider';

type THomePageProps = {
  data: NonNullable<PAGE_QUERY_RESULT>;
};

export const HomePage = ({ data }: THomePageProps) => {
  const { setRef } = useScrollCtx();

  return (
    <>
      <PageModuleRenderer data={data} />
      <TechStackModule ref={setRef(3)} />
      <ContactModule ref={setRef(4)} />
    </>
  );
};
