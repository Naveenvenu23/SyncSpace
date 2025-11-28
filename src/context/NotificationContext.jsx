import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const addNotification = useCallback((notification) => {
        const id = Date.now().toString();
        const newNotification = {
            id,
            timestamp: new Date(),
            read: false,
            duration: 5000, // Default auto-dismiss duration
            ...notification,
        };

        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);

        // Auto-dismiss for toasts (if not persistent)
        if (!notification.persistent) {
            setTimeout(() => {
                removeToast(id);
            }, newNotification.duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        // We don't remove from the history, just from the active toast view if we had separate states,
        // but for simplicity, we'll keep a "showToast" property or just handle it in the UI.
        // Actually, let's keep all notifications in history, but manage "active toasts" separately or via a flag.
        // For this implementation, let's assume 'notifications' is the history.
        // We'll add a separate state for 'toasts' to show on screen.
    }, []);

    // Let's refine the state:
    // notifications: All history
    // toasts: Currently visible popups
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((type, title, message, action = null) => {
        const id = Date.now().toString();
        const toast = { id, type, title, message, action };

        setToasts((prev) => [...prev, toast]);

        // Add to history as well
        const historyItem = {
            id,
            type,
            title,
            message,
            timestamp: new Date(),
            read: false,
            action
        };
        setNotifications((prev) => [historyItem, ...prev]);
        setUnreadCount((prev) => prev + 1);

        // Auto-dismiss toast
        setTimeout(() => {
            dismissToast(id);
        }, 5000);
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    }, []);

    const markAsRead = useCallback((id) => {
        setNotifications((prev) => prev.map(n => {
            if (n.id === id && !n.read) {
                setUnreadCount(c => Math.max(0, c - 1));
                return { ...n, read: true };
            }
            return n;
        }));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        setUnreadCount(0);
    }, []);

    return (
        <NotificationContext.Provider value={{
            notifications,
            toasts,
            unreadCount,
            showToast,
            dismissToast,
            markAllAsRead,
            markAsRead,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
