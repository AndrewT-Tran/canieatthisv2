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
            className="relative w-full py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Title */}
            <div className="relative">
                <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                        ease: "backOut"
                    }}
                >
                    <svg
                        className={cn(
                            "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
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
                </motion.div>
                <motion.h1
                    className="text-center font-bold text-4xl sm:text-5xl md:text-6xl"
                    variants={titleVariants}
                >
                    <div className="inline-block font-climate-crisis">
                        <motion.span
                            className={cn(
                                "font-climate-crisis italic inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.can')}
                        </motion.span>{' '}
                        <motion.span
                            className={cn(
                                "font-climate-crisis italic relative inline-block",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}
                            variants={letterVariants}
                        >
                            {t('header.title.eat')}
                            <motion.div
                                className="absolute -bottom-1 w-full overflow-hidden"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    delay: 0.8,
                                    duration: 0.6,
                                    ease: "easeOut"
                                }}
                            >
                                <svg
                                    className="w-full h-2 sm:h-2.5 md:h-3 transform group-hover:scale-110 transition-transform duration-300"
                                    viewBox="0 0 55 5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
                                        strokeWidth="3"
                                        stroke="currentColor"
                                        className={theme === 'dark' ? "text-emerald-400/50" : "text-orange-web"}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            delay: 0.8,
                                            duration: 0.8,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </svg>
                            </motion.div>
                        </motion.span>{' '}
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
                        "mt-4 text-center font-medium max-w-lg mx-auto",
                        theme === 'dark' ? "text-emerald-200/90" : "text-gray-700"
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
                    "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent",
                    theme === 'dark'
                        ? "via-emerald-400/20"
                        : "via-gray-400/30"
                )}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
} 