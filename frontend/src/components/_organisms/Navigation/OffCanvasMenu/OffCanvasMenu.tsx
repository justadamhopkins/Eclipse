import { Button } from '@atoms/Button';
import { Eyebrow } from '@atoms/Eyebrow';
import { Hamburger } from '@atoms/Hamburger';
import { IconButton } from '@atoms/IconButton';
import { SiteLogo } from '@atoms/SiteLogo';
import { Text } from '@atoms/Text';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Dialog } from '@molecules/Dialog';
import { ListRenderer } from '@utilities/ListRenderer';
import NextLink from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { LuLinkedin } from 'react-icons/lu';
import { RiGithubLine } from 'react-icons/ri';

import styles from './OffCanvasMenu.module.css';

interface IOffCanvasMenuProps {
  isOpen: boolean;
  handleMenuToggle: () => void;
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
  handleMenuToggle,
}: IOffCanvasMenuProps) => {
  return (
    <Dialog open={isOpen}>
      <Dialog.Panel variant="right">
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

        <div className={styles.menu}>
          <ScrollArea.Root className={styles.scrollArea}>
            <ScrollArea.Viewport className={styles.viewport}>
              <ScrollArea.Content className={styles.content}>
                <header className={styles.header}>
                  <SiteLogo />
                  <Hamburger
                    isOpen={isOpen}
                    onToggle={handleMenuToggle}
                  />
                </header>
                <div className={styles.primary}>
                  <nav
                    className={styles.navigation}
                    aria-label="Primary"
                  >
                    <ul>
                      <ListRenderer
                        items={navigationItems}
                        render={({ item }) => (
                          <li key={item.href}>
                            <Text
                              variant="headingLg"
                              as={NextLink}
                              className={styles.navigationLink}
                              href={item.href}
                            >
                              {item.label}
                              <IoIosArrowForward
                                width={28}
                                height={28}
                              />
                            </Text>
                          </li>
                        )}
                      />
                    </ul>
                  </nav>
                </div>

                <div className={styles.actionContainer}>
                  <Button
                    as={NextLink}
                    href="/documents/Adam_Hopkins_CV.pdf"
                    target="_blank"
                    isFullWidth={true}
                    variant="secondary"
                  >
                    View CV
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
                        href="https://github.com/justadamhopkins"
                        variant="secondary"
                        icon={<RiGithubLine size={18} />}
                      />
                    </li>
                    <li>
                      <IconButton
                        as={NextLink}
                        href="https://www.linkedin.com/in/adamhopkins1989/"
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
