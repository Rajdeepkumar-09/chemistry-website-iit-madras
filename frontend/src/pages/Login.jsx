import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS! Save the ID card and Role to the browser's memory
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userRole', data.role);
        
        alert(`Welcome back! Logged in as: ${data.role}`);
        
        // --- SMART TRAFFIC COP ROUTING ---
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'faculty') {
          navigate('/faculty-dashboard');
        } else if (data.role === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/'); // Fallback just in case
        }
        // ---------------------------------
        
      } else {
        // Failed login (wrong password, etc.)
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 border border-[#e5e7eb] shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#1f2937]">
            Portal Login
          </h2>
          <div className="w-12 h-1 bg-[#b45309] mx-auto mt-4"></div>
          <p className="mt-4 text-center text-sm text-gray-600">
            IIT Madras Chemistry Department
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 text-sm text-center border border-red-200">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institutional Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#b45309] focus:border-[#b45309] sm:text-sm"
                placeholder="user@smail.iitm.ac.in"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#b45309] focus:border-[#b45309] sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-none text-white bg-[#1f2937] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f2937] transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;