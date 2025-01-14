// SearchBar.js
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoSearch, IoClose } from 'react-icons/io5';
import NutritionAnalysisDialog from './NutritionAnalysisDialog';
import Alert from './Alert';
import { useTranslations } from 'next-intl';
import DisclaimerDialog from './DisclaimerDialog';
import { GoInfo } from "react-icons/go";
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const t = useTranslations();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && !isDialogOpen) {
        setQuery('');
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDialogOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(t('search.error.api'));
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setNutritionData(data);
      setIsDialogOpen(true);
      onSearch(query, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-md
                dark:bg-gray-900/40 bg-white/60
                dark:border-white/10 border-gray-200/50 border
                shadow-lg">
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="relative flex-1">
            <div className={cn(
              "relative flex items-center w-full overflow-hidden rounded-lg sm:rounded-xl",
              "transition duration-300",
              theme === 'dark'
                ? "bg-gray-900/40 hover:bg-gray-900/60"
                : "bg-white/60 hover:bg-white/80",
              "border",
              theme === 'dark'
                ? "border-white/10 hover:border-white/20"
                : "border-gray-200/50 hover:border-gray-300/50"
            )}>
              {/* Search Icon */}
              <div className={cn(
                "absolute left-3 sm:left-4",
                theme === 'dark' ? "text-white/60" : "text-gray-400"
              )}>
                <IoSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className={cn(
                  "w-full py-3 sm:py-4 pl-10 sm:pl-14 pr-24 sm:pr-32 bg-transparent",
                  "text-base sm:text-lg",
                  "placeholder:text-gray-400",
                  theme === 'dark'
                    ? "text-white placeholder:text-white/40"
                    : "text-gray-900 placeholder:text-gray-500/70",
                  "focus:outline-none focus:ring-0"
                )}
              />

              {/* Clear button */}
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={cn(
                    "absolute right-20 sm:right-24 p-1.5 rounded-full",
                    "transition-colors duration-200",
                    theme === 'dark'
                      ? "text-white/40 hover:text-white/90 hover:bg-white/10"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                  )}
                >
                  <IoClose className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Search button */}
              <div className="absolute right-2 sm:right-3">
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className={cn(
                    "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl",
                    "text-sm sm:text-base font-medium",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    theme === 'dark'
                      ? "bg-emerald-500/20 text-light hover:bg-emerald-500/30"
                      : "bg-orange-web/20 text-dark hover:bg-orange-web/30"
                  )}
                >
                  <span className="hidden sm:inline">{isLoading ? t('search.loading') : t('search.button')}</span>
                  <span className="sm:hidden">
                    {isLoading ? t('search.loading') : t('search.buttonShort')}
                  </span>
                </button>
              </div>
            </div>
          </form>
          <DisclaimerDialog triggerIcon={true} />
        </div>
        <p className={cn(
          "text-sm mt-2 px-2",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )}>
          {t('search.quantityExample')}
        </p>
      </div>

      {/* Nutrition Analysis Dialog */}
      <NutritionAnalysisDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        nutritionData={nutritionData}
        foodName={query}
      />

      {/* Error Alert */}
      {error && <Alert error={error} />}
    </>
  );
}
