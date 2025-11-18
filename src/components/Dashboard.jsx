import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  ArrowRightOnRectangleIcon as LogoutIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const Dashboard = ({ onLogout, children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 dark:bg-gray-800 transition duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-indigo-800 px-4">
          <h1 className="text-white text-xl font-bold">SyncSpace</h1>
        </div>
        <nav className="mt-5 px-2">
          <Link
            to="/dashboard/overview"
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
          >
            <span className="mr-3">📊</span>
            Overview
          </Link>
          <Link
            to="/dashboard/projects"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
          >
            <span className="mr-3">📂</span>
            Projects
          </Link>
          <Link
            to="/dashboard/documents"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
          >
            <span className="mr-3">📄</span>
            Documents
          </Link>
          <Link
            to="/dashboard/team"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
          >
            <span className="mr-3">👥</span>
            Team
          </Link>
          <Link
            to="/dashboard/settings"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
          >
            <span className="mr-3">⚙️</span>
            Settings
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 ease-out hover:scale-105"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-semibold">
                      U
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">User</span>
                  </button>
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 origin-top-right transform transition-all duration-200 ease-out z-10 ${
                      profileOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          onLogout();
                          navigate('/login');
                        }}
                        className="group w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors duration-150 ease-out"
                      >
                        <LogoutIcon className="h-4 w-4 mr-2 transition-transform group-hover:animate-[logoutWiggle_0.4s_ease-out]" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <div className="p-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
