import { type TMaybeUndefined } from '@typings/utils';
import React, { type FC, type PropsWithChildren, use, useMemo } from 'react';
import { isDefined } from 'ts-extras';

export const createContext = <ContextValueType extends object>(
  rootComponentName: string,
) => {
  const Context =
    React.createContext<TMaybeUndefined<ContextValueType>>(undefined);

  Context.displayName = `${rootComponentName}Context`;

  const Provider: FC<PropsWithChildren<ContextValueType>> = props => {
    const { children, ...context } = props;

    const value = useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context),
    ) as ContextValueType;
    return <Context value={value}>{children}</Context>;
  };

  Provider.displayName = `${rootComponentName}Provider`;

  const useContext = (consumerName: string) => {
    const context = use(Context);

    if (!isDefined(context)) {
      throw new Error(
        `${consumerName} must be used within a ${Provider.displayName}`,
      );
    }

    return context;
  };

  return [Provider, useContext] as const;
};
