interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({
  label,
  name,
  value,
  options,
  onChange,
}: RadioGroupProps) => {
  return (
    <div>
      {label && <label style={styles.label}>{label}</label>}
      <div style={styles.group}>
        {options.map(opt => (
          <label key={opt.value} style={styles.radio}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

const styles: any = {
  label: { fontSize: 13, fontWeight: 500 },
  group: { display: "flex", gap: 16 },
  radio: { fontSize: 14 },
};

export default RadioGroup;
