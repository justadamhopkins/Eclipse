import {
  Drawer as BaseDrawer,
  type DrawerCloseProps,
} from '@base-ui/react/drawer';

export const DrawerClose = ({ render, ...rest }: DrawerCloseProps) => (
  <BaseDrawer.Close
    render={render}
    {...rest}
  />
);
