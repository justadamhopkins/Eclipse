import { CardShell } from '@atoms/CardShell';
import { ContainedIconShell } from '@atoms/ContainedIconShell';
import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { type IconType } from 'react-icons';
import { PiStackSimple } from 'react-icons/pi';

interface IHeaderProps {
  category: string;
}

const CATEGORIES: Record<string, IconType> = {
  tooling: PiStackSimple,
};

const Header = ({ category, children }: PropsWithChildren<IHeaderProps>) => {
  const ContainedIcon = CATEGORIES[category];

  return (
    <div>
      <ContainedIconShell>
        <ContainedIcon size={18} />
      </ContainedIconShell>
      <h3 className={clsx()}>{children}</h3>
    </div>
  );
};

const Meta = ({ children, className }: TWithClassName<PropsWithChildren>) => (
  <span className={clsx(className)}>{children}</span>
);

const Description = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => (
  <p className={clsx(className)}>{children}</p>
);

export const TechStackCard = ({
  children,
}: TWithClassName<PropsWithChildren>) => {
  return (
    <CardShell>
      <div>{children}</div>
    </CardShell>
  );
};

TechStackCard.Header = Header;
TechStackCard.Meta = Meta;
TechStackCard.Description = Description;
