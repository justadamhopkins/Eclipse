import { Dialog, type DialogDescriptionProps } from '@base-ui/react/dialog';

export const DialogDescription = ({
  render,
  ...rest
}: DialogDescriptionProps) => (
  <Dialog.Description
    render={render}
    {...rest}
  />
);
