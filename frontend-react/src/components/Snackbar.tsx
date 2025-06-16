import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  // NEW: State to control the visibility for animation
  const [isVisible, setIsVisible] = useState(false);

  // This useEffect runs once when the component mounts
  useEffect(() => {
    // 1. Make the snackbar visible to trigger the "slide in" animation
    // We use a short timeout to ensure the component is in the DOM before we change its class/style
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // 2. Set a timer to start the "slide out" animation
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    // 3. Set a final timer to call the onClose prop to remove the component from the DOM
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3000); // Total lifespan is 3 seconds

    // Cleanup function to clear all timers if the component unmounts
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: `translateX(-50%) ${isVisible ? 'translateY(0)' : 'translateY(-150%)'}`,
    padding: '12px 20px',
    borderRadius: '6px',
    color: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    zIndex: 1000,
    minWidth: '320px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
  };

  const typeStyles = {
    success: { backgroundColor: '#2EC470' },
    error: { backgroundColor: '#c53030' }, 
  };
  
  const iconStyles = {
    success: '✔',
    error: '✖',
  };

  return (
    <div style={{ ...baseStyle, ...typeStyles[type] }}>
      <span style={{ fontSize: '1.2rem' }}>{iconStyles[type]}</span>
      <span>{message}</span>
    </div>
  );
};

export default Snackbar;