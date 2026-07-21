import { CardShell } from '@atoms/CardShell';
import { Chip, type IChipProps } from '@atoms/Chip';
import { ContainedIconShell } from '@atoms/ContainedIconShell';
import { type TWithClassName } from '@typings/utils';
import { ListRenderer } from '@utilities/ListRenderer';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import {
  PiArrowsInCardinal,
  PiBracketsAngleBold,
  PiFrameCornersLight,
  PiStackSimple,
} from 'react-icons/pi';

import styles from './TechStackCard.module.css';

const CATEGORIES = {
  tooling: PiArrowsInCardinal,
  infrastructure: PiStackSimple,
  languages: PiBracketsAngleBold,
  frameworks: PiFrameCornersLight,
};

interface IHeaderProps {
  category: keyof typeof CATEGORIES;
}

const Header = ({ category, children }: PropsWithChildren<IHeaderProps>) => {
  const ContainedIcon = CATEGORIES[category];

  return (
    <div className={styles.techStackCard__header}>
      <ContainedIconShell>
        <ContainedIcon size={18} />
      </ContainedIconShell>
      <h3 className={clsx()}>{children}</h3>
    </div>
  );
};

interface IListBodyProps {
  tags: IChipProps[];
}

const ListBody = ({ tags }: IListBodyProps) => (
  <ul className={styles.techStackCard__listBody}>
    <ListRenderer
      items={tags}
      render={({ item }) => (
        <li>
          <Chip
            key={item.label}
            label={item.label}
          />
        </li>
      )}
    />
  </ul>
);

export const TechStackCard = ({
  children,
}: TWithClassName<PropsWithChildren>) => {
  return (
    <CardShell>
      <div className={clsx(['u-flow--m'])}>{children}</div>
    </CardShell>
  );
};

TechStackCard.Header = Header;
TechStackCard.ListBody = ListBody;
