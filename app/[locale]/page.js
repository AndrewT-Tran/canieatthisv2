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
                timestamp: new Date().toISOString()
            },
            ...searchHistory.filter(item => item.query !== query)
        ].slice(0, 10); // Keep only last 10 searches

        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    const handleHistorySelect = (item) => {
        // Re-search the query
        if (item.nutritionData) {
            handleSearch(item.query, item.nutritionData);
        }
    };

    return (
        <div className="relative min-h-screen w-full">
            {/* Settings Buttons */}
            <div className="fixed top-0 right-0 z-50 p-4">
                <SettingsButtons />
            </div>

            {/* Animated background effects */}
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Animated blobs */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 -left-1/3 w-[80vw] h-[80vw]bg-gradient-to-r from-teal-400 to-yellow-200 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-1/4 -right-1/3 w-[80vw] h-[80vw] bg-gradient-to-r from-amber-500/10 to-pink-500/20 rounded-full blur-2xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-1/4 left-1/4 w-[80vw] h-[80vw] bg-gradient-to-r from-blue-200/10 to-cyan-200/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Grain effect overlay */}
                <div className="absolute inset-0 opacity-10 dark:opacity-30 ] mix-blend-overlay" />
            </div>

            {/* Main content */}
            <main className={cn(
                "flex min-h-screen flex-col items-center p-4 sm:p-8",
                locale === 'zh' && 'font-noto-sans-sc'
            )}>
                <div className="container max-w-4xl mx-auto space-y-8">
                    <Header />
                    <div className="space-y-6 w-full p-6">
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