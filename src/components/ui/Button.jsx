

import React from "react";
import "./Button.css";

export default function Button({ children, onClick, type = "button", variant = "primary", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""}`}
    >
      {children}
    </button>
  );
}
