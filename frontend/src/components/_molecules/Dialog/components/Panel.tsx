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
      <Dialog.Backdrop className={styles.dialog__backdrop} />
      <Dialog.Viewport
        className={clsx([
          styles.dialog__viewport,
          styles[`dialog__viewport--${variant}`],
        ])}
      >
        <Dialog.Popup
          className={clsx([
            styles.dialog__popup,
            styles[`dialog__popup--${variant}`],
          ])}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );
};
