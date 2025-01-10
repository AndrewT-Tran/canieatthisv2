'use client';

import { IoSunny, IoMoon } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full 
                bg-white/10 backdrop-blur-sm border border-white/20
                dark:bg-gray-800/50 dark:border-gray-700/50
                hover:bg-white/20 dark:hover:bg-gray-800/70
                transition-all duration-300
                group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun icon */}
                <div className={`absolute inset-0 transform transition-transform duration-500 
                        ${theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <IoSunny className="w-full h-full text-yellow-400" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full opacity-20 
                          group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Moon icon */}
                <div className={`absolute inset-0 transform transition-transform duration-500 
                        ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                    <IoMoon className="w-full h-full text-blue-200" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-blue-100 rounded-full opacity-20 
                          group-hover:opacity-30 transition-opacity" />
                </div>
            </div>
        </button>
    );
} 