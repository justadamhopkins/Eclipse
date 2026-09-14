'use client';

import { type TMaybe } from '@typings/utils';
import { createContext } from '@utilities/create-context';
import {
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useRef,
} from 'react';

const [ScrollCtx, useContext] = createContext<{
  setRef: (index: number) => (element: TMaybe<HTMLElement>) => void;
  scrollTo: (index: number) => void;
  refs: RefObject<HTMLElement[]>;
}>('ScrollProvider');

export const useScrollCtx = () => useContext('ScrollProvider');

export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const refs = useRef<HTMLElement[]>([]);

  const setRef = useCallback(
    (index: number) => (element: TMaybe<HTMLElement>) => {
      if (element) {
        refs.current[index] = element;
      }
    },
    [],
  );

  const scrollTo = useCallback((index: number) => {
    refs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <ScrollCtx
      refs={refs}
      setRef={setRef}
      scrollTo={scrollTo}
    >
      {children}
    </ScrollCtx>
  );
};
