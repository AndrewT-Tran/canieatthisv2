'use client';

import dynamic from 'next/dynamic';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IoMenu, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import FlagForUnitedStates from './flags/FlagForUnitedStates';
import FlagForChina from './flags/FlagForChina';
import FlagForVietnam from './flags/FlagForVietnam';
import FlagForSpain from './flags/FlagForSpain';

// Dynamically load components
const ThemeToggle = dynamic(() => import('./ThemeToggle'));

const languages = [
  { code: 'en', label: 'English', icon: ({ size }) => <FlagForUnitedStates size={size} /> },
  { code: 'es', label: 'Español', icon: ({ size }) => <FlagForSpain size={size} /> },
  {
    code: 'cn',
    label: '中文',
    icon: ({ size }) => <FlagForChina size={size} />,
    className: 'font-ma-shan-zheng',
  },
  { code: 'vi', label: 'Tiếng Việt', icon: ({ size }) => <FlagForVietnam size={size} /> },
];

export default function SettingsButtons() {
  const { locale } = useParams();
  const pathname = usePathname();
  const t = useTranslations();
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const redirectedPathName = (newLocale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];
  const LanguageIcon = currentLanguage.icon;

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      {/* Theme Toggle */}
      <div className="rounded-full bg-white/20 p-1 shadow-md backdrop-blur-md hover:bg-white/30 dark:bg-gray-700/20 dark:hover:bg-gray-600/30">
        <ThemeToggle />
      </div>

      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="rounded-full bg-white/30 p-2 shadow-md backdrop-blur-md hover:bg-white/40 dark:bg-gray-700/30 dark:hover:bg-gray-600/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Settings Dropdown"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDropdownOpen ? (
            <IoChevronUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <IoMenu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-white/20 bg-white/30 px-4 py-3 shadow-lg backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/30"
          >
            {/* Language Selector */}
            <div className="mb-3">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={redirectedPathName(language.code)}
                  onClick={() => setIsDropdownOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-colors',
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100',
                    locale === language.code &&
                      (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'),
                    language.className
                  )}
                >
                  <language.icon size={20} />
                  {language.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
