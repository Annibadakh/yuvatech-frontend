// Button.jsx
import React from 'react';

function Button({ type, color, onClick, children }) {
  return (
    <button type={type} className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
