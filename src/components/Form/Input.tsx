import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div style={styles.wrapper}>
      {label && <label style={styles.label}>{label}</label>}
      <input {...props} style={styles.input} />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
};

const styles: any = {
  wrapper: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 13, fontWeight: 500 },
  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  error: { color: "#dc2626", fontSize: 12 },
};

export default Input;
