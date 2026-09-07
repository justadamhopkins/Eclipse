import { ButtonBase, type TButtonBaseProps } from '@atoms/ButtonBase';
import { type ElementType } from 'react';

type TButtonProps<C extends ElementType> = TButtonBaseProps<C>;

export const Button = <C extends ElementType = 'button'>(
  props: TButtonProps<C>,
) => <ButtonBase {...props} />;
