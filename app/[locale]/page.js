'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import SettingsButtons from '../components/SettingsButtons';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '../utils/cn';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (query, nutritionData) => {
    const newHistory = [
      {
        query,
        nutritionData,
        timestamp: new Date().toISOString(),
      },
      ...searchHistory.filter((item) => item.query !== query),
    ].slice(0, 10); // Keep only last 10 searches

    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleHistorySelect = (item) => {
    if (item.nutritionData) {
      handleSearch(item.query, item.nutritionData);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Settings Buttons */}
      <div className="fixed right-4 top-4 z-50">
        <SettingsButtons />
      </div>

      {/* Animated Background Effects */}
      <div className="pointer-events-none fixed inset-0 h-full w-full blur-md">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-40%] top-0 h-[70vw] w-[70vw] animate-blob rounded-full bg-gradient-to-r from-teal-700 to-yellow-600 blur-3xl" />
          <div className="animation-delay-2000 absolute right-[-20%] top-1/3 h-[70vw] w-[70vw] animate-blob rounded-full bg-gradient-to-r from-amber-500/10 to-pink-500 blur-2xl" />
          <div className="animation-delay-4000 absolute bottom-[-20%] left-1/4 h-[70vw] w-[70vw] animate-blob rounded-full bg-gradient-to-r from-blue-200/10 to-cyan-200/20 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-10 mix-blend-overlay dark:opacity-30"></div>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          'flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:px-8',
          locale === 'zh' && 'font-noto-sans-sc'
        )}
      >
        <div className="container max-w-4xl space-y-8">
          <Header />
          <div className="w-full space-y-6 rounded-lg bg-white/70 p-4 shadow-lg dark:bg-gray-800/70 sm:p-6">
            <SearchBar
              placeholder={t('search.placeholder')}
              buttonText={t('search.button')}
              onSearch={handleSearch}
            />
            <SearchHistory
              history={searchHistory}
              onSelect={handleHistorySelect}
              onClear={handleClearHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
