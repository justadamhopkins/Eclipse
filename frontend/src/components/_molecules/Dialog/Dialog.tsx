import {
  Drawer as BaseDrawer,
  type DrawerRootProps,
} from '@base-ui/react/drawer';
import { type ReactNode } from 'react';

import { DialogClose } from './components/CloseTrigger';
import { DialogDescription } from './components/Description';
import { DialogPanel } from './components/Panel';
import { DialogTitle } from './components/Title';
import { DialogTrigger } from './components/Trigger';

export interface IDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: DrawerRootProps['onOpenChange'];
}

export const Dialog = ({ children, open, onOpenChange }: IDrawerProps) => {
  return (
    <BaseDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection="right"
    >
      {children}
    </BaseDrawer.Root>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Title = DialogTitle;
Dialog.Title = DialogDescription;
Dialog.Panel = DialogPanel;
Dialog.CloseTrigger = DialogClose;
