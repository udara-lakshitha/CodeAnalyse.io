// src/components/Button.tsx
import React from 'react';

// Our Button can accept any standard button props.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
        style={{
            width: '100%',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
        }}
        {...props}
    >
        {children}
    </button>
  );
};

export default Button;