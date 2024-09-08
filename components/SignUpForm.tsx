'use client';
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from './createClient';

// Define the type for form data
interface FormData {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
}

// Define the type for error state
interface ErrorState {
  email: string;
  user_name: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
  });

  const [error, setError] = useState<ErrorState>({ email: '', user_name: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkExists = async (field: 'email' | 'user_name', value: string) => {
    const { data, error } = await supabase
      .from('user')
      .select(field)
      .eq(field, value);

    return data && data.length > 0;
  };

  const encryptPassword = async (plainPassword: string) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ email: '', user_name: '' });
    setLoading(true);

    // Check if email or username exists
    const emailExists = await checkExists('email', formData.email);
    const userNameExists = await checkExists('user_name', formData.user_name);

    if (emailExists) {
      setError((prev) => ({ ...prev, email: 'Email already exists' }));
    }
    if (userNameExists) {
      setError((prev) => ({ ...prev, user_name: 'Username already exists' }));
    }

    if (!emailExists && !userNameExists) {
      try {
        // Encrypt the password before storing
        const encryptedPassword = await encryptPassword(formData.password);

        // Save data to the database
        const { data, error } = await supabase.from('user').insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          user_name: formData.user_name,
          email: formData.email,
          password: encryptedPassword,  // Save encrypted password
          phone: formData.phone,
          dob: formData.dob,
          gender: formData.gender,
          address: formData.address,
        }]);

        if (error) {
          console.error('Error storing user data:', error.message);
        } else {
          alert('User created successfully!');
        }
      } catch (error) {
        console.error('Error encrypting password:', error);
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            onBlur={async () => {
              if (await checkExists('user_name', formData.user_name)) {
                setError((prev) => ({ ...prev, user_name: 'Username already exists' }));
              }
            }}
            className={`mt-1 block w-full px-3 py-2 border ${error.user_name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {error.user_name && <p className="text-red-500 text-sm mt-1">{error.user_name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={async () => {
              if (await checkExists('email', formData.email)) {
                setError((prev) => ({ ...prev, email: 'Email already exists' }));
              }
            }}
            className={`mt-1 block w-full px-3 py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
