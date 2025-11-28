import { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useNotification } from '../context/NotificationContext';

const PasswordChangeModal = ({ onClose }) => {
    const { addNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Password validation rules
    const passwordRules = {
        minLength: { test: (pwd) => pwd.length >= 8, message: 'At least 8 characters' },
        hasUpperCase: { test: (pwd) => /[A-Z]/.test(pwd), message: 'One uppercase letter' },
        hasLowerCase: { test: (pwd) => /[a-z]/.test(pwd), message: 'One lowercase letter' },
        hasNumber: { test: (pwd) => /\d/.test(pwd), message: 'One number' },
        hasSpecial: { test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), message: 'One special character' }
    };

    // Validate password
    const validatePassword = (password) => {
        const failedRules = Object.entries(passwordRules)
            .filter(([_, rule]) => !rule.test(password))
            .map(([_, rule]) => rule.message);
        return failedRules;
    };

    // Handle input change
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle blur
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field);
    };

    // Validate individual field
    const validateField = (field) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'currentPassword':
                if (!formData.currentPassword) {
                    newErrors.currentPassword = 'Current password is required';
                } else {
                    delete newErrors.currentPassword;
                }
                break;

            case 'newPassword':
                if (!formData.newPassword) {
                    newErrors.newPassword = 'New password is required';
                } else {
                    const failedRules = validatePassword(formData.newPassword);
                    if (failedRules.length > 0) {
                        newErrors.newPassword = 'Password does not meet requirements';
                    } else if (formData.newPassword === formData.currentPassword) {
                        newErrors.newPassword = 'New password must be different from current password';
                    } else {
                        delete newErrors.newPassword;
                    }
                }
                break;

            case 'confirmPassword':
                if (!formData.confirmPassword) {
                    newErrors.confirmPassword = 'Please confirm your password';
                } else if (formData.confirmPassword !== formData.newPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else {
                    delete newErrors.confirmPassword;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate all fields
    const validateForm = () => {
        const allTouched = {
            currentPassword: true,
            newPassword: true,
            confirmPassword: true
        };
        setTouched(allTouched);

        return (
            validateField('currentPassword') &&
            validateField('newPassword') &&
            validateField('confirmPassword')
        );
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate random success/failure for demo
            const success = Math.random() > 0.3;

            if (success) {
                addNotification('success', 'Password Changed', 'Your password has been updated successfully');
                onClose();
            } else {
                setErrors({ currentPassword: 'Current password is incorrect' });
                addNotification('error', 'Update Failed', 'Current password is incorrect');
            }
        } catch (error) {
            addNotification('error', 'Error', 'Failed to change password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    // Get password strength
    const getPasswordStrength = () => {
        if (!formData.newPassword) return { strength: 0, label: '', color: '' };

        const passedRules = Object.values(passwordRules).filter(rule => rule.test(formData.newPassword)).length;
        const totalRules = Object.keys(passwordRules).length;
        const percentage = (passedRules / totalRules) * 100;

        if (percentage < 40) {
            return { strength: percentage, label: 'Weak', color: 'bg-red-500' };
        } else if (percentage < 80) {
            return { strength: percentage, label: 'Medium', color: 'bg-yellow-500' };
        } else {
            return { strength: percentage, label: 'Strong', color: 'bg-green-500' };
        }
    };

    const passwordStrength = getPasswordStrength();
    const failedRules = formData.newPassword ? validatePassword(formData.newPassword) : [];

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                <div
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Change Password</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? 'text' : 'password'}
                                    id="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={(e) => handleChange('currentPassword', e.target.value)}
                                    onBlur={() => handleBlur('currentPassword')}
                                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 ${touched.currentPassword && errors.currentPassword
                                            ? 'border-red-500'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter current password"
                                    required
                                    aria-required="true"
                                    aria-invalid={touched.currentPassword && errors.currentPassword ? 'true' : 'false'}
                                    aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                    aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
                                >
                                    {showPasswords.current ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {touched.currentPassword && errors.currentPassword && (
                                <p id="currentPassword-error" className="mt-1 text-sm text-red-500 flex items-center">
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.currentPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? 'text' : 'password'}
                                    id="newPassword"
                                    value={formData.newPassword}
                                    onChange={(e) => handleChange('newPassword', e.target.value)}
                                    onBlur={() => handleBlur('newPassword')}
                                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 ${touched.newPassword && errors.newPassword
                                            ? 'border-red-500'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter new password"
                                    required
                                    aria-required="true"
                                    aria-invalid={touched.newPassword && errors.newPassword ? 'true' : 'false'}
                                    aria-describedby="newPassword-error password-strength"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                    aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
                                >
                                    {showPasswords.new ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div id="password-strength" className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Password Strength:</span>
                                        <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-red-500' :
                                                passwordStrength.label === 'Medium' ? 'text-yellow-500' :
                                                    'text-green-500'
                                            }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Requirements */}
                            <div className="mt-3 space-y-1">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Password must contain:</p>
                                {Object.entries(passwordRules).map(([key, rule]) => {
                                    const passed = formData.newPassword && rule.test(formData.newPassword);
                                    return (
                                        <div key={key} className="flex items-center text-xs">
                                            {passed ? (
                                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                            ) : (
                                                <XCircleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
                                            )}
                                            <span className={passed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                                                {rule.message}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {touched.newPassword && errors.newPassword && (
                                <p id="newPassword-error" className="mt-2 text-sm text-red-500 flex items-center">
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                    onBlur={() => handleBlur('confirmPassword')}
                                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 ${touched.confirmPassword && errors.confirmPassword
                                            ? 'border-red-500'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Confirm new password"
                                    required
                                    aria-required="true"
                                    aria-invalid={touched.confirmPassword && errors.confirmPassword ? 'true' : 'false'}
                                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                    aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
                                >
                                    {showPasswords.confirm ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <p id="confirmPassword-error" className="mt-1 text-sm text-red-500 flex items-center">
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || Object.keys(errors).length > 0}
                                className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Changing...
                                    </>
                                ) : (
                                    'Change Password'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PasswordChangeModal;
