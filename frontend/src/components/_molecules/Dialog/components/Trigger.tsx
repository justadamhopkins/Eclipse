import { Dialog, type DialogTriggerProps } from '@base-ui/react/dialog';

export const DialogTrigger = ({ render, ...rest }: DialogTriggerProps) => (
  <Dialog.Trigger
    render={render}
    {...rest}
  />
);
