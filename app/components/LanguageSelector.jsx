'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { IoChevronDown } from 'react-icons/io5';
import { FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'en', label: 'English', icon: FaGlobeAmericas },
    { code: 'es', label: 'Español', icon: FaGlobeEurope },
    { code: 'cn', label: '中文', icon: FaGlobeAsia, className: 'font-ma-shan-zheng' },
    { code: 'vi', label: 'Tiếng Việt', icon: FaGlobeAsia }
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const locale = useLocale();

    const redirectedPathName = (locale) => {
        if (!window.location.pathname) return '/';
        const segments = window.location.pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const currentLanguage = languages.find(lang => lang.code === locale);
    const LanguageIcon = currentLanguage?.icon || FaGlobeAmericas;

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                    theme === 'dark'
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700",
                    isOpen && (theme === 'dark' ? "bg-gray-800" : "bg-gray-100")
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className={cn(
                    currentLanguage?.className,
                    "min-w-[60px] text-left"
                )}>
                    {currentLanguage?.label}
                </span>
                <LanguageIcon className="w-5 h-5" />
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50",
                            theme === 'dark' ? "bg-gray-800" : "bg-white"
                        )}
                    >
                        {languages.map((language) => {
                            const Icon = language.icon;
                            return (
                                <Link
                                    key={language.code}
                                    href={redirectedPathName(language.code)}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                                        theme === 'dark'
                                            ? "hover:bg-gray-700 text-gray-300"
                                            : "hover:bg-gray-100 text-gray-700",
                                        locale === language.code && (
                                            theme === 'dark' ? "bg-gray-700" : "bg-gray-100"
                                        ),
                                        language.className
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {language.label}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 