import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { Hamburger } from '@atoms/Hamburger';
import { IconButton } from '@atoms/IconButton';
import { SiteLogo } from '@atoms/SiteLogo';
import { Text } from '@atoms/Text';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog, type IDrawerProps } from '@molecules/Dialog';
import NextLink from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { LuLinkedin } from 'react-icons/lu';
import { RiGithubLine } from 'react-icons/ri';

import styles from './OffCanvasMenu.module.css';

interface IOffCanvasMenuProps {
  isOpen: boolean;
  onOpenChange: IDrawerProps['onOpenChange'];
}

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/' },
  { label: 'Experience', href: '/' },
  { label: 'Tools', href: '/' },
  { label: 'Contact', href: '/' },
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
                  <Hamburger isOpen={isOpen} />
                </header>
                <div className={styles.primary}>
                  <nav
                    className={styles.navigation}
                    aria-label="Primary"
                  >
                    <ul>
                      {navigationItems.map(({ label, href }) => (
                        <li key={href}>
                          <Text
                            variant="headingLg"
                            as={NextLink}
                            className={styles.navigationLink}
                            href={href}
                          >
                            {label}
                            <IoIosArrowForward
                              width={28}
                              height={28}
                            />
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className={styles.actionContainer}>
                  <Button
                    isFullWidth={true}
                    variant="secondary"
                  >
                    Download CV
                  </Button>
                </div>
                <div className={styles.contactContainer}>
                  <Eyebrow
                    variant="primary"
                    size="lg"
                    label="Get in touch"
                  />

                  <ul className={styles.ctaRow}>
                    <li>
                      <Button
                        as={NextLink}
                        href="#footer"
                        variant="primary"
                        isFullWidth={true}
                      >
                        Email me
                      </Button>
                    </li>
                    <li>
                      <IconButton
                        as={NextLink}
                        href="/contact"
                        variant="secondary"
                        icon={<RiGithubLine size={18} />}
                      />
                    </li>
                    <li>
                      <IconButton
                        as={NextLink}
                        href="/contact"
                        variant="secondary"
                        icon={<LuLinkedin size={18} />}
                      />
                    </li>
                  </ul>
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
