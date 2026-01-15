interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary";
}

const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      style={{
        ...styles.base,
        ...styles[variant],
      }}
    />
  );
};

const styles: any = {
  base: {
    padding: "10px 16px",
    borderRadius: 6,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
  },
  primary: { background: "#2563eb", color: "#fff" },
  danger: { background: "#dc2626", color: "#fff" },
  secondary: { background: "#e5e7eb" },
};

export default Button;
