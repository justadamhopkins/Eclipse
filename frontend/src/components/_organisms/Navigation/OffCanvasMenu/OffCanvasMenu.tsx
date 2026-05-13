import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog, type IDrawerProps } from '@molecules/Dialog';
import { TriangleRightIcon } from '@radix-ui/react-icons';

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
        <div className={styles.offCanvasMenu}>
          <ScrollArea.Root className={styles.offCanvasMenu__body}>
            <ScrollArea.Viewport className={styles.offCanvasMenu__viewport}>
              <ScrollArea.Content className={styles.offCanvasMenu__content}>
                <div className={styles.offCanvasMenu__navSection}>
                  <nav className={styles.offCanvasMenu__navContainer}>
                    <ul>
                      <li>
                        <NavigationLink
                          className={styles.offCanvasMenu__navLink}
                          href="/"
                        >
                          Home
                          <span>
                            <TriangleRightIcon
                              width={28}
                              height={28}
                            />
                          </span>
                        </NavigationLink>
                      </li>
                      <li>
                        <NavigationLink
                          className={styles.offCanvasMenu__navLink}
                          href="/about"
                        >
                          About
                          <span>
                            <TriangleRightIcon
                              width={28}
                              height={28}
                            />
                          </span>
                        </NavigationLink>
                      </li>
                    </ul>
                  </nav>
                  <Button variant="secondary">Download CV</Button>
                </div>
                <div className={styles.offCanvasMenu__contactSection}>
                  <Eyebrow
                    variant="primary"
                    size="lg"
                    label="Get in touch"
                  />
                  <a href="mailto:adamhopkins87@gmail.com">
                    adamhopkins87@gmail.com
                  </a>
                  <p>social icons tbc</p>
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className={styles.Scrollbar}>
              <ScrollArea.Thumb className={styles.ScrollbarThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
