// polymorphic.ts
import {
  type ComponentPropsWithRef,
  type ComponentRef,
  type ElementType,
  type Ref,
} from 'react';

/**
 * The `ref` type for whatever `as` resolves to.
 * Only needed if you handle a ref explicitly inside a component body —
 * `TPolymorphicProps` already includes `ref`.
 */
export type TPolymorphicRef<C extends ElementType> = Ref<ComponentRef<C>>;

/** Your props + `as` + `ref` + the underlying element's props (yours win on collision). */
export type TPolymorphicProps<C extends ElementType, Props = object> = Props & {
  as?: C;
} & Omit<ComponentPropsWithRef<C>, 'as' | keyof Props>;
