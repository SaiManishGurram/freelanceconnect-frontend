// src/routes/RegisterPage.tsx
'use client';

import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { registerUser } from '../../services/authService';

const RegisterPage: React.FC = () => {

  const handleRegister = async (firstName: string, lastName: string, role: string, email: string, password: string) => {
    try {
      const user = await registerUser(firstName, lastName, role, email, password); // Handle Firebase registration
      if (user) {
        console.log('Registration successful!');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
