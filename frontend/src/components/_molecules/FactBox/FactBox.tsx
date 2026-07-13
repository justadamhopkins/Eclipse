import { ListRenderer } from '@utilities/ListRenderer';
import clsx from 'clsx';
import { type FC } from 'react';

import styles from './FactBox.module.css';

export interface IFactBoxProps {
  facts: { title: string; value: string }[];
}

export const FactBox: FC<IFactBoxProps> = ({ facts }) => {
  return (
    <article className={clsx(['u-flow--s', styles.factBox])}>
      <h3>Quick facts</h3>
      <div className={styles.factBox__factList}>
        <ListRenderer
          items={facts}
          render={({ item }) => (
            <div
              key={item.title}
              className={styles.factBox__factItem}
            >
              <dt className={styles.factBox__factItemTitle}>{item.title}:</dt>
              <dd className={styles.factBox__factItemValue}>{item.value}</dd>
            </div>
          )}
        />
      </div>
    </article>
  );
};
