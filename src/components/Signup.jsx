import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { darkMode } = useTheme();
    const { signup } = useAuth();
    const navigate = useNavigate();

    // Helper function to convert Firebase error codes to user-friendly messages
    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email is already registered. Please login instead.';
            case 'auth/invalid-email':
                return 'Invalid email address format.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled. Please contact support.';
            case 'auth/weak-password':
                return 'Password is too weak. Please use at least 6 characters.';
            default:
                return 'An error occurred during signup. Please try again.';
        }
    };

    const validateForm = () => {
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await signup(email, password);
            setSuccess('Account created successfully! Redirecting...');
            // Navigate to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            setError(getErrorMessage(err.code));
            console.error('Signup error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-md w-full space-y-8 glass p-8 rounded-2xl transform transition-all duration-700 ease-out animate-popIn relative z-10">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 animate-bounce">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight animate-slideInRight">
                        Join SyncSpace
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 animate-slideInLeft">
                        Create your account and start collaborating.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-3">
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-all duration-200"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="animate-fadeInUp relative" style={{ animationDelay: '0.2s' }}>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-all duration-200 pr-10"
                                placeholder="Password (min 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <div className="animate-fadeInUp relative" style={{ animationDelay: '0.3s' }}>
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-all duration-200 pr-10"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50/90 dark:bg-red-900/30 p-4 border border-red-100 dark:border-red-800 animate-fadeIn">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="rounded-md bg-green-50/90 dark:bg-green-900/30 p-4 border border-green-100 dark:border-green-800 animate-fadeIn">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">{success}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading
                                ? 'bg-purple-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                'Sign up'
                            )}
                        </button>
                    </div>

                    <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
