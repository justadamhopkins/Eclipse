import { Dialog, type DialogCloseProps } from '@base-ui/react/dialog';

export const DialogClose = ({ render, ...rest }: DialogCloseProps) => (
  <Dialog.Close
    render={render}
    {...rest}
  />
);
