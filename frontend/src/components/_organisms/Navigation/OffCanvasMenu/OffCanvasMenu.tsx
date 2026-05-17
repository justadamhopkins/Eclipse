import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { Icon } from '@atoms/Icon';
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
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
        <div className={styles.offCanvasMenu}>
          <ScrollArea.Root className={styles.offCanvasMenu__body}>
            <ScrollArea.Viewport className={styles.offCanvasMenu__viewport}>
              <ScrollArea.Content className={styles.offCanvasMenu__content}>
                <div className={styles.offCanvasMenu__primary}>
                  <nav
                    className={styles.offCanvasMenu__navSection}
                    aria-label="Primary"
                  >
                    <ul>
                      <li>
                        <NavigationLink
                          className={styles.offCanvasMenu__navLink}
                          href="/"
                        >
                          Home
                          <TriangleRightIcon
                            width={28}
                            height={28}
                          />
                        </NavigationLink>
                      </li>
                      <li>
                        <NavigationLink
                          className={styles.offCanvasMenu__navLink}
                          href="/about"
                        >
                          About
                          <TriangleRightIcon
                            width={28}
                            height={28}
                          />
                        </NavigationLink>
                      </li>
                    </ul>
                  </nav>
                  <Button
                    isFullWidth={true}
                    variant="secondary"
                  >
                    Download CV
                  </Button>
                </div>
                <div className={styles.offCanvasMenu__contactSection}>
                  <div>
                    <Eyebrow
                      variant="primary"
                      size="lg"
                      label="Get in touch"
                    />
                    <a href="mailto:adamhopkins87@gmail.com">
                      adamhopkins87@gmail.com
                    </a>
                  </div>
                  <div className={styles.offCanvasMenu__socialBar}>
                    <a
                      href="mailto:adamhopkins87@gmail.com"
                      aria-label="GitHub"
                    >
                      <Icon
                        isInline={true}
                        name="githubLogo"
                      />
                    </a>
                    <a
                      href="mailto:adamhopkins87@gmail.com"
                      aria-label="LinkedIn"
                    >
                      <Icon
                        isInline={true}
                        name="linkedInLogo"
                      />
                    </a>
                  </div>
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className={styles.offCanvasMenu__scrollbar}>
              <ScrollArea.Thumb
                className={styles.offCanvasMenu__scrollbarThumb}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
