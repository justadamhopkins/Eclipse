import { Dialog } from '@base-ui/react/dialog';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

import styles from '../Dialog.module.css';

interface IDrawerPanelProps {
  variant: 'right';
}

export const DialogPanel = ({
  children,
  variant,
}: PropsWithChildren<IDrawerPanelProps>) => {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />

      <Dialog.Viewport className={clsx(styles.viewport, styles[variant])}>
        <Dialog.Popup className={clsx(styles.popup, styles[variant])}>
          {children}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );
};
