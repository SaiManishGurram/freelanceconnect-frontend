// src/routes/RegisterPage.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { registerUser } from '../../services/authService';
import { useLoading } from '../../context/LoadingContext';
import Spinner from '../components/Spinner';
import {getUserRole} from '../../services/authService'
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState('');

  const { loading, setLoading } = useLoading();

  const handleRegister = async (firstName: string, lastName: string, role: string, email: string, password: string) => {
    setLoading(true);
    try {
      const user = await registerUser(firstName, lastName, role, email, password); // Handle Firebase registration
      if (user) {
        console.log('Registration successful!');
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
        }              }
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
