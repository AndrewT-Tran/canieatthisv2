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
      <div className="w-full">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className={cn(
            "relative flex items-center w-full overflow-hidden rounded-2xl shadow-lg",
            "transition duration-300",
            theme === 'dark'
              ? "bg-gray-900/30 hover:bg-gray-900/50 backdrop-blur-xl"
              : "bg-white/70 hover:bg-white/90 backdrop-blur-xl",
            "border",
            theme === 'dark'
              ? "border-white/10 hover:border-white/20"
              : "border-gray-200/50 hover:border-gray-300/50"
          )}>
            {/* Search Icon */}
            <div className={cn(
              "absolute left-4",
              theme === 'dark' ? "text-white/50" : "text-gray-400"
            )}>
              <IoSearch className="w-5 h-5" />
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full py-4 pl-12 pr-32 bg-transparent",
                "placeholder:text-gray-400",
                theme === 'dark'
                  ? "text-white/90 placeholder:text-white/50"
                  : "text-gray-900 placeholder:text-gray-500",
                "focus:outline-none focus:ring-0"
              )}
            />

            {/* Clear button */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "absolute right-24 p-1.5 rounded-full",
                  "transition-colors duration-200",
                  theme === 'dark'
                    ? "text-white/50 hover:text-white/80 hover:bg-white/10"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
              >
                <IoClose className="w-5 h-5" />
              </button>
            )}

            {/* Search button */}
            <div className="absolute right-3">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className={cn(
                  "px-4 py-1.5 rounded-xl font-medium text-sm",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  theme === 'dark'
                    ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "bg-orange-web/10 text-orange-web hover:bg-orange-web/20"
                )}
              >
                {isLoading ? t('search.loading') : buttonText}
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
