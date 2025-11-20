import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
  setMode: (mode: 'login' | 'signup') => void;
  language: string;
}

export function AuthModal({ isOpen, onClose, mode, onLogin, onSignup, setMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateEmail = (value: string) => {
    // Allow "admin" as a special case for username
    if (value === 'admin') return '';
    
    if (!value) {
      return 'This field is required';
    }
    
    // Check if it looks like an email
    if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Email is invalid';
    }
    
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const validateName = (value: string) => {
    if (!value) {
      return 'Name is required';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, email: error }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      const error = validateName(value);
      setErrors(prev => ({ ...prev, name: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      const error = validateEmail(email);
      setErrors(prev => ({ ...prev, email: error }));
    } else if (field === 'password') {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    } else if (field === 'name') {
      const error = validateName(name);
      setErrors(prev => ({ ...prev, name: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all fields
    const allTouched = { email: true, password: true, name: mode === 'signup' };
    setTouched(allTouched);
    
    // Validate all
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const nameError = mode === 'signup' ? validateName(name) : '';
    
    const newErrors = {
      email: emailError,
      password: passwordError,
      ...(mode === 'signup' && { name: nameError })
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      if (mode === 'login') {
        onLogin(email, password);
      } else {
        onSignup(email, password, name);
      }
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setErrors({});
      setTouched({});
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
    setTouched({});
  };

  const handleModeToggle = () => {
    resetForm();
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-amber-500/20 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* Title */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl text-gray-300 mb-2">
                    {mode === 'login' ? 'Login to access premium features' : 'Create your account'}
                  </h2>
                </div>

                {/* Demo Credentials Display */}
                {mode === 'login' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 space-y-3"
                  >
                    {/* Admin Credentials */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <h3 className="text-sm text-amber-500">Admin Access</h3>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-gray-300">
                          <span className="text-gray-400">Username:</span> <span className="text-white font-mono">admin</span>
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Password:</span> <span className="text-white font-mono">admin123</span>
                        </p>
                        <p className="text-gray-400 text-[10px] mt-1">→ Site management & admin panel</p>
                      </div>
                    </div>

                    {/* VIP Demo Credentials */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <h3 className="text-sm text-purple-400">VIP Demo User</h3>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-gray-300">
                          <span className="text-gray-400">Email:</span> <span className="text-white font-mono">vip@demo.com</span>
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Password:</span> <span className="text-white font-mono">vip123</span>
                        </p>
                        <p className="text-gray-400 text-[10px] mt-1">→ Test VIP features & predictions</p>
                      </div>
                    </div>

                    {/* Regular User Info */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <h3 className="text-sm text-blue-400">Regular User</h3>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-gray-300">
                          <span className="text-gray-400">Any email & password</span>
                        </p>
                        <p className="text-gray-400 text-[10px] mt-1">→ Free access, can upgrade to VIP</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          onBlur={() => handleBlur('name')}
                          className={`w-full pl-11 pr-4 py-3 bg-black border ${
                            errors.name && touched.name ? 'border-red-500' : 'border-amber-500/30'
                          } rounded-lg focus:border-amber-500 focus:outline-none transition-all text-white placeholder:text-gray-600`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      {mode === 'login' ? 'Username or Email' : 'Email'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full pl-11 pr-4 py-3 bg-black border ${
                          errors.email && touched.email ? 'border-red-500' : 'border-amber-500/30'
                        } rounded-lg focus:border-amber-500 focus:outline-none transition-all text-white placeholder:text-gray-600`}
                        placeholder={mode === 'login' ? 'admin' : 'your@email.com'}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        className={`w-full pl-11 pr-11 py-3 bg-black border ${
                          errors.password && touched.password ? 'border-red-500' : 'border-amber-500/30'
                        } rounded-lg focus:border-amber-500 focus:outline-none transition-all text-white placeholder:text-gray-600`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full py-3 mt-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {mode === 'login' ? 'Login' : 'Create Account'}
                  </motion.button>
                </form>

                {/* Toggle Mode */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleModeToggle}
                    className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <span className="text-amber-500">
                      {mode === 'login' ? 'Sign Up' : 'Login'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}