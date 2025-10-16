

import React from "react";
import "./Select.css"; // 👈 import CSS

export default function Select({ name, value, onChange, options = [] }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="select"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
