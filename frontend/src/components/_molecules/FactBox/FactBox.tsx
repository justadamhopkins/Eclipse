import { ListRenderer } from '@utilities/ListRenderer';
import { type FC } from 'react';

import styles from './FactBox.module.css';

export interface IFactBoxProps {
  facts: { title: string; value: string }[];
}

export const FactBox: FC<IFactBoxProps> = ({ facts }) => {
  return (
    <article className={styles.factBox}>
      <ListRenderer
        items={facts}
        render={({ item }) => (
          <div
            key={item.title}
            className={styles.factBox__factItem}
          >
            <h3 className={styles.factBox__factItemTitle}>{item.title}</h3>
            <p className={styles.factBox__factItemValue}>{item.value}</p>
          </div>
        )}
      />
    </article>
  );
};
