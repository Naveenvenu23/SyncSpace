import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  MagnifyingGlassIcon as SearchIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import ThemeToggle from './ThemeToggle';
import NotificationPanel from './NotificationPanel';

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [profileOpen, setProfileOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const { darkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const { workspaces, currentWorkspace, switchWorkspace } = useWorkspace();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('mobile-sidebar');
        const hamburger = document.getElementById('hamburger-button');
        if (sidebar && !sidebar.contains(event.target) && !hamburger?.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="mobile-sidebar"
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 bg-indigo-800 dark:bg-gray-900 px-4 shadow-md">
          <h1 className="text-white text-xl font-bold tracking-wider">SyncSpace</h1>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-5 px-2 space-y-1">
          {[
            { path: '/dashboard/overview', icon: '📊', label: 'Overview' },
            { path: '/dashboard/projects', icon: '📂', label: 'Projects' },
            { path: '/dashboard/documents', icon: '📄', label: 'Documents' },
            { path: '/dashboard/team', icon: '👥', label: 'Team' },
            { path: '/dashboard/settings', icon: '⚙️', label: 'Settings' },
          ].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-200 ease-in-out hover:translate-x-1 ${location.pathname === item.path
                  ? 'bg-indigo-800 dark:bg-gray-900 text-white'
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white hover:bg-opacity-75'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer - User Info (Mobile) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-indigo-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-indigo-200 truncate">{currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none relative">
        {/* Top navigation */}
        <div className="sticky top-0 z-20 flex-shrink-0 flex h-16 glass shadow-sm">
          <button
            id="hamburger-button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              {/* Workspace Switcher */}
              <div className="relative mr-4">
                <button
                  onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                    {currentWorkspace?.name || 'Select Workspace'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                </button>

                {workspaceDropdownOpen && (
                  <>
                    {/* Backdrop for dropdown */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setWorkspaceDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn">
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Switch Workspace
                        </div>
                        {workspaces.map((ws) => (
                          <button
                            key={ws.id}
                            onClick={() => {
                              switchWorkspace(ws.id);
                              setWorkspaceDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${currentWorkspace?.id === ws.id
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                          >
                            {ws.name}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                        <Link
                          to="/dashboard/overview"
                          onClick={() => setWorkspaceDropdownOpen(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          + Create New Workspace
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full max-w-xs hidden md:block">
                <div className="relative w-full text-gray-400 focus-within:text-indigo-600 dark:focus-within:text-indigo-400">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 transition-colors duration-200" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm bg-transparent transition-all duration-200"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-2 sm:space-x-4">
              <ThemeToggle />

              {/* Notification Panel */}
              <NotificationPanel />

              {/* Profile dropdown */}
              <div className="ml-3 relative hidden lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 ease-out hover:scale-105"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                      {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                      {currentUser?.email?.split('@')[0] || 'User'}
                    </span>
                  </button>
                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 origin-top-right transform transition-all duration-200 ease-out z-50 opacity-100 scale-100 translate-y-12">
                        <div className="py-1 rounded-md shadow-xs">
                          <button
                            onClick={async () => {
                              setProfileOpen(false);
                              try {
                                await logout();
                                navigate('/login');
                              } catch (error) {
                                console.error('Logout error:', error);
                              }
                            }}
                            className="group w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-white flex items-center transition-colors duration-150 ease-out"
                          >
                            <LogoutIcon className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hide">
          <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
