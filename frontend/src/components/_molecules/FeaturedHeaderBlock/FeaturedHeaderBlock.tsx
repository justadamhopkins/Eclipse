import { Text } from '@atoms/Text';

import styles from './FeaturedHeaderBlock.module.css';

type TFeaturedHeaderBlockProps = {
  title: string;
  children?: React.ReactNode;
};

export const FeaturedHeaderBlock = ({
  title,
  children,
}: TFeaturedHeaderBlockProps) => {
  return (
    <div className={styles.featuredHeaderBlock}>
      <header>
        <Text
          variant="headingMd"
          as="h2"
        >
          {title}
        </Text>
      </header>
      {children}
    </div>
  );
};
