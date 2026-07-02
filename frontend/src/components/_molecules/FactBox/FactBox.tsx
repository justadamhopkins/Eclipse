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
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        )}
      />
    </article>
  );
};
