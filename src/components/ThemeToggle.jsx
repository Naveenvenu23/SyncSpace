import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
