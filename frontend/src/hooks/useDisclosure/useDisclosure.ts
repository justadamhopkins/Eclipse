import { useCallback, useState } from 'react';

export type TUseDisclosureProps = {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (isOpen: boolean) => void;
};

export type TUseDisclosureReturn = ReturnType<typeof useDisclosure>;

export const useDisclosure = ({
  isOpen: controlledIsOpen,
  defaultIsOpen = false,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  onChange,
}: TUseDisclosureProps = {}) => {
  const isControlled = controlledIsOpen !== undefined;

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen);

  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(value);
      }

      if (value) {
        onOpenProp?.();
      } else {
        onCloseProp?.();
      }

      onChange?.(value);
    },
    [isControlled, onChange, onOpenProp, onCloseProp],
  );

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
