'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoNutrition, IoClose, IoCheckmarkCircle, IoWarning, IoFlame, IoScale, IoRestaurant, IoChevronDown } from "react-icons/io5";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NutritionAnalysisDialog({
    isOpen = false,
    onClose = () => { },
    nutritionData,
    foodName
}) {
    const { theme } = useTheme();
    const t = useTranslations('nutrition');
    const [showDetails, setShowDetails] = useState(false);

    if (!nutritionData) return null;

    // Check if nutrition data is empty or has zero values
    const hasNoNutrients = !nutritionData.totalNutrients ||
        Object.keys(nutritionData.totalNutrients).length === 0 ||
        (nutritionData.calories === 0 && Object.values(nutritionData.totalNutrients).every(n => n?.quantity === 0));

    // Check if there's a missing quantity error
    const hasMissingQuantity = nutritionData.ingredients?.[0]?.parsed?.[0]?.status === 'MISSING_QUANTITY';

    // Group nutrients by category
    const nutrients = nutritionData.totalNutrients;
    const categories = {
        macronutrients: ['ENERC_KCAL', 'FAT', 'FASAT', 'FATRN', 'FAMS', 'FAPU', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT'],
        vitamins: ['VITA_RAE', 'VITC', 'VITD', 'VITB6A', 'VITB12', 'VITK1', 'THIA', 'RIBF', 'NIA', 'FOLAC'],
        minerals: ['CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE']
    };

    // Analyze carbs and sugars content
    const carbs = nutrients.CHOCDF?.quantity || 0;
    const sugars = nutrients.SUGAR?.quantity || 0;
    const fiber = nutrients.FIBTG?.quantity || 0;

    // Calculate net carbs (total carbs - fiber)
    const netCarbs = Math.max(0, carbs - fiber);

    // Determine if food is safe based on carbs and sugars content
    // Using general guidelines:
    // - Net carbs > 20g per serving: High
    // - Sugars > 10g per serving: High
    const isSafe = netCarbs <= 20 && sugars <= 10;

    const nutrientLabels = {
        ENERC_KCAL: t('calories'),
        PROCNT: t('protein'),
        FAT: t('fat.total'),
        FASAT: t('fat.saturated'),
        FATRN: t('fat.trans'),
        FAMS: t('fat.monounsaturated'),
        FAPU: t('fat.polyunsaturated'),
        CHOCDF: t('carbs'),
        FIBTG: t('fiber'),
        SUGAR: t('sugar'),
        CA: t('minerals.calcium'),
        FE: t('minerals.iron'),
        MG: t('minerals.magnesium'),
        P: t('minerals.phosphorus'),
        K: t('minerals.potassium'),
        NA: t('minerals.sodium'),
        ZN: t('minerals.zinc'),
        CU: t('minerals.copper'),
        MN: t('minerals.manganese'),
        SE: t('minerals.selenium'),
        VITA_RAE: t('vitamins.a'),
        VITC: t('vitamins.c'),
        VITD: t('vitamins.d'),
        VITB6A: t('vitamins.b6'),
        VITB12: t('vitamins.b12'),
        VITK1: t('vitamins.k'),
        THIA: t('vitamins.thiamin'),
        RIBF: t('vitamins.riboflavin'),
        NIA: t('vitamins.niacin'),
        FOLAC: t('vitamins.folicAcid')
    };

    const renderNutrientSection = (sectionKey, items) => {
        const availableNutrients = items.filter(key => nutrients[key] && nutrients[key].quantity > 0);
        if (availableNutrients.length === 0) return null;

        return (
            <div className="mb-6">
                <h3 className={cn(
                    "text-lg font-semibold mb-2",
                    theme === 'dark' ? "text-emerald-300" : "text-orange-web"
                )}>{t(`sections.${sectionKey}`)}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableNutrients.map(nutrientKey => {
                        const nutrient = nutrients[nutrientKey];
                        return (
                            <div key={nutrientKey} className="flex justify-between items-center">
                                <span className={cn(
                                    "font-medium",
                                    theme === 'dark' ? "text-gray-300" : "text-gray-700"
                                )}>{nutrientLabels[nutrientKey]}</span>
                                <span className={cn(
                                    "font-medium",
                                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>{Math.round(nutrient.quantity * 10) / 10}{nutrient.unit}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative min-h-[80vh] flex items-center justify-center py-12"
                >
                    <Dialog.Panel className={cn(
                        "mx-auto max-w-4xl w-full rounded-2xl p-8 shadow-2xl relative",
                        theme === 'dark' ? "bg-gray-900" : "bg-white"
                    )}>
                        {/* Header with Food Info */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex-1">
                                <Dialog.Title className={cn(
                                    "text-2xl font-bold flex items-center gap-3 mb-2",
                                    theme === 'dark' ? "text-white" : "text-gray-900"
                                )}>
                                    <IoRestaurant className={cn(
                                        "w-8 h-8",
                                        theme === 'dark' ? "text-emerald-400" : "text-orange-web"
                                    )} />
                                    {foodName}
                                </Dialog.Title>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <IoScale className={cn(
                                            "w-4 h-4",
                                            theme === 'dark' ? "text-gray-400" : "text-gray-500"
                                        )} />
                                        <span className={cn(
                                            "text-sm",
                                            theme === 'dark' ? "text-gray-400" : "text-gray-500"
                                        )}>
                                            {Math.round(nutritionData.totalWeight || 0)}g
                                        </span>
                                    </div>
                                    {nutritionData.dietLabels?.length > 0 && (
                                        <div className="flex gap-2">
                                            {nutritionData.dietLabels.map((label, index) => (
                                                <span
                                                    key={index}
                                                    className={cn(
                                                        "px-2 py-1 rounded-full text-xs",
                                                        theme === 'dark'
                                                            ? "bg-emerald-500/10 text-emerald-300"
                                                            : "bg-emerald-50 text-emerald-600"
                                                    )}
                                                >
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    theme === 'dark'
                                        ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                )}
                                aria-label={t('close')}
                            >
                                <IoClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Error Message for Missing Quantity */}
                        {hasMissingQuantity && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "p-4 rounded-lg mb-6",
                                    theme === 'dark' ? "bg-amber-500/10" : "bg-amber-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <IoWarning className={cn(
                                        "w-6 h-6",
                                        theme === 'dark' ? "text-amber-400" : "text-amber-500"
                                    )} />
                                    <div>
                                        <p className={cn(
                                            "font-medium",
                                            theme === 'dark' ? "text-amber-300" : "text-amber-700"
                                        )}>
                                            Please specify a quantity
                                        </p>
                                        <p className={cn(
                                            "text-sm mt-1",
                                            theme === 'dark' ? "text-amber-300/70" : "text-amber-600"
                                        )}>
                                            Try searching with a specific amount (e.g., &quot;1 apple&quot; or &quot;100g apples&quot;)
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Nutrition Content */}
                        {!hasNoNutrients && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Calories Display */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-8 mb-8 rounded-xl relative overflow-hidden",
                                        theme === 'dark' ? "bg-gray-800/50" : "bg-gray-50"
                                    )}
                                >
                                    {/* Background Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />

                                    <div className="flex items-center gap-3 mb-3">
                                        <IoFlame className={cn(
                                            "w-10 h-10",
                                            theme === 'dark' ? "text-orange-400" : "text-orange-500"
                                        )} />
                                        <span className={cn(
                                            "text-xl font-medium",
                                            theme === 'dark' ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            {t('calories')}
                                        </span>
                                    </div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className={cn(
                                            "text-6xl font-bold",
                                            theme === 'dark' ? "text-white" : "text-gray-900"
                                        )}
                                    >
                                        {nutritionData.calories || 0}
                                        <span className="text-3xl ml-2 font-normal text-gray-500">kcal</span>
                                    </motion.div>
                                </motion.div>

                                {/* Recommendation Section */}
                                <div className="mb-8">
                                    <div className={cn(
                                        "p-4 rounded-lg mb-4",
                                        theme === 'dark'
                                            ? isSafe ? "bg-emerald-500/10" : "bg-red-500/10"
                                            : isSafe ? "bg-emerald-50" : "bg-red-50"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            {isSafe ? (
                                                <IoCheckmarkCircle className={cn(
                                                    "w-6 h-6",
                                                    theme === 'dark' ? "text-emerald-400" : "text-emerald-500"
                                                )} />
                                            ) : (
                                                <IoWarning className={cn(
                                                    "w-6 h-6",
                                                    theme === 'dark' ? "text-red-400" : "text-red-500"
                                                )} />
                                            )}
                                            <p className={cn(
                                                "text-sm font-medium",
                                                theme === 'dark'
                                                    ? isSafe ? "text-emerald-300" : "text-red-300"
                                                    : isSafe ? "text-emerald-700" : "text-red-700"
                                            )}>
                                                {isSafe ? t('recommendation.safe') : t('recommendation.unsafe')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
                                        )}>
                                            <div className="text-sm text-gray-500 mb-1">{t('netCarbs')}</div>
                                            <div className={cn(
                                                "text-2xl font-semibold",
                                                netCarbs > 20
                                                    ? theme === 'dark' ? "text-red-300" : "text-red-600"
                                                    : theme === 'dark' ? "text-emerald-300" : "text-emerald-600"
                                            )}>{Math.round(netCarbs * 10) / 10}g</div>
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
                                        )}>
                                            <div className="text-sm text-gray-500 mb-1">{t('sugars')}</div>
                                            <div className={cn(
                                                "text-2xl font-semibold",
                                                sugars > 10
                                                    ? theme === 'dark' ? "text-red-300" : "text-red-600"
                                                    : theme === 'dark' ? "text-emerald-300" : "text-emerald-600"
                                            )}>{Math.round(sugars * 10) / 10}g</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Show More Button */}
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className={cn(
                                        "w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors",
                                        theme === 'dark'
                                            ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    )}
                                >
                                    <span>{showDetails ? 'Show Less' : 'Show More Details'}</span>
                                    <IoChevronDown className={cn(
                                        "w-5 h-5 transition-transform duration-300",
                                        showDetails ? "rotate-180" : ""
                                    )} />
                                </button>

                                {/* Detailed Nutrient Sections */}
                                {showDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {Object.entries(categories).map(([category, nutrients]) => (
                                                <motion.div
                                                    key={category}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                >
                                                    {renderNutrientSection(category, nutrients)}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* No Data Message */}
                        {hasNoNutrients && !hasMissingQuantity && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn(
                                    "flex flex-col items-center justify-center p-8 rounded-lg",
                                    theme === 'dark' ? "bg-gray-800/50" : "bg-gray-50"
                                )}
                            >
                                <IoWarning className={cn(
                                    "w-12 h-12 mb-4",
                                    theme === 'dark' ? "text-amber-400" : "text-amber-500"
                                )} />
                                <p className={cn(
                                    "text-center mb-2 font-medium",
                                    theme === 'dark' ? "text-white" : "text-gray-900"
                                )}>
                                    No nutrition data available
                                </p>
                                <p className={cn(
                                    "text-center text-sm",
                                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>
                                    This could be due to an invalid ingredient name or missing data in our database.
                                </p>
                            </motion.div>
                        )}
                    </Dialog.Panel>
                </motion.div>
            </div>
        </Dialog>
    );
} 