// src/components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-primary"></div>
    </div>
  );
};

export default Spinner;
