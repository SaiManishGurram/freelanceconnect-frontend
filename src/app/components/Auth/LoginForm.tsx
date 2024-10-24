// src/app/components/Auth/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import {
  UserIcon,
  LockClosedIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage: any
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = onLogin(email, password);
      } catch (e) {
        console.log('e', e);
      }
    } else {
      setError('Both fields are required.');
    }
  };


  return (
    <div className="h-screen">
      <div className="flex items-center justify-center min-h-[75%]">
        <div className="max-w-sm w-full p-6 bg-white rounded-md md:border border-gray-300 md:shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Log in to Freelance Connect</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-secondary focus:border-green-secondary"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-secondary focus:border-green-secondary"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4 flex items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2" />
                Email address or password is incorrect.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
