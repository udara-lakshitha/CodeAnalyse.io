import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
            {label}
        </label>
        <input
            style = {{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box', // Important for consistent sizing
            }}
            {...props} // This passes down all other props like 'type', 'placeholder', 'onChange', etc.
        />
        </div>
    )
}

export default Input