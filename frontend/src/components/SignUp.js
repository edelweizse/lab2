import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signUp, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    signUp(name, email, password, navigate);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-4/5 md:w-1/4 text-center">
        <h1 className="text-white text-4xl font-semibold pb-4 border-b-2 border-white mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className={`w-full py-4 bg-green-500 text-white uppercase rounded-lg hover:bg-green-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <Link to="/signin">
          <p className="text-green-500 hover:text-green-700 transition-colors mt-4">
            Already have an account? Sign In!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
