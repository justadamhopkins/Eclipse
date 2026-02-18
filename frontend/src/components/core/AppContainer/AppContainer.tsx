import { type FC, type ReactNode } from 'react';

interface IAppContainerProps {
  children: ReactNode;
}

export const AppContainer: FC<IAppContainerProps> = ({ children }) => {
  return (
    <main>
      <h1 className="text-3xl font-bold text-red-700 underline">
        Hello world!
      </h1>
      {children}
    </main>
  );
};
