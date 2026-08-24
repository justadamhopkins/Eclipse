import { Text } from '@atoms/Text';

import styles from './Chip.module.css';
export interface IChipProps {
  label: string;
}

export const Chip = ({ label }: IChipProps) => {
  return (
    <Text
      as="span"
      className={styles.chip}
    >
      {label}
    </Text>
  );
};
