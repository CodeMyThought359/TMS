import React from "react";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text = "Click Me", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#c93c11",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
