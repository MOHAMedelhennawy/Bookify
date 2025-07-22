import React, { useState, useEffect } from 'react'

export default function Toast({ message, type = "error", onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      setIsVisible(true); 
      setIsExiting(false);
      setProgress(100);
      
      // Auto-dismiss after 5 seconds with progress bar
      const startTime = Date.now();
      const duration = 5000;
      
      const progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        
        if (remaining <= 0) {
          clearInterval(progressTimer);
          handleClose();
        }
      }, 50);
      
      return () => clearInterval(progressTimer);
    }
  }, [message]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300); // Match the exit animation duration
  };

  if (!message) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
      isVisible && !isExiting 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-full opacity-0'
    }`}>
      <div 
        className={`max-w-xs ${bgColor[type]} text-sm text-white rounded-xl shadow-lg transform transition-all duration-300 ${
          isVisible && !isExiting 
            ? 'scale-100' 
            : 'scale-95'
        } hover:scale-105`} 
        role="alert" 
        tabIndex="-1" 
        aria-labelledby="toast-label"
      >
        <div id="toast-label" className="flex p-4">
          <span className="flex-1">{message}</span>

          <div className="ms-auto">
            <button 
              type="button" 
              className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95" 
              aria-label="Close"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg 
                className="shrink-0 size-4" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-black bg-opacity-20 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-white bg-opacity-30 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}