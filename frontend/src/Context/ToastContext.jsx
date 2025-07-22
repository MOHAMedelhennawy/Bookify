import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Common/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: 'error', show: false });

  const showToast = (message, type = 'error') => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const toastFunctions = {
    showToast,
    hideToast,
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    warning: (message) => showToast(message, 'warning'),
    info: (message) => showToast(message, 'info'),
  };

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}; 