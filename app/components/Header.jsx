'use client';

import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function Header() {
    const { theme } = useTheme();
    const t = useTranslations();

    // Memoize animation variants
    const variants = useMemo(() => ({
        title: {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeOut"
                }
            }
        },
        letter: {
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeOut"
                }
            }
        },
        container: {
            visible: {
                transition: {
                    staggerChildren: 0.1
                }
            }
        }
    }), []);

    // Memoize theme-dependent styles
    const styles = useMemo(() => ({
        icon: cn(
            "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
            theme === 'dark' ? "text-sage" : "text-orange-web"
        ),
        text: cn(
            "font-climate-crisis italic inline-block",
            theme === 'dark' ? "text-ivory" : "text-gray-900"
        ),
        gradient: cn(
            "w-full h-full bg-gradient-to-r animate-gradient rounded-full opacity-60",
            theme === 'dark'
                ? "from-sage via-ivory to-sage"
                : "from-amber-500 via-yellow-500 to-amber-500"
        ),
        subtitle: cn(
            "mt-6 sm:mt-8 text-center font-light text-lg sm:text-xl max-w-lg mx-auto px-4 font-poppins",
            theme === 'dark' ? "text-sage/90" : "text-gray-600"
        ),
        border: cn(
            "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-opacity-50 to-transparent",
            theme === 'dark'
                ? "via-sage/40"
                : "via-amber-500/30"
        ),
        borderGlow: cn(
            "absolute inset-0 bg-gradient-to-r blur-sm",
            theme === 'dark'
                ? "via-sage/20"
                : "via-amber-500/20"
        )
    }), [theme]);

    // Memoize keyframe animations
    const keyframeStyles = useMemo(() => `
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
    `, []);

    return (
        <motion.div
            className="relative w-full py-fluid-8"
            initial="hidden"
            animate="visible"
            variants={variants.container}
        >
            {/* Title */}
            <div className="relative">
                <motion.div
                    className="flex justify-center mb-fluid-6"
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
                            className={styles.icon}
                            viewBox="0 0 24 24"
                        >
                            <style>{keyframeStyles}</style>
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
                    className="text-center font-bold text-fluid-4xl px-fluid-4 mb-fluid-6"
                    variants={variants.title}
                >
                    <div className="flex items-center justify-center gap-fluid-2 tracking-tight font-climate-crisis whitespace-nowrap">
                        <div className="relative flex items-center">
                            <div className="flex gap-fluid-2 relative z-0">
                                <motion.span
                                    className={styles.text}
                                    variants={variants.letter}
                                >
                                    {t('header.title.can')}
                                </motion.span>
                                <motion.span
                                    className={cn(styles.text)}
                                    variants={variants.letter}
                                >
                                    {t('header.title.i')}
                                </motion.span>
                            </div>
                            {/* Animated gradient underline */}
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 mx-auto h-fluid-1 overflow-hidden z-10"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{
                                    delay: 0.8,
                                    duration: 0.6,
                                    ease: "easeOut"
                                }}
                            >
                                <div className={styles.gradient} />
                            </motion.div>
                        </div>
                        <motion.span
                            className={styles.text}
                            variants={variants.letter}
                        >
                            {t('header.title.eat')}
                        </motion.span>
                        <motion.span
                            className={cn(styles.text, "not-italic")}
                            variants={variants.letter}
                        >
                            {t('header.title.this')}
                        </motion.span>
                    </div>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className={cn(
                        "text-center text-fluid-lg max-w-lg mx-auto px-fluid-4 font-poppins tracking-wide",
                        theme === 'dark' ? "text-slate-600/90" : "text-gray-600"
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
                className={styles.border}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                <div className={styles.borderGlow} />
            </motion.div>
        </motion.div>
    );
} 