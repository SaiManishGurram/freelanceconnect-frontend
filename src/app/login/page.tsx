// src/routes/LoginPage.tsx
'use client';
import React from 'react';
import { useState } from 'react';

import LoginForm from '../components/Auth/LoginForm';
import { loginUser } from '../../services/authService';
import { useRouter } from 'next/navigation';
import {getUserRole} from '../../services/authService'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password); // Handle Firebase login
      if (user) {
        console.log('Login successful!');
        const role = await getUserRole(user.uid);

        // Create a token with the role (use real token creation in production)
        const token = JSON.stringify({ role });

        // Set token in cookies (for next.js middleware to read)
        document.cookie = `token=${token}; path=/`;

        if (role === 'freelancer') {
          router.push('/dashboard/freelancer'); // Redirect to freelancer dashboard
        } else if (role === 'employer') {
          router.push('/dashboard/employer'); // Redirect to employer dashboard
        } else {
          setError('Role not found');
        }        

      }
    } catch (error) {
      console.error('Login failed', error);
      setError((error as Error).message);

    }
  };

  

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
