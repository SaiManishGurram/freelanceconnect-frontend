'use client';
import React, { useState } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
interface RegisterFormProps {
  onRegister: (firstName: string, lastName: string, role: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'freelancer' | 'employer'>('freelancer'); // Default role
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onRegister(firstName, lastName, role, email, password);
    } else {
      setError('Passwords do not match.');
    }
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center min-h-[75%]">
        <div className="max-w-sm w-full p-6 bg-white rounded-md md:border border-gray-300 md:shadow-md">      <h2 className="text-xl font-bold mb-4 text-center">Sign up to Freelance Connect</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              {/* <label className="block text-gray-700">First Name:</label> */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mb-4 relative">
              {/* <label className="block text-gray-700">Last Name:</label> */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mb-4 relative">
              {/* <label className="block text-gray-700">Email:</label> */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700">Role:</span>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value="freelancer"
                  checked={role === 'freelancer'}
                  onChange={(e) => setRole(e.target.value as 'freelancer' | 'employer')}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Freelancer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="employer"
                  checked={role === 'employer'}
                  onChange={(e) => setRole(e.target.value as 'freelancer' | 'employer')}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Employer</span>
              </label>
            </div>
            <div className="mb-4 relative">
              {/* <label className="block text-gray-700">Password:</label> */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mb-4 relative">
              {/* <label className="block text-gray-700">Confirm Password:</label> */}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="btn w-full py-2 px-4"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
