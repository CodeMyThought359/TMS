

import React from "react";
import "./Dialog.css";

export default function Dialog({ open, onClose, title, description, actions, children }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button onClick={onClose} className="dialog-close">✖</button>
        </div>

        {description && <p className="dialog-description">{description}</p>}

        {children && <div className="dialog-children">{children}</div>}

        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}

