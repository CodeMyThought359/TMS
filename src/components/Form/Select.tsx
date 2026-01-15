import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div style={styles.wrapper}>
      {label && <label style={styles.label}>{label}</label>}
      <select {...props} style={styles.select}>
        <option value="">Select</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles: any = {
  wrapper: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 13, fontWeight: 500 },
  select: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    background: "#fff",
  },
};

export default Select;
