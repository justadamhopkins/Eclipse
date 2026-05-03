import {
  Drawer as BaseDrawer,
  type DrawerRootProps,
} from '@base-ui/react/drawer';
import { type FC } from 'react';

interface IDrawerProps {
  isOpen: boolean;
  onOpenChange: DrawerRootProps['onOpenChange'];
}

export const Drawer: FC<IDrawerProps> = ({ isOpen, onOpenChange }) => {
  return (
    <BaseDrawer.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <BaseDrawer.Trigger>Open</BaseDrawer.Trigger>
      <BaseDrawer.Portal>
        <BaseDrawer.Viewport>
          <BaseDrawer.Popup>
            <BaseDrawer.Content>
              <BaseDrawer.Title>Example drawer</BaseDrawer.Title>
              <BaseDrawer.Close>Close</BaseDrawer.Close>
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
};
