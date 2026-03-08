import { Fragment, type Key, type ReactNode } from 'react';

type TMaybeWithId<T> = T & { id?: string };

type TListRendererArgs<T> = {
  item: TMaybeWithId<T>;
  index: number;
  self: TMaybeWithId<T>[];
};

export type TListRendererProps<T> = {
  items: TMaybeWithId<T>[];
  render: (args: TListRendererArgs<T>) => ReactNode;
  getId?: (args: TListRendererArgs<T>) => Key;
};

export function ListRenderer<T>({
  items,
  getId,
  render,
}: TListRendererProps<T>) {
  return items.map((item, index, self) => {
    if (!item) {
      return null;
    }

    return (
      <Fragment key={getId?.({ item, self, index }) || item?.id || index}>
        {render({ item, self, index })}
      </Fragment>
    );
  });
}
