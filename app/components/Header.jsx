'use client';

import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';
import { useTranslations } from 'next-intl';

export default function Header() {
    const { theme } = useTheme();
    const t = useTranslations();

    return (
        <div className="relative w-full py-8">
            {/* Title */}
            <div className="relative">
                <h1 className="text-center font-bold text-4xl sm:text-5xl md:text-6xl">
                    <div className="inline-block font-climate-crisis">
                        <span className={cn(
                            "font-climate-crisis italic",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>{t('header.title.can')} </span>{' '}
                        <span className={cn(
                            "font-climate-crisis italic relative",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>{t('header.title.eat')}
                            <div className="absolute -bottom-1 w-full overflow-hidden">
                                <svg
                                    className="w-full h-2 sm:h-2.5 md:h-3 transform group-hover:scale-110 transition-transform duration-300"
                                    viewBox="0 0 55 5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
                                        strokeWidth="3"
                                        stroke="currentColor"
                                        className={theme === 'dark' ? "text-emerald-400/50" : "text-orange-web"}
                                    />
                                </svg>
                            </div>
                        </span>{' '}
                        <span className={cn(
                            "font-climate-crisis not-italic",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>{t('header.title.this')}</span>
                    </div>
                </h1>

                {/* Subtitle */}
                <p className={cn(
                    "mt-4 text-center font-medium max-w-lg mx-auto",
                    theme === 'dark' ? "text-emerald-200/90" : "text-gray-700"
                )}>
                    {t('header.subtitle')}
                </p>
            </div>

            {/* Bottom Border */}
            <div className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent",
                theme === 'dark'
                    ? "via-emerald-400/20"
                    : "via-gray-400/30"
            )} />
        </div>
    );
} 