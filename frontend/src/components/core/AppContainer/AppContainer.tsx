import { type FC, type ReactNode } from 'react';

interface IAppContainerProps {
  children: ReactNode;
}

export const AppContainer: FC<IAppContainerProps> = ({ children }) => {
  return (
    <main>
      <h1>Hello world!</h1>
      {children}
    </main>
  );
};
