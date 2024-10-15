// src/app/components/SignUp.tsx
"use client"
import { useState } from 'react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'freelancer' | 'employer'>('freelancer'); // Default role

  const [error, setError] = useState<string>('');

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('User registered successfully:', data.user);
      // Handle successful registration (e.g., redirect or show a message)
    } catch (err) {
      setError((err as Error).message); // Handle errors appropriately
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        <label>
          <input
            type="radio"
            value="freelancer"
            checked={role === 'freelancer'}
            onChange={(e) => setRole(e.target.value as 'freelancer' | 'employer')}
          />
          Freelancer
        </label>
        <label>
          <input
            type="radio"
            value="employer"
            checked={role === 'employer'}
            onChange={(e) => setRole(e.target.value as 'freelancer' | 'employer')}
          />
          Employer
        </label>
      </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default SignUp;
