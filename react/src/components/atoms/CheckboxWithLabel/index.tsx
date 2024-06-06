import styles from "./index.module.css";

type Props = {
  className?: string;
  label: string;
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
};

export const CheckboxWithLabel: React.FC<Props> = ({
  className = "",
  label,
  isChecked = false,
  onCheckboxChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(event.target.checked);
  };

  return (
    <label className={`${styles.checkboxWithLabel} ${className}`}>
      <input
        type="checkbox"
        className={styles.CheckboxWithLabel_checkbox}
        defaultChecked={isChecked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};
