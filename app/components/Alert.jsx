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
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        className={cn(
          'relative mx-4 w-full max-w-md rounded-2xl p-6 shadow-xl',
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}
      >
        {/* Close button */}
        <button
          onClick={handleCloseAlert}
          className={cn(
            'absolute right-4 top-4 rounded-full p-2 transition-colors',
            theme === 'dark'
              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          )}
          aria-label={t('common.close')}
        >
          <IoClose className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div
            className={cn(
              'mb-4 flex h-12 w-12 items-center justify-center rounded-full',
              theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
            )}
          >
            <IoWarning
              className={cn(
                'h-6 w-6',
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              )}
            />
          </div>

          {/* Title */}
          <h3
            className={cn(
              'mb-2 text-lg font-semibold',
              theme === 'dark' ? 'text-red-300' : 'text-red-600'
            )}
          >
            {t('common.error')}
          </h3>

          {/* Message */}
          <p
            className={cn(
              'text-sm',
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
