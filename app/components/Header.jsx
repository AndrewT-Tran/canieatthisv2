'use client';

import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Header() {
    const { theme } = useTheme();
    const t = useTranslations();

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            className="relative w-full py-12 sm:py-16 md:py-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Title */}
            <div className="relative">
                <motion.div
                    className="flex justify-center mb-8 sm:mb-10 md:mb-12"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                        ease: "backOut"
                    }}
                >
                    <div className="relative">
                        <svg
                            className={cn(
                                "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
                                theme === 'dark' ? "text-emerald-400" : "text-orange-web"
                            )}
                            viewBox="0 0 24 24"
                        >
                            <style>
                                {`
                                    @keyframes bounce {
                                        0%, 100% { transform: translateY(0); }
                                        50% { transform: translateY(-2px); }
                                    }
                                    @keyframes blink {
                                        0%, 100% { transform: scaleY(1); }
                                        45% { transform: scaleY(1); }
                                        50% { transform: scaleY(0.1); }
                                        55% { transform: scaleY(1); }
                                    }
                                    @keyframes smile {
                                        0% { transform: scale(1); }
                                        50% { transform: scale(1.05); }
                                        100% { transform: scale(1); }
                                    }
                                    .face { animation: bounce 2s ease-in-out infinite; }
                                    .eye { animation: blink 3s ease-in-out infinite; }
                                    .smile { animation: smile 2s ease-in-out infinite; }
                                    @keyframes gradient-shift {
                                        0% { background-position: 0% 50%; }
                                        100% { background-position: 200% 50%; }
                                    }
                                    .animate-gradient {
                                        background-size: 250% 100%;
                                        animation: gradient-shift 3s linear infinite;
                                        padding-right: 0.1em;
                                    }
                                `}
                            </style>
                            <g fill="none" className="face">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path
                                    className="smile"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                    d="M8.913 15.934c1.258.315 2.685.315 4.122-.07c1.437-.385 2.673-1.099 3.605-2.001"
                                />
                                <g className="eye">
                                    <ellipse
                                        cx="14.509"
                                        cy="9.774"
                                        fill="currentColor"
                                        rx="1"
                                        ry="1.5"
                                        transform="rotate(-15 14.51 9.774)"
                                    />
                                    <ellipse
                                        cx="8.714"
                                        cy="11.328"
                                        fill="currentColor"
                                        rx="1"
                                        ry="1.5"
                                        transform="rotate(-15 8.714 11.328)"
                                    />
                                </g>
                                <path
                                    className="smile"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="m13 16l.478.974a1.5 1.5 0 1 0 2.693-1.322l-.46-.935"
                                />
                            </g>
                        </svg>
                    </div>
                </motion.div>
                <motion.h1
                    className="text-center font-bold text-4xl sm:text-5xl md:text-6xl px-4"
                    variants={titleVariants}
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 font-climate-crisis whitespace-nowrap">
                        <motion.span
                            className={cn(
                                "font-climate-crisis italic inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.can')}
                        </motion.span>
                        <motion.span
                            className={cn(
                                "font-climate-crisis italic inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.i')}
                        </motion.span>
                        <motion.span
                            className={cn(
                                "font-climate-crisis italic inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.eat')}
                        </motion.span>
                        <motion.span
                            className={cn(
                                "font-climate-crisis not-italic inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.this')}
                        </motion.span>
                    </div>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className={cn(
                        "mt-6 sm:mt-8 text-center font-light text-lg sm:text-xl max-w-lg mx-auto px-4",
                        theme === 'dark' ? "text-emerald-200/90" : "text-gray-600"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                >
                    {t('header.subtitle')}
                </motion.p>
            </div>

            {/* Bottom Border */}
            <motion.div
                className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-opacity-50 to-transparent",
                    theme === 'dark'
                        ? "via-emerald-400/40"
                        : "via-amber-500/30"
                )}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-r blur-sm",
                    theme === 'dark'
                        ? "via-emerald-400/20"
                        : "via-amber-500/20"
                )} />
            </motion.div>
        </motion.div>
    );
} 