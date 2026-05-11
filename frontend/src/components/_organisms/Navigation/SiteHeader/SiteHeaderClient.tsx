'use client';

import { Hamburger } from '@atoms/Hamburger';
import { useDisclosure } from '@hooks/useDisclosure/useDisclosure';
import { OffCanvasMenu } from '@organisms/Navigation/OffCanvasMenu';

export const SiteHeaderClient = () => {
  const { isOpen, toggle, open } = useDisclosure();

  return (
    <>
      <Hamburger
        isOpen={isOpen}
        onToggle={toggle}
      />
      <OffCanvasMenu
        isOpen={isOpen}
        onOpenChange={open}
      />
    </>
  );
};
