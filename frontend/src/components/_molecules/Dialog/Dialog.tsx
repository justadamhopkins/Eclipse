import {
  Dialog as BaseDialog,
  type DialogRootProps,
} from '@base-ui/react/dialog';
import { type ReactNode } from 'react';

import { DialogClose } from './components/CloseTrigger';
import { DialogDescription } from './components/Description';
import { DialogPanel } from './components/Panel';
import { DialogTitle } from './components/Title';
import { DialogTrigger } from './components/Trigger';

export interface IDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: DialogRootProps['onOpenChange'];
}

export const Dialog = ({ children, open, onOpenChange }: IDrawerProps) => {
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </BaseDialog.Root>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Title = DialogTitle;
Dialog.Title = DialogDescription;
Dialog.Panel = DialogPanel;
Dialog.CloseTrigger = DialogClose;
