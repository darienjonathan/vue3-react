type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TextInput: React.FC<Props> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <input type="text" value={value} onChange={handleInputChange} />;
};
