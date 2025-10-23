import { useState, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';

export const isDarkMode = signal(false);

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark');
    }

    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode.value;
    isDarkMode.value = newDarkMode;

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      class='relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      aria-label={isDarkMode.value ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        class={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDarkMode.value ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDarkMode.value ? '🌙' : '☀️'}
      </span>
    </button>
  );
}