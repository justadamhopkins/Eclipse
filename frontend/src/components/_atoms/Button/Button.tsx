import { type PropsWithChildren } from 'react';

// interface IButtonProps {}

export const Button = ({ children }: PropsWithChildren) => {
  return <button>{children}</button>;
};
