import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash, FaEnvelope, FaUserPlus } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Signup = () => {
  const navigate = useNavigate();
  const bgRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });
  
  // OTP state
  const [step, setStep] = useState('signup'); // 'signup' or 'verify'
  const [otp, setOtp] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');


  useEffect(() => {
    const handleMouseMove = (e) => {
      const bg = bgRef.current;
      const { clientX: x, clientY: y } = e;
      if (bg) {
        const xPercent = (x / window.innerWidth) * 100;

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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/front');
    }
  }, [navigate]);

  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very Weak';
        break;
      case 2:
        feedback = 'Weak';
        break;
      case 3:
        feedback = 'Fair';
        break;
      case 4:
        feedback = 'Good';
        break;
      case 5:
        feedback = 'Strong';
        break;
      default:
        feedback = '';
    }

    return { score, feedback };
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-blue-500';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (error) setError('');
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return false;
    }
    return true;
  };

const handleSignup = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  setError('');
  setSuccess('');

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // If backend says email exists but is unverified
      if (data.error === 'Email already exists but not verified') {
        setStep('verify');
        setOtpSuccess('OTP has been sent again to your email for verification.');
        return;
      }
      throw new Error(data.error || 'Signup failed');
    }

    // ✅ For successful signup of a new user
    setStep('verify');
    setOtpSuccess('OTP has been sent to your email for verification.');
  } catch (err) {
    console.error('Signup error:', err);
    setError(err.message || 'Signup failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          otp: otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      setOtpSuccess('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/Front');
      }, 2000);
      
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }
      setOtpSuccess('');
      setOtpSuccess('New OTP sent to your email');
      
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} signup clicked`);
    setError(`${provider} signup will be implemented soon!`);
  };

  return (
    <div
      ref={bgRef}
      className="min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 bg-slate-900"
    >

      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaUserPlus className="text-3xl text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {step === 'signup' ? 'Join Quizshaala' : 'Verify Email'}
          </h2>
          <p className="text-gray-400 mt-2">
            {step === 'signup' ? 'Create your knowledge journey' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
            {success}
          </div>
        )}

        {step === 'signup' ? (
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                isFocused.name ? 'text-cyan-400' : 'text-gray-500'
              }`}>
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                disabled={isLoading}
                required
              />
            </div>

            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                isFocused.email ? 'text-cyan-400' : 'text-gray-500'
              }`}>
                <FaEnvelope />
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
                placeholder="Create a password"
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

            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Password Strength:</span>
                  <span className={`font-medium ${
                    passwordStrength.score < 3 ? 'text-red-400' : 
                    passwordStrength.score < 5 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {passwordStrength.feedback}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                isFocused.confirmPassword ? 'text-cyan-400' : 'text-gray-500'
              }`}>
                <FaLock />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-400 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {formData.confirmPassword && (
              <div className="text-sm">
                {formData.password === formData.confirmPassword ? (
                  <span className="text-green-400">✓ Passwords match</span>
                ) : (
                  <span className="text-red-400">✗ Passwords do not match</span>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 relative overflow-hidden group ${
                isLoading || success ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : otpSuccess && step === 'signup' ? (
                  'OTP Sent!'
                ) : (
                  'Send Verification OTP'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-700 flex-grow"></div>
              <span className="text-gray-500 text-sm px-3">Or sign up with</span>
              <div className="border-t border-gray-700 flex-grow"></div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading || success}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={isLoading || success}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGithub />
                <span>GitHub</span>
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                We've sent a 6-digit verification code to <br />
                <span className="text-cyan-400 font-medium">{formData.email}</span>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
                <FaLock />
              </div>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-400 text-center text-xl tracking-widest"
                disabled={isLoading}
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || otpSuccess === 'Account created successfully! Redirecting...'}
              className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 relative overflow-hidden group ${
                isLoading || success ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : otpSuccess === 'Account created successfully! Redirecting...' ? (
                  'Verified!'
                ) : (
                  'Verify OTP'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors disabled:opacity-50"
              >
                Didn't receive the code? Resend OTP
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('signup')}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors disabled:opacity-50"
              >
                ← Back to signup
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-gray-400 mt-8">
          {step === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:underline font-medium transition-colors"
                disabled={isLoading}
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              Need to change your email?{' '}
              <button
                onClick={() => setStep('signup')}
                className="text-cyan-400 hover:underline font-medium transition-colors"
                disabled={isLoading}
              >
                Go back
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Signup;