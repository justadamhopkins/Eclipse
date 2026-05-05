import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import  { type ReactNode } from 'react';

import styles from '../Drawer.module.css';

interface IDrawerPanelProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const DrawerPanel = ({
  children,
  title,
  description,
}: IDrawerPanelProps) => {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={styles.drawer__backdrop} />
      <BaseDrawer.Viewport className={styles.drawer__viewport}>
        <BaseDrawer.Popup className={styles.drawer__popup}>
          <BaseDrawer.Content className={styles.drawer__content}>
            <BaseDrawer.Title className={styles.drawer__title}>
              {title}
            </BaseDrawer.Title>
            {description && (
              <BaseDrawer.Description className={styles.drawer__description}>
                {description}
              </BaseDrawer.Description>
            )}
            {children}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
};
