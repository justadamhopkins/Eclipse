import { SiteLogo } from '@atoms/SiteLogo';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog } from '@molecules/Dialog';
import { type FC, useState } from 'react';

import styles from './OffCanvasMenu.module.css';

interface IOffCanvasMenuProps {}

export const OffCanvasMenu: FC<IOffCanvasMenuProps> = (
  props: IOffCanvasMenuProps,
) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger
        render={<button style={{ color: 'white' }}>Dialog Trigger</button>}
      />
      <Dialog.Panel variant="right">
        <div className={styles.offCanvasMenu__header}>
          <SiteLogo />
          hdhd
        </div>
        <ScrollArea.Root className={styles.Body}>
          <ScrollArea.Viewport className={styles.BodyViewport}>
            <ScrollArea.Content className={styles.BodyContent}>
              {Array.from({ length: 100 }).map((_, i) => (
                <p key={i}>{`Item ${i + 1}`}</p>
              ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={styles.Scrollbar}>
            <ScrollArea.Thumb className={styles.ScrollbarThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Dialog.Panel>
    </Dialog>
  );
};
