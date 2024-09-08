'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './createClient';
import bcrypt from 'bcryptjs';

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(''); // Can be username or email
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fetch user by email or username
      const { data: user, error: userError } = await supabase
        .from('user')
        .select('*')
        .or(`email.eq.${identifier},user_name.eq.${identifier}`)
        .single();

      if (userError || !user) {
        setError('Invalid username or email');
        setLoading(false);
        return;
      }

      // Compare provided password with hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      // Simulate session management by storing user info in localStorage or cookies
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to the dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        {/* Identifier: Username or Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Username or Email</label>
          <input
            type="text"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
