import {
  Drawer as BaseDrawer,
  type DrawerRootProps,
} from '@base-ui/react/drawer';
import { DrawerPanel } from '@molecules/Drawer/components/Panel';
import { DrawerTrigger } from '@molecules/Drawer/components/Trigger';

interface IDrawerProps {
  isOpen: boolean;
  onOpenChange: DrawerRootProps['onOpenChange'];
}

export const Drawer = ({ isOpen, onOpenChange }: IDrawerProps) => {
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

Drawer.Trigger = DrawerTrigger;
Drawer.Panel = DrawerPanel;
