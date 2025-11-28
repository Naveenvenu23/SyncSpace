import { useState, useRef, useEffect } from 'react';
import {
    UserCircleIcon,
    BellIcon,
    Cog6ToothIcon,
    UsersIcon,
    CameraIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { useNotification } from '../context/NotificationContext';
import PasswordChangeModal from './PasswordChangeModal';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const { currentUser } = useAuth();
    const { darkMode, setDarkMode } = useTheme();
    const { currentWorkspace } = useWorkspace();
    const { addNotification } = useNotification();

    // Profile state
    const [profileData, setProfileData] = useState({
        name: currentUser?.displayName || currentUser?.email?.split('@')[0] || '',
        email: currentUser?.email || '',
        bio: '',
        avatar: null,
        avatarPreview: null
    });

    // Notification preferences state
    const [notificationPrefs, setNotificationPrefs] = useState({
        taskUpdates: true,
        mentions: true,
        chatAlerts: true,
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: false,
        projectUpdates: true,
        teamInvites: true
    });

    // Workspace preferences state
    const [workspacePrefs, setWorkspacePrefs] = useState({
        theme: darkMode ? 'dark' : 'light',
        layoutDensity: 'comfortable',
        defaultView: 'overview',
        sidebarCollapsed: false,
        showAvatars: true,
        compactMode: false
    });

    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    // Tabs configuration
    const tabs = [
        { id: 'profile', label: 'Profile', icon: UserCircleIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'workspace', label: 'Workspace', icon: Cog6ToothIcon },
        { id: 'team', label: 'Team', icon: UsersIcon }
    ];

    // Handle avatar file selection
    const handleAvatarChange = (file) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                addNotification('error', 'File too large', 'Please select an image under 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({
                    ...prev,
                    avatar: file,
                    avatarPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            addNotification('error', 'Invalid file', 'Please select a valid image file');
        }
    };

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleAvatarChange(e.dataTransfer.files[0]);
        }
    };

    // Handle profile save
    const handleProfileSave = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            addNotification('success', 'Profile Updated', 'Your profile has been saved successfully');
        } catch (error) {
            addNotification('error', 'Update Failed', 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle notification preferences save
    const handleNotificationSave = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            addNotification('success', 'Preferences Saved', 'Notification preferences updated successfully');
        } catch (error) {
            addNotification('error', 'Update Failed', 'Failed to update preferences. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle workspace preferences save
    const handleWorkspaceSave = async () => {
        setIsLoading(true);
        try {
            // Update theme if changed
            if (workspacePrefs.theme === 'dark' && !darkMode) {
                setDarkMode(true);
            } else if (workspacePrefs.theme === 'light' && darkMode) {
                setDarkMode(false);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            addNotification('success', 'Workspace Updated', 'Workspace preferences saved successfully');
        } catch (error) {
            addNotification('error', 'Update Failed', 'Failed to update workspace. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset handlers
    const handleProfileReset = () => {
        setProfileData({
            name: currentUser?.displayName || currentUser?.email?.split('@')[0] || '',
            email: currentUser?.email || '',
            bio: '',
            avatar: null,
            avatarPreview: null
        });
        addNotification('info', 'Reset', 'Profile changes have been reset');
    };

    const handleNotificationReset = () => {
        setNotificationPrefs({
            taskUpdates: true,
            mentions: true,
            chatAlerts: true,
            emailNotifications: true,
            pushNotifications: true,
            weeklyDigest: false,
            projectUpdates: true,
            teamInvites: true
        });
        addNotification('info', 'Reset', 'Notification preferences have been reset');
    };

    const handleWorkspaceReset = () => {
        setWorkspacePrefs({
            theme: darkMode ? 'dark' : 'light',
            layoutDensity: 'comfortable',
            defaultView: 'overview',
            sidebarCollapsed: false,
            showAvatars: true,
            compactMode: false
        });
        addNotification('info', 'Reset', 'Workspace preferences have been reset');
    };

    // Toggle notification preference
    const toggleNotificationPref = (key) => {
        setNotificationPrefs(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Toggle workspace preference
    const toggleWorkspacePref = (key) => {
        setWorkspacePrefs(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Render Profile Section
    const renderProfileSection = () => (
        <div className="space-y-6 animate-fadeIn">
            {/* Avatar Upload */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg overflow-hidden">
                            {profileData.avatarPreview ? (
                                <img src={profileData.avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                currentUser?.email?.charAt(0).toUpperCase() || 'U'
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            aria-label="Change avatar"
                        >
                            <CameraIcon className="h-8 w-8 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 w-full">
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${dragActive
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <CameraIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                Drag and drop your image here, or{' '}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium focus:outline-none focus:underline"
                                >
                                    browse
                                </button>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleAvatarChange(e.target.files[0])}
                            className="hidden"
                            aria-label="Upload avatar"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                            placeholder="Enter your full name"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                            placeholder="your.email@example.com"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>
            </div>

            {/* Password Section */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 30 days ago</p>
                    </div>
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                    onClick={handleProfileReset}
                    disabled={isLoading}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <XMarkIcon className="h-5 w-5 inline mr-2" />
                    Reset
                </button>
                <button
                    onClick={handleProfileSave}
                    disabled={isLoading || !profileData.name || !profileData.email}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <CheckIcon className="h-5 w-5 mr-2" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    // Render Notifications Section
    const renderNotificationsSection = () => (
        <div className="space-y-6 animate-fadeIn">
            {/* Activity Notifications */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Notifications</h3>
                <div className="space-y-4">
                    {[
                        { key: 'taskUpdates', label: 'Task Updates', description: 'Get notified when tasks are updated or completed' },
                        { key: 'mentions', label: 'Mentions', description: 'Receive alerts when someone mentions you' },
                        { key: 'chatAlerts', label: 'Chat Alerts', description: 'Get notified of new chat messages' },
                        { key: 'projectUpdates', label: 'Project Updates', description: 'Stay informed about project changes' },
                        { key: 'teamInvites', label: 'Team Invites', description: 'Get notified when invited to teams' }
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                            </div>
                            <button
                                onClick={() => toggleNotificationPref(key)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${notificationPrefs[key] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                role="switch"
                                aria-checked={notificationPrefs[key]}
                                aria-label={`Toggle ${label}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationPrefs[key] ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delivery Methods */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Methods</h3>
                <div className="space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Get browser push notifications' },
                        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive a weekly summary email' }
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                            </div>
                            <button
                                onClick={() => toggleNotificationPref(key)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${notificationPrefs[key] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                role="switch"
                                aria-checked={notificationPrefs[key]}
                                aria-label={`Toggle ${label}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationPrefs[key] ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                    onClick={handleNotificationReset}
                    disabled={isLoading}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <XMarkIcon className="h-5 w-5 inline mr-2" />
                    Reset
                </button>
                <button
                    onClick={handleNotificationSave}
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <CheckIcon className="h-5 w-5 mr-2" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    // Render Workspace Section
    const renderWorkspaceSection = () => (
        <div className="space-y-6 animate-fadeIn">
            {/* Theme Settings */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'light', label: 'Light', icon: SunIcon },
                                { value: 'dark', label: 'Dark', icon: MoonIcon },
                                { value: 'system', label: 'System', icon: ComputerDesktopIcon }
                            ].map(({ value, label, icon: Icon }) => (
                                <button
                                    key={value}
                                    onClick={() => setWorkspacePrefs(prev => ({ ...prev, theme: value }))}
                                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${workspacePrefs.theme === value
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                                        }`}
                                    aria-label={`Select ${label} theme`}
                                >
                                    <Icon className={`h-6 w-6 mb-2 ${workspacePrefs.theme === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                        }`} />
                                    <span className={`text-sm font-medium ${workspacePrefs.theme === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                                        }`}>
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Layout Density</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['compact', 'comfortable', 'spacious'].map((density) => (
                                <button
                                    key={density}
                                    onClick={() => setWorkspacePrefs(prev => ({ ...prev, layoutDensity: density }))}
                                    className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 capitalize ${workspacePrefs.layoutDensity === density
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                                        }`}
                                    aria-label={`Select ${density} layout density`}
                                >
                                    {density}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Default View */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default View</h3>
                <div>
                    <label htmlFor="defaultView" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Starting Page
                    </label>
                    <select
                        id="defaultView"
                        value={workspacePrefs.defaultView}
                        onChange={(e) => setWorkspacePrefs(prev => ({ ...prev, defaultView: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    >
                        <option value="overview">Overview</option>
                        <option value="projects">Projects</option>
                        <option value="documents">Documents</option>
                        <option value="team">Team</option>
                    </select>
                </div>
            </div>

            {/* Display Preferences */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Display Preferences</h3>
                <div className="space-y-4">
                    {[
                        { key: 'showAvatars', label: 'Show Avatars', description: 'Display user avatars throughout the app' },
                        { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing and padding' },
                        { key: 'sidebarCollapsed', label: 'Collapse Sidebar', description: 'Start with sidebar collapsed' }
                    ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                            </div>
                            <button
                                onClick={() => toggleWorkspacePref(key)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${workspacePrefs[key] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                role="switch"
                                aria-checked={workspacePrefs[key]}
                                aria-label={`Toggle ${label}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${workspacePrefs[key] ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                    onClick={handleWorkspaceReset}
                    disabled={isLoading}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <XMarkIcon className="h-5 w-5 inline mr-2" />
                    Reset
                </button>
                <button
                    onClick={handleWorkspaceSave}
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <CheckIcon className="h-5 w-5 mr-2" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    // Render Team Section
    const renderTeamSection = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Workspace
                        </label>
                        <p className="text-base text-gray-900 dark:text-white font-medium">
                            {currentWorkspace?.name || 'No workspace selected'}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Team Members
                        </label>
                        <p className="text-base text-gray-900 dark:text-white font-medium">
                            {currentWorkspace?.members?.length || 0} members
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl p-6">
                <div className="text-center py-12">
                    <UsersIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Team Management</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Manage team members, roles, and permissions
                    </p>
                    <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Manage Team
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls={`${tab.id}-panel`}
                            >
                                <Icon className="h-5 w-5 mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
                {activeTab === 'profile' && renderProfileSection()}
                {activeTab === 'notifications' && renderNotificationsSection()}
                {activeTab === 'workspace' && renderWorkspaceSection()}
                {activeTab === 'team' && renderTeamSection()}
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <PasswordChangeModal onClose={() => setShowPasswordModal(false)} />
            )}
        </div>
    );
};

export default Settings;
