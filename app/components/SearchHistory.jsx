'use client';

import { useState, useCallback } from 'react';
import {
  IoTimeOutline,
  IoClose,
  IoChevronDown,
  IoNutrition,
  IoWarning,
  IoCheckmarkCircle,
  IoGrid,
} from 'react-icons/io5';
import NutrientTable from './NutrientTable';
import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import useNutritionData from '../hooks/useNutritionData';
import { motion } from 'framer-motion';
import NutritionAnalysis from './NutritionAnalysis';
import { useTranslations } from 'next-intl';

const ITEMS_PER_PAGE = 5;

// Format timestamp to relative time (e.g., "2 hours ago", "just now", etc.)
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export default function SearchHistory({ history, onSelect, onClear }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { theme } = useTheme();
  const { analysisResult } = useNutritionData();
  const t = useTranslations();

  const handleItemClick = useCallback(
    (item) => {
      onSelect(item);
    },
    [onSelect]
  );

  const handleClearClick = useCallback(
    (e) => {
      e.preventDefault();
      onClear();
    },
    [onClear]
  );

  const handleViewNutrition = useCallback((e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setShowNutrition(true);
  }, []);

  const handleViewTable = useCallback((e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setShowTable(true);
  }, []);

  if (!history?.length) return null;

  const getDisplayText = (item) => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      return item.query || item.text || item.toString();
    }
    return 'Unknown item';
  };

  const displayedHistory = showAll ? history : history.slice(0, ITEMS_PER_PAGE);
  const hasMore = history.length > ITEMS_PER_PAGE;

  // Check if nutrition data is empty or has zero values
  const hasNoNutrients = (nutritionData) => {
    if (!nutritionData || !nutritionData.totalNutrients) return true;
    return (
      Object.keys(nutritionData.totalNutrients).length === 0 ||
      (nutritionData.calories === 0 &&
        Object.values(nutritionData.totalNutrients).every(
          (n) => n?.quantity === 0
        ))
    );
  };

  return (
    <>
      <div
        className="w-full rounded-2xl border border-gray-200/50
                bg-white/60 p-6
                shadow-lg backdrop-blur-md dark:border-white/10
                dark:bg-gray-900/40"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white/80">
            <div className="relative h-4 w-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-celestial-blue to-asparagus opacity-60" />
              <IoTimeOutline className="relative h-full w-full" />
            </div>
            <span className="text-sm font-medium">Recent Searches</span>
          </div>
          <button
            onClick={handleClearClick}
            className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-white/40 dark:hover:text-white/90"
          >
            <IoClose className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* History List */}
        <div className="space-y-2">
          {displayedHistory.map((item) => (
            <div
              key={item.timestamp}
              onClick={() => handleItemClick(item)}
              className="group relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 
                                py-2.5 transition-all
                                duration-200 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-gray-900 dark:text-white/90">
                    {item.query}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-white/40">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleViewTable(e, item)}
                  className="relative rounded-lg bg-white/60
                                        p-2 transition-all
                                        duration-200 hover:bg-white/80
                                        dark:bg-white/10 dark:hover:bg-white/20"
                  title={t('search.viewAsTable')}
                >
                  <IoGrid className="h-4 w-4 dark:text-white/80" />
                </button>
                <button
                  onClick={(e) => handleViewNutrition(e, item)}
                  className="relative rounded-lg bg-white/60
                                        p-2 transition-all
                                        duration-200 hover:bg-white/80
                                        dark:bg-white/10 dark:hover:bg-white/20"
                  title={t('search.viewNutrition')}
                >
                  <IoNutrition className="h-4 w-4 dark:text-white/80" />
                </button>
              </div>
            </div>
          ))}

          {/* Show More Button */}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group mt-2 flex w-full items-center justify-center gap-2 py-2
                                text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-white/50 dark:hover:text-white/70"
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              <IoChevronDown
                className={`h-4 w-4 transition-transform duration-300 
                                    ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Nutrition Analysis Modal */}
      <NutritionAnalysis
        isOpen={showNutrition}
        onClose={() => setShowNutrition(false)}
        nutritionData={selectedItem?.nutritionData}
      />

      {/* Table View Modal */}
      <Dialog
        open={showTable}
        onClose={() => setShowTable(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={cn(
              'max-h-[90vh] w-full overflow-hidden rounded-2xl shadow-xl',
              'flex flex-col',
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            )}
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <Dialog.Title
                className={cn(
                  'flex items-center gap-2 text-xl font-bold',
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}
              >
                <IoGrid
                  className={cn(
                    theme === 'dark' ? 'text-emerald-400' : 'text-orange-web'
                  )}
                />
                {selectedItem?.query} - Nutrition Table
              </Dialog.Title>
              <button
                onClick={() => setShowTable(false)}
                className={cn(
                  'rounded-full p-2 transition-colors',
                  theme === 'dark'
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <NutrientTable nutritionData={selectedItem?.nutritionData} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
