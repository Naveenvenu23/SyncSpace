import { useEffect, useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Toast = ({ id, type, title, message, onDismiss, action }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        // Wait for exit animation to finish before removing from DOM
        setTimeout(() => {
            onDismiss(id);
        }, 300);
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
            case 'error': return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
            case 'warning': return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
            case 'info': default: return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success': return 'border-l-green-500';
            case 'error': return 'border-l-red-500';
            case 'warning': return 'border-l-yellow-500';
            case 'info': default: return 'border-l-blue-500';
        }
    };

    return (
        <div
            className={`
        w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border-l-4 ${getBorderColor()}
        transform transition-all duration-300 ease-in-out mb-3
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
            role="alert"
        >
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
                        {action && (
                            <div className="mt-3 flex space-x-7">
                                <button
                                    type="button"
                                    onClick={() => { action.onClick(); handleDismiss(); }}
                                    className="bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {action.label}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleDismiss}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
