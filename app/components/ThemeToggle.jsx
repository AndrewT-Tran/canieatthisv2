'use client';

import { useTheme } from '../context/ThemeContext';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme, isTransitioning } = useTheme();

    const iconVariants = {
        initial: {
            opacity: 0,
            rotate: -180,
            scale: 0.5
        },
        animate: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            rotate: 180,
            scale: 0.5,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            disabled={isTransitioning}
            className="relative p-2 rounded-lg 
                dark:bg-white/10 bg-white/50
                dark:hover:bg-white/20 hover:bg-white/80
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <IoMoon className="w-5 h-5 text-white" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <IoSunny className="w-5 h-5 text-orange-web" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
} 