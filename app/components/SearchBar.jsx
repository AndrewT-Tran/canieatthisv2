'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoSearch, IoClose } from 'react-icons/io5';
import NutritionAnalysisDialog from './NutritionAnalysisDialog';
import Alert from './Alert';
import { useTranslations } from 'next-intl';
import DisclaimerDialog from './DisclaimerDialog';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, placeholder, buttonText, value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const t = useTranslations();

  const query = value;
  const setQuery = onChange;

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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error(t('search.error.server') || 'Internal server error occurred');
        }
        throw new Error(data.error || t('search.error.api'));
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setNutritionData(data);
      setIsDialogOpen(true);
      onSearch(query, data);
    } catch (err) {
      console.error('Nutrition API Error:', err);
      setError(err.message || t('search.error.generic'));
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
      <div
        className={cn(
          'w-full rounded-xl p-4 backdrop-blur-md sm:rounded-2xl sm:p-6',
          'border shadow-lg transition-colors duration-300',
          theme === 'dark'
            ? 'bg-gray-800 text-white dark:border-white/10 dark:bg-gray-900/40'
            : 'border-gray-200 bg-white text-gray-900'
        )}
      >
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="relative flex-1">
            <div
              className={cn(
                'relative flex w-full items-center overflow-hidden rounded-lg sm:rounded-xl',
                'transition duration-300',
                theme === 'dark'
                  ? 'bg-gray-900/40 hover:bg-gray-900/60'
                  : 'bg-white/60 hover:bg-white/80',
                'border',
                theme === 'dark'
                  ? 'border-white/10 hover:border-white/20'
                  : 'border-gray-200/50 hover:border-gray-300/50'
              )}
            >
              {/* Search Icon (Mobile Button) */}
              <div className="absolute left-3 sm:left-4 sm:hidden">
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="p-2"
                >
                  <IoSearch className="h-6 w-6" />
                </button>
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'w-full bg-transparent py-3 pl-10 pr-10 sm:py-4 sm:pl-14 sm:pr-32',
                  'text-xs sm:text-xs',
                  'placeholder:text-gray-400 focus:outline-none focus:ring-0',
                  theme === 'dark'
                    ? 'text-white placeholder:text-white/40'
                    : 'text-gray-900 placeholder:text-gray-500'
                )}
              />

              {/* Clear Button */}
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={cn(
                    'absolute right-20 rounded-full p-1.5 sm:right-24',
                    'transition-colors duration-200',
                    theme === 'dark'
                      ? 'text-white/40 hover:bg-white/10 hover:text-white/90'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  )}
                >
                  <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              )}

              {/* Search Button (Desktop) */}
              <div className="absolute right-2 sm:right-3 hidden sm:block">
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm sm:rounded-xl sm:text-xs',
                    'transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
                    theme === 'dark'
                      ? 'bg-emerald-400/20 text-white hover:bg-emerald-500/30'
                      : 'bg-orange-500/20 text-gray-900 hover:bg-orange-500/30'
                  )}
                >
                  {isLoading ? t('search.loading') : buttonText}
                </button>
              </div>
            </div>
          </form>
          <DisclaimerDialog triggerIcon={true} />
        </div>

        <p
          className={cn(
            'mt-2 px-2 text-sm',
            theme === 'dark' ? 'text-gray-100' : 'text-gray-500'
          )}
        >
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
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;