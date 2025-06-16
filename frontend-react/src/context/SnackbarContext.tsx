import React, { createContext, useState, useContext, type ReactNode } from 'react';
import Snackbar from '../components/Snackbar';

type SnackbarType = 'success' | 'error';

// This defines the function that our components will call
interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

// Create the context
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// This is the provider component that will hold the logic and state
export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

// This is a custom hook that makes it easy to use our context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};