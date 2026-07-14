import styles from './Chip.module.css';

export interface IChipProps {
  label: string;
}

export const Chip = ({ label }: IChipProps) => {
  return <span className={styles.chip}>{label}</span>;
};
