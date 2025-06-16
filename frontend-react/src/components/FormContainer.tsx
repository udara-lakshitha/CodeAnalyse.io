import React from 'react';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a202c' }}>{title}</h2>
      {children}
    </div>
  );
};

export default FormContainer;