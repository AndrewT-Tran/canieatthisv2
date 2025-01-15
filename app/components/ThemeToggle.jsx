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
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      rotate: 180,
      scale: 0.5,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="relative rounded-full bg-white/50 
                p-2 transition-all
                duration-200 hover:bg-white/80
                disabled:cursor-not-allowed disabled:opacity-50
                dark:bg-white/10 dark:hover:bg-white/20"
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
            <IoMoon className="h-5 w-5 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <IoSunny className="h-5 w-5 text-orange-web" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
