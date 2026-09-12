import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { Hamburger } from '@atoms/Hamburger';
import { Icon } from '@atoms/Icon';
import { NavigationLink } from '@atoms/Navigation/NavigationLink/NavigationLink';
import { SiteLogo } from '@atoms/SiteLogo';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog, type IDrawerProps } from '@molecules/Dialog';
import { TriangleRightIcon } from '@radix-ui/react-icons';

import styles from './OffCanvasMenu.module.css';

interface IOffCanvasMenuProps {
  isOpen: boolean;
  onOpenChange: IDrawerProps['onOpenChange'];
}

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

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

        <div className={styles.menu}>
          <ScrollArea.Root className={styles.scrollArea}>
            <ScrollArea.Viewport className={styles.viewport}>
              <ScrollArea.Content className={styles.content}>
                <header className={styles.header}>
                  <SiteLogo />
                  <Hamburger />
                </header>
                <div className={styles.primary}>
                  <nav
                    className={styles.navigation}
                    aria-label="Primary"
                  >
                    <ul>
                      {navigationItems.map(({ label, href }) => (
                        <li key={href}>
                          <NavigationLink
                            className={styles.navigationLink}
                            href={href}
                          >
                            {label}
                            <TriangleRightIcon
                              width={28}
                              height={28}
                            />
                          </NavigationLink>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <Button
                    isFullWidth={true}
                    variant="secondary"
                  >
                    Download CV
                  </Button>
                </div>

                <div className={styles.contact}>
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

                  <div className={styles.social}>
                    <a
                      href="https://github.com/"
                      aria-label="GitHub"
                    >
                      <Icon
                        isInline={true}
                        name="githubLogo"
                      />
                    </a>

                    <a
                      href="https://linkedin.com/"
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

            <ScrollArea.Scrollbar className={styles.scrollbar}>
              <ScrollArea.Thumb className={styles.scrollbarThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
