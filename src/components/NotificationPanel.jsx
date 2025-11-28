import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNotification } from '../context/NotificationContext';

const NotificationPanel = () => {
    const { notifications, unreadCount, markAllAsRead, markAsRead, clearAll } = useNotification();

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'error': return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
            case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
            case 'info': default: return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
        }
    };

    const formatTime = (date) => {
        if (!date) return '';
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="relative bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-800 bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
                    )}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-80 sm:w-96 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-[80vh] flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        <div className="flex space-x-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium flex items-center"
                                    title="Mark all as read"
                                >
                                    <CheckIcon className="h-3 w-3 mr-1" />
                                    Mark all read
                                </button>
                            )}
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                    title="Clear all"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <Menu.Item key={notification.id}>
                                    {({ active }) => (
                                        <div
                                            className={`px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 flex items-start space-x-3 transition-colors ${active ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                                                } ${!notification.read ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {notification.message}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                    {formatTime(notification.timestamp)}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="flex-shrink-0 self-center">
                                                    <span className="block h-2 w-2 rounded-full bg-indigo-600"></span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Menu.Item>
                            ))
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default NotificationPanel;
