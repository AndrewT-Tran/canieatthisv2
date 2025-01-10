// SearchBar.js
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoSearch, IoClose } from 'react-icons/io5';
import NutritionAnalysisDialog from './NutritionAnalysisDialog';
import Alert from './Alert';
import { useTranslations } from 'next-intl';

export default function SearchBar({ onSearch, placeholder = 'Search...', buttonText = 'Search' }) {
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
      <div className="w-full p-fluid-4 sm:p-fluid-6 rounded-xl sm:rounded-2xl backdrop-blur-md
        dark:bg-gray-900/40 bg-white/60
        dark:border-white/10 border-gray-200/50 border
        shadow-lg">
        <form onSubmit={handleSubmit} className="relative w-full">
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
              "absolute left-fluid-3 sm:left-fluid-4",
              theme === 'dark' ? "text-white/60" : "text-gray-400"
            )}>
              <IoSearch className="w-fluid-4 sm:w-fluid-5 h-fluid-4 sm:h-fluid-5" />
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full py-fluid-3 sm:py-fluid-4 pl-fluid-10 sm:pl-fluid-12 pr-[5.5rem] sm:pr-fluid-32 bg-transparent",
                "text-fluid-sm sm:text-fluid-base",
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
                  "absolute right-[4.5rem] sm:right-fluid-24 p-fluid-1 sm:p-fluid-1.5 rounded-full",
                  "transition-colors duration-200",
                  theme === 'dark'
                    ? "text-white/40 hover:text-white/90 hover:bg-white/10"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                )}
              >
                <IoClose className="w-fluid-4 sm:w-fluid-5 h-fluid-4 sm:h-fluid-5" />
              </button>
            )}

            {/* Search button */}
            <div className="absolute right-fluid-2 sm:right-fluid-3">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className={cn(
                  "px-fluid-3 sm:px-fluid-4 py-fluid-1 sm:py-fluid-1.5 rounded-lg sm:rounded-xl",
                  "text-fluid-xs sm:text-fluid-sm font-medium",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  theme === 'dark'
                    ? "bg-emerald-500/20 text-light hover:bg-emerald-500/30"
                    : "bg-orange-web/20 text-dark hover:bg-orange-web/30"
                )}
              >
                <span className="hidden sm:inline">{isLoading ? t('search.loading') : buttonText}</span>
                <span className="sm:hidden">
                  {isLoading ? t('search.loading') : t('search.button.short')}
                </span>
              </button>
            </div>
          </div>
        </form>
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
