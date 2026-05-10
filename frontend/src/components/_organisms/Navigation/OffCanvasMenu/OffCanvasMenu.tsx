import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog, type IDrawerProps } from '@molecules/Dialog';

import styles from './OffCanvasMenu.module.css';

interface IOffCanvasMenuProps {
  isOpen: boolean;
  onOpenChange: IDrawerProps['onOpenChange'];
}

export const OffCanvasMenu = ({
  isOpen,
  onOpenChange,
}: IOffCanvasMenuProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Panel variant="right">
        <div className={styles.offCanvasMenu__header}></div>
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
