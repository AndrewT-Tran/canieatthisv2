'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoWarning, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { GoInfo } from 'react-icons/go';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export default function DisclaimerDialog({ triggerIcon = false }) {
  const { theme } = useTheme();
  const t = useTranslations('disclaimer');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  useOnClickOutside(dialogRef, () => {
    if (isOpen) handleClose();
  });

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setIsOpen(false);
  };

  return (
    <>
      {triggerIcon && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'flex items-center gap-2 rounded-lg p-2 transition-colors',
            theme === 'dark'
              ? 'text-gray-300 hover:bg-gray-800'
              : 'text-gray-700 hover:bg-gray-100'
          )}
          title={t('title')}
        >
          <GoInfo className="h-5 w-5" />
        </button>
      )}

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Full-screen overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Dialog Box */}
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-[90vh] min-h-fit w-full max-w-sm items-start sm:max-w-md lg:max-w-lg"
          >
            <Dialog.Panel
              ref={dialogRef}
              className={cn(
                'mx-auto w-full overflow-y-auto rounded-xl p-4 shadow-xl sm:p-6',
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              )}
            >
              {/* Header */}
              <div className="sticky top-0 mb-4 flex items-center justify-between bg-inherit pb-2 pt-2">
                <Dialog.Title
                  className={cn(
                    'flex items-center gap-2 text-lg font-bold sm:text-xl',
                    theme === 'dark' ? 'text-white' : 'text-gray-900',
                    locale === 'cn' && 'font-ma-shan-zheng'
                  )}
                >
                  <GoInfo
                    className={cn(
                      'h-5 w-5 sm:h-6 sm:w-6',
                      theme === 'dark' ? 'text-emerald-400' : 'text-orange-web'
                    )}
                  />
                  {t('title')}
                </Dialog.Title>
                <button
                  onClick={handleClose}
                  className={cn(
                    'rounded-full p-1 transition-colors sm:p-2',
                    theme === 'dark'
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  )}
                >
                  <IoClose className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Calculation Method */}
                <div
                  className={cn(
                    'rounded-lg p-3 sm:p-4',
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  )}
                >
                  <h3
                    className={cn(
                      'text-md mb-2 flex items-center gap-2 font-semibold sm:text-sm',
                      theme === 'dark' ? 'text-emerald-300' : 'text-orange-web',
                      locale === 'zh' && 'font-ma-shan-zheng'
                    )}
                  >
                    <IoCheckmarkCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    {t('calculation.title')}
                  </h3>
                  <p
                    className={cn(
                      'text-sm sm:text-sm',
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
                      locale === 'zh' && 'font-ma-shan-zheng'
                    )}
                  >
                    {t('calculation.description')}
                  </p>
                </div>

                {/* Medical Disclaimer */}
                <div
                  className={cn(
                    'rounded-lg p-3 sm:p-4',
                    theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'
                  )}
                >
                  <h3
                    className={cn(
                      'text-md mb-2 flex items-center gap-2 font-semibold sm:text-sm',
                      theme === 'dark' ? 'text-amber-300' : 'text-amber-700',
                      locale === 'zh' && 'font-ma-shan-zheng'
                    )}
                  >
                    <IoWarning className="h-4 w-4 sm:h-5 sm:w-5" />
                    {t('medical.title')}
                  </h3>
                  <div
                    className={cn(
                      'space-y-2 text-sm sm:text-sm',
                      theme === 'dark' ? 'text-amber-200' : 'text-amber-700',
                      locale === 'zh' && 'font-ma-shan-zheng'
                    )}
                  >
                    <p>{t('medical.description')}</p>
                    <p>{t('medical.advice')}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>{t('medical.items.condition')}</li>
                      <li>{t('medical.items.restrictions')}</li>
                      <li>{t('medical.items.changes')}</li>
                      <li>{t('medical.items.management')}</li>
                    </ul>
                  </div>
                </div>

                {/* Acknowledgment Button */}
                <button
                  onClick={handleClose}
                  className={cn(
                    'mt-4 w-full rounded-lg px-4 py-2 font-light transition-colors',
                    theme === 'dark'
                      ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      : 'bg-orange-web/20 text-orange-web hover:bg-orange-web/30',
                    locale === 'zh' && 'font-ma-shan-zheng'
                  )}
                >
                  {t('button')}
                </button>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}
