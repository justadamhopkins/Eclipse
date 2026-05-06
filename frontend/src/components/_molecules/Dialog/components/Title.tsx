import { Dialog, type DialogTitleProps } from '@base-ui/react/dialog';

export const DialogTitle = ({ render, ...rest }: DialogTitleProps) => (
  <Dialog.Title
    render={render}
    {...rest}
  />
);
