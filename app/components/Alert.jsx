'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoClose, IoWarning } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

export default function Alert({ error }) {
    const [showAlert, setShowAlert] = useState(true);
    const { theme } = useTheme();
    const t = useTranslations();

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    if (!showAlert) return null;

    return (
        <div
            role="alert"
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 animate-fade-in"
        >
            <div className={cn(
                "relative w-full max-w-md mx-4 rounded-2xl p-6 shadow-xl",
                theme === 'dark' ? "bg-gray-900" : "bg-white"
            )}>
                {/* Close button */}
                <button
                    onClick={handleCloseAlert}
                    className={cn(
                        "absolute top-4 right-4 p-2 rounded-full transition-colors",
                        theme === 'dark'
                            ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                            : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    )}
                    aria-label={t('common.close')}
                >
                    <IoClose className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full mb-4",
                        theme === 'dark' ? "bg-red-500/20" : "bg-red-100"
                    )}>
                        <IoWarning className={cn(
                            "w-6 h-6",
                            theme === 'dark' ? "text-red-300" : "text-red-600"
                        )} />
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                        "text-lg font-semibold mb-2",
                        theme === 'dark' ? "text-red-300" : "text-red-600"
                    )}>
                        {t('common.error')}
                    </h3>

                    {/* Message */}
                    <p className={cn(
                        "text-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                    )}>
                        {error}
                    </p>
                </div>
            </div>
        </div>
    );
} 