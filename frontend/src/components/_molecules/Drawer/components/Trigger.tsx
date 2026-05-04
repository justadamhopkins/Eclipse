import {
  Drawer as BaseDrawer,
  type DrawerTriggerProps,
} from '@base-ui/react/drawer';

export const DrawerTrigger = ({ render, ...rest }: DrawerTriggerProps) => (
  <BaseDrawer.Trigger
    render={render}
    {...rest}
  />
);
