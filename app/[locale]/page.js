'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import SettingsButtons from '../components/SettingsButtons';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations();
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
        <div className="min-h-screen w-full">
            {/* Settings Buttons */}
            <SettingsButtons />

            {/* Animated background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Animated blobs */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-orange-300/20 dark:bg-lime-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-orange-100/40 dark:bg-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Grain effect overlay */}
                <div className="absolute inset-0 opacity-5 dark:opacity-20 bg-[url('/noise.png')] pointer-events-none" />
            </div>

            {/* Main content */}
            <div className="relative w-full min-h-screen pt-20 pb-8">
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-8 px-4">
                    <Header />
                    <div className="w-full space-y-6">
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
            </div>
        </div>
    );
} 