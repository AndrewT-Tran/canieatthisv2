'use client';

import { useState, useCallback } from 'react';
import { IoTimeOutline, IoClose, IoChevronDown, IoNutrition, IoWarning, IoCheckmarkCircle, IoGrid } from 'react-icons/io5';
import NutrientTable from './NutrientTable';
import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import useNutritionData from '../hooks/useNutritionData';
import { motion } from 'framer-motion';
import NutritionAnalysis from './NutritionAnalysis';

const ITEMS_PER_PAGE = 5;

export default function SearchHistory({ history, onSelect, onClear }) {
    const [showAll, setShowAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showNutrition, setShowNutrition] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const { theme } = useTheme();
    const { analysisResult } = useNutritionData();

    const handleItemClick = useCallback((item, e) => {
        e.preventDefault();
        onSelect(item);
    }, [onSelect]);

    const handleClearClick = useCallback((e) => {
        e.preventDefault();
        onClear();
    }, [onClear]);

    const handleShowNutrition = useCallback((item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedItem(item);
        setShowNutrition(true);
    }, []);

    const handleShowTable = useCallback((item, e) => {
        e.preventDefault();
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
        return Object.keys(nutritionData.totalNutrients).length === 0 ||
            (nutritionData.calories === 0 && Object.values(nutritionData.totalNutrients).every(n => n?.quantity === 0));
    };

    return (
        <div className="w-full p-10">
            <div className="relative p-6 rounded-xl backdrop-blur-md
                dark:bg-gray-900/30 bg-white/70
                dark:border-white/10 border-gray-200/50 border
                shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 dark:text-white/70 text-gray-800">
                        <div className="relative w-4 h-4">
                            <div className="absolute inset-0 bg-gradient-to-r from-celestial-blue to-asparagus rounded-full opacity-50" />
                            <IoTimeOutline className="relative w-full h-full" />
                        </div>
                        <span className="text-sm font-medium">Recent Searches</span>
                    </div>
                    <button
                        onClick={handleClearClick}
                        className="text-xs dark:text-white/50 text-gray-500 dark:hover:text-white/70 hover:text-gray-700 transition-colors flex items-center gap-1"
                    >
                        <IoClose className="w-3.5 h-3.5" />
                        <span>Clear</span>
                    </button>
                </div>

                {/* History List */}
                <div className="space-y-2">
                    {displayedHistory.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => handleItemClick(item, e)}
                            className="w-full group relative flex items-center gap-3 px-4 py-2.5 rounded-lg 
                                dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white
                                dark:border-white/10 border-gray-200/50 dark:hover:border-lime-400/30 hover:border-celestial-blue/30
                                backdrop-blur-sm
                                shadow-sm hover:shadow-md
                                transition-all duration-200"
                        >
                            {/* Gradient Hover Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                bg-gradient-to-r from-celestial-blue/5 via-asparagus/5 to-celestial-blue/5 rounded-lg" />

                            {/* Content */}
                            <div className="relative flex-1 text-left">
                                <p className="text-sm dark:text-white/80 text-gray-700 dark:group-hover:text-white group-hover:text-gray-900 transition-colors">
                                    {getDisplayText(item)}
                                </p>
                                {item.timestamp && (
                                    <p className="text-xs dark:text-white/40 text-gray-400 mt-1">
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            {item.nutritionData && !hasNoNutrients(item.nutritionData) && (
                                <div className="flex items-center gap-2">
                                    {/* Table View Button */}
                                    <button
                                        onClick={(e) => handleShowTable(item, e)}
                                        className="relative p-2 rounded-lg dark:bg-white/10 bg-white/50 
                                            dark:hover:bg-white/20 hover:bg-white/80
                                            transition-all duration-200"
                                        title="View as table"
                                    >
                                        <IoGrid className="w-4 h-4 dark:text-white/70 text-gray-600" />
                                    </button>
                                    {/* Nutrition Button */}
                                    <button
                                        onClick={(e) => handleShowNutrition(item, e)}
                                        className="relative p-2 rounded-lg dark:bg-white/10 bg-white/50 
                                            dark:hover:bg-white/20 hover:bg-white/80
                                            transition-all duration-200"
                                        title="View nutrition details"
                                    >
                                        <IoNutrition className="w-4 h-4 dark:text-white/70 text-gray-600" />
                                    </button>
                                </div>
                            )}
                        </button>
                    ))}

                    {/* Show More Button */}
                    {hasMore && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="w-full mt-2 py-2 text-sm dark:text-white/50 text-gray-500 dark:hover:text-white/70 hover:text-gray-700
                                transition-colors flex items-center justify-center gap-2 group"
                        >
                            <span>{showAll ? 'Show Less' : 'Show More'}</span>
                            <IoChevronDown
                                className={`w-4 h-4 transition-transform duration-300 
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className={cn(
                        "w-full max-h-[90vh] overflow-hidden rounded-2xl shadow-xl",
                        "flex flex-col",
                        theme === 'dark' ? "bg-gray-900" : "bg-white"
                    )}>
                        {/* Header - Fixed */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <Dialog.Title className={cn(
                                "text-xl font-bold flex items-center gap-2",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}>
                                <IoGrid className={cn(
                                    theme === 'dark' ? "text-emerald-400" : "text-orange-web"
                                )} />
                                {selectedItem?.query} - Nutrition Table
                            </Dialog.Title>
                            <button
                                onClick={() => setShowTable(false)}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    theme === 'dark'
                                        ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <IoClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <NutrientTable nutritionData={selectedItem?.nutritionData} />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
} 