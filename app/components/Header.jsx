'use client';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';

export default function Header() {
  const { theme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  // Memoize animation variants
  const variants = useMemo(
    () => ({
      title: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      },
      letter: {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      },
      container: {
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      },
    }),
    []
  );

  // Theme-dependent styles
  const styles = useMemo(
    () => ({
      icon: cn(
        'h-[clamp(48px,72px,100px)] w-[clamp(48px,72px,100px)]',
        theme === 'dark' ? 'text-sage' : 'text-orange-web'
      ),
      text: cn(
        'inline-block font-climate-crisis text-4xl italic sm:text-5xl md:text-6xl',
        theme === 'dark' ? 'text-ivory' : 'text-gray-900'
      ),
      gradient: cn(
        'animate-gradient h-full w-full rounded-full bg-gradient-to-r opacity-60',
        theme === 'dark'
          ? 'from-sage via-ivory to-sage'
          : 'from-amber-500 via-yellow-500 to-amber-500'
      ),
      subtitle: cn(
        'font-poppins mx-auto mt-6 max-w-2xl px-4 text-center text-lg font-light sm:mt-8 sm:text-xl',
        theme === 'dark' ? 'text-sage/90' : 'text-gray-600'
      ),
      border: cn(
        'via-opacity-50 absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent to-transparent',
        theme === 'dark' ? 'via-sage/40' : 'via-amber-500/30'
      ),
      borderGlow: cn(
        'absolute inset-0 bg-gradient-to-r blur-sm',
        theme === 'dark' ? 'via-sage/20' : 'via-amber-500/20'
      ),
    }),
    [theme]
  );

  // Keyframe animations
  const keyframeStyles = useMemo(
    () => `
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5%); }
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

.face {
    animation: bounce 3s ease-in-out infinite;
}

.eye {
    animation: blink 2s ease-in-out infinite;
}

.smile {
    animation: smile 4s ease-in-out infinite;
}
`,
    []
  );

  // Hydration handling
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      className="relative w-full px-4 py-6 sm:px-8"
      initial={isClient ? 'hidden' : false}
      animate={isClient ? 'visible' : false}
      variants={variants.container}
    >
      {/* Title Section */}
      <div className="relative mx-auto max-w-2xl">
        <motion.div
          className="mb-4 flex justify-center sm:mb-6"
          initial={isClient ? { scale: 0, rotate: -180 } : false}
          animate={isClient ? { scale: 1, rotate: 0 } : false}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: 'backOut',
          }}
        >
          <div className="flex items-center justify-center">
            <div className="p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-[clamp(48px,72px,100px)] w-[clamp(48px,72px,100px)] text-current"
              >
                <style>{keyframeStyles}</style>
                <g fill="none" className="face">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
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
          </div>
        </motion.div>
        <motion.h1
          className="px-4 text-center text-fluid-4xl font-bold leading-tight"
          variants={variants.title}
          initial={isClient ? 'hidden' : false}
          animate={isClient ? 'visible' : false}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 tracking-tight">
            {['Can', 'I', 'Eat', 'This'].map((word, index) => (
              <motion.span
                key={word}
                className={cn(
                  styles.text,
                  locale === 'es' && 'text-xl sm:text-2xl'
                )}
                variants={variants.letter}
              >
                {t(`header.title.${word.toLowerCase()}`)}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={isClient ? { opacity: 0, y: 20 } : false}
          animate={isClient ? { opacity: 1, y: 0 } : false}
          transition={{
            delay: 1,
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {t('header.subtitle')}
        </motion.p>
      </div>

      {/* Bottom Border */}
      <motion.div
        className={styles.border}
        initial={isClient ? { scaleX: 0, opacity: 0 } : false}
        animate={isClient ? { scaleX: 1, opacity: 1 } : false}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <div className={styles.borderGlow} />
      </motion.div>
    </motion.div>
  );
}
