'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { IoLanguage } from 'react-icons/io5';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'cn', label: '中文', className: 'font-ma-shan-zheng' }
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

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                    theme === 'dark'
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                )}
            >
                <span className={cn(
                    locale === 'cn' && 'font-ma-shan-zheng'
                )}>
                    {languages.find(lang => lang.code === locale)?.label}
                </span>
                <IoLanguage className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className={cn(
                    "absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50",
                    theme === 'dark' ? "bg-gray-800" : "bg-white"
                )}>
                    {languages.map((language) => (
                        <Link
                            key={language.code}
                            href={redirectedPathName(language.code)}
                            className={cn(
                                "block px-4 py-2 text-sm transition-colors",
                                theme === 'dark'
                                    ? "hover:bg-gray-700 text-gray-300"
                                    : "hover:bg-gray-100 text-gray-700",
                                locale === language.code && (
                                    theme === 'dark' ? "bg-gray-700" : "bg-gray-100"
                                ),
                                language.className
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {language.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
} 