import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
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
        <ScrollArea.Root className={styles.offCanvasMenu__body}>
          <ScrollArea.Viewport className={styles.offCanvasMenu__viewport}>
            <ScrollArea.Content className={styles.offCanvasMenu__content}>
              <h3>Navigation</h3>
              <nav className={styles.offCanvasMenu__navContainer}>
                <ul>
                  <li>
                    <NavigationLink
                      className={styles.offCanvasMenu__navLink}
                      href="/"
                    >
                      Home
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      className={styles.offCanvasMenu__navLink}
                      href="/about"
                    >
                      About
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      className={styles.offCanvasMenu__navLink}
                      href="/about"
                    >
                      Download cv
                    </NavigationLink>
                  </li>
                </ul>
              </nav>
              <div>
                <h3>Get in touch</h3>
                <p>adamhopkins87@gmail.com</p>
              </div>
              <div>
                <p>social icons tbc</p>
              </div>
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
