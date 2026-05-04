import { Drawer as BaseDrawer } from '@base-ui/react/drawer';

export const DrawerPanel = () => {
  return (
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
  );
};
