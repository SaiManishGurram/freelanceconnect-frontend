'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Define the context
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// Define the props for the provider, including `children`
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
