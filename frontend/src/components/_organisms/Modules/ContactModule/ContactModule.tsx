import { IconButton } from '@atoms/IconButton';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import { type TLinkItem } from '@typings/client';
import { type TMaybe } from '@typings/utils';
import NextLink from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';

import styles from './ContactModule.module.css';

export interface IContactModuleProps {
  title: string;
  heading: string;
  action: TLinkItem;
  ref: (element: TMaybe<HTMLElement>) => void;
}

export const ContactModule = ({
  title,
  heading,
  action,
  ...rest
}: IContactModuleProps) => {
  return (
    <ModuleSectionWrapper
      variant="secondary"
      {...rest}
    >
      <FeaturedHeaderBlock
        title={title}
        variant="secondary"
      >
        <div className={styles.contactMeInnerWrapper}>
          <Text
            as="h3"
            variant="headingXl"
          >
            {heading}
          </Text>
          <IconButton
            isLabelHiddenOnMobile={false}
            variant="tertiary"
            as={NextLink}
            href={action.href}
            icon={<MdOutlineEmail size={18} />}
          >
            {action.label}
          </IconButton>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
