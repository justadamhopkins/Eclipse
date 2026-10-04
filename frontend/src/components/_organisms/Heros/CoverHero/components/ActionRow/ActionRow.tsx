import { Button } from '@atoms/Button'; // your paths
import { IconButton } from '@atoms/IconButton'; // your paths
import {
  type TLinkItem,
  type TSocialLinkItem,
  type TSocialPlatform,
} from '@typings/client';
import { hasArrayGotValues } from '@utils/primitives/boolean';
import NextLink from 'next/link';
import { type ReactNode } from 'react';
import { LuLinkedin } from 'react-icons/lu';
import { RiGithubLine } from 'react-icons/ri';

import styles from './ActionRow.module.css';

export type TActionRowItem = TLinkItem | TSocialLinkItem;

const SOCIALS: Record<TSocialPlatform, { icon: ReactNode }> = {
  GITHUB: { icon: <RiGithubLine size={18} /> },
  LINKEDIN: { icon: <LuLinkedin size={18} /> },
};

export const ActionRowItem = ({ item }: { item: TActionRowItem }) => {
  switch (item.type) {
    case 'link':
      return (
        <Button
          as={NextLink}
          href={item.href}
          variant="primary"
        >
          {item.label}
        </Button>
      );
    case 'socialProfile': {
      const { icon } = SOCIALS[item.platform];

      return (
        <IconButton
          as={NextLink}
          href={item.href}
          variant="secondary"
          icon={icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </IconButton>
      );
    }
    default: {
      return null;
    }
  }
};

export const ActionRow = ({ items }: { items: TActionRowItem[] }) => {
  if (!hasArrayGotValues(items)) {
    return null;
  }

  return (
    <ul className={styles.actionRow}>
      {items.map(item => (
        <li key={item.id}>
          <ActionRowItem item={item} />
        </li>
      ))}
    </ul>
  );
};
