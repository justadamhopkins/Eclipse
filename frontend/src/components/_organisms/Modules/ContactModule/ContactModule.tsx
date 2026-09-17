import { IconButton } from '@atoms/IconButton';
import { ModuleSectionWrapper } from '@atoms/ModuleSectionWrapper';
import { Text } from '@atoms/Text';
import { FeaturedHeaderBlock } from '@molecules/FeaturedHeaderBlock';
import NextLink from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';

import styles from './ContactModule.module.css';

export const ContactModule = ({ ...rest }) => {
  return (
    <ModuleSectionWrapper
      variant="secondary"
      {...rest}
    >
      <FeaturedHeaderBlock
        title="Contact"
        variant="secondary"
      >
        <div className={styles.contactMeInnerWrapper}>
          <Text
            as="h3"
            variant="headingXl"
          >
            Have a project in mind? Send me an email
          </Text>
          <IconButton
            isLabelHiddenOnMobile={false}
            variant="tertiary"
            as={NextLink}
            href="mailto:adamhopkins87@gmail.com"
            icon={<MdOutlineEmail size={18} />}
          >
            Contact me
          </IconButton>
        </div>
      </FeaturedHeaderBlock>
    </ModuleSectionWrapper>
  );
};
