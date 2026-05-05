import {
  Drawer as BaseDrawer,
  type DrawerRootProps,
} from '@base-ui/react/drawer';
import { DrawerClose } from '@molecules/Drawer/components/CloseTrigger';
import { DrawerPanel } from '@molecules/Drawer/components/Panel';
import { DrawerTrigger } from '@molecules/Drawer/components/Trigger';
import  { type ReactNode } from 'react';

interface IDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: DrawerRootProps['onOpenChange'];
}

export const Drawer = ({ children, open, onOpenChange }: IDrawerProps) => {
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

Drawer.Trigger = DrawerTrigger;
Drawer.Panel = DrawerPanel;
Drawer.CloseTrigger = DrawerClose;
