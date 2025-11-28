import { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef(null);

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Handle click outside to close
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 backdrop-blur-sm animate-fadeIn"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                {/* Center modal */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal Panel */}
                <div
                    ref={modalRef}
                    className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl animate-scaleIn relative"
                >
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
