import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaRocket, FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Login = () => {
  const navigate = useNavigate();
  const bgRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const bg = bgRef.current;
      const { clientX: x, clientY: y } = e;
      if (bg) {
        const xPercent = (x / window.innerWidth) * 100;
        const yPercent = (y / window.innerHeight) * 100;

        bg.style.background = `
          radial-gradient(circle at ${x}px ${y}px, rgba(6, 182, 212, 0.2), transparent 70%),
          linear-gradient(135deg, 
            rgba(15, 23, 42, 1) 0%, 
            rgba(88, 28, 135, 0.8) ${xPercent}%, 
            rgba(15, 23, 42, 1) 100%)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      
      if (rememberMe) {
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        sessionStorage.setItem('refreshToken', data.refreshToken);
      }

      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to dashboard
      navigate('/front');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
      
      // Handle specific error cases
      if (err.message.includes('locked')) {
        setError('Account temporarily locked due to multiple failed attempts. Please try again later.');
      } else if (err.message.includes('Invalid email or password')) {
        setError('Invalid email or password. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for OAuth implementation
    console.log(`${provider} login clicked`);
    setError(`${provider} login will be implemented soon!`);
  };

  return (
    <div
      ref={bgRef}
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-300 bg-slate-900"
    >

      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        {/* Animated header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaRocket className="text-3xl text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Quizshaala
          </h2>
          <p className="text-gray-400 mt-2">Unlock your knowledge journey</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
              isFocused.email ? 'text-cyan-400' : 'text-gray-500'
            }`}>
              <FaUser />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-400"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
              isFocused.password ? 'text-cyan-400' : 'text-gray-500'
            }`}>
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-400"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-400 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-cyan-500 rounded focus:ring-cyan-500 bg-gray-700 border-gray-600"
                disabled={isLoading}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-cyan-400 hover:underline transition-colors"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 relative overflow-hidden group ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-700 flex-grow"></div>
            <span className="text-gray-500 text-sm px-3">Or continue with</span>
            <div className="border-t border-gray-700 flex-grow"></div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGithub />
              <span>GitHub</span>
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
        Don't have an account?{' '}
        <button
         onClick={() => navigate('/signup')}
          className="text-cyan-400 hover:underline font-medium transition-colors"
          disabled={isLoading}
            >
             Sign up now
           </button>
        </p>
      </div>
    </div>
  );
};

export default Login;