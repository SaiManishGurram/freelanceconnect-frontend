'use client';
import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, initFirebase } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import Spinner from '../app/components/Spinner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error?: string | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    initFirebase();  // Initialize Firebase if not already initialized

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    }, (error) => {
      setError(error.message); // Handle Firebase auth error
      setLoading(false);
    });

    return () => unsubscribe();  // Cleanup the subscription on unmount
  }, []);

  // Optional: Redirect to login if no user is authenticated
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/');
  //   }
  // }, [loading, user, router]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {!loading ? children : <div><Spinner /></div>}  {/* Render children when not loading */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
