'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null,
  isTransitioning: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setIsTransitioning(true);

    // Update document class and local storage when theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    // Add transition classes
    document.documentElement.style.setProperty(
      '--theme-transition-duration',
      '500ms'
    );
    document.documentElement.classList.add('theme-transition');

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('theme-transition');
    }, 500);

    return () => clearTimeout(timer);
  }, [theme, mounted]);

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent rapid toggling
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isTransitioning }}
    >
      <div className="transition-colors duration-500 ease-in-out">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };
