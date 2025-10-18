

import React from "react";
import "./Input.css";

export default function Input({ label, type = "text", value, onChange, placeholder, name }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}
