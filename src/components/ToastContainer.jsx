import { useNotification } from '../context/NotificationContext';
import Toast from './Toast';

const ToastContainer = () => {
    const { toasts, dismissToast } = useNotification();

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end z-50 space-y-4"
        >
            {/* Container for toasts */}
            <div className="w-full flex flex-col items-center sm:items-end space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onDismiss={dismissToast}
                    />
                ))}
            </div>
        </div>
    );
};

export default ToastContainer;
