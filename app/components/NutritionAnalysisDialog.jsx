'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  IoNutrition,
  IoClose,
  IoCheckmarkCircle,
  IoWarning,
  IoFlame,
  IoScale,
  IoRestaurant,
  IoChevronDown,
  IoInformation,
} from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DisclaimerDialog from './DisclaimerDialog';

export default function NutritionAnalysisDialog({
  isOpen = false,
  onClose = () => { },
  nutritionData,
  foodName,
}) {
  const { theme } = useTheme();
  const t = useTranslations('nutrition');
  const [showDetails, setShowDetails] = useState(false);

  if (!nutritionData) return null;

  // Check if nutrition data is empty or has zero values
  const hasNoNutrients =
    !nutritionData.totalNutrients ||
    Object.keys(nutritionData.totalNutrients).length === 0 ||
    (nutritionData.calories === 0 &&
      Object.values(nutritionData.totalNutrients).every(
        (n) => n?.quantity === 0
      ));

  // Check if there's a missing quantity error
  const hasMissingQuantity =
    nutritionData.ingredients?.[0]?.parsed?.[0]?.status === 'MISSING_QUANTITY';

  // Group nutrients by category
  const nutrients = nutritionData.totalNutrients;
  const categories = {
    macronutrients: [
      'ENERC_KCAL',
      'FAT',
      'FASAT',
      'FATRN',
      'FAMS',
      'FAPU',
      'CHOCDF',
      'CHOCDF_net',
      'FIBTG',
      'SUGAR',
      'PROCNT',
    ],
    vitamins: [
      'VITA_RAE',
      'VITC',
      'VITD',
      'VITB6A',
      'VITB12',
      'VITK1',
      'THIA',
      'RIBF',
      'NIA',
      'FOLAC',
    ],
    minerals: ['CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE']
  };

  // Analyze carbs and sugars content
  const carbs = nutrients.CHOCDF?.quantity || 0;
  const sugars = nutrients.SUGAR?.quantity || 0;
  const fiber = nutrients.FIBTG?.quantity || 0;

  // Calculate net carbs (total carbs - fiber)
  const netCarbs = Math.max(0, carbs - fiber);

  // Add net carbs to nutrients object
  if (nutrients.CHOCDF) {
    nutrients.CHOCDF_net = {
      label: 'Net Carbohydrates',
      quantity: netCarbs,
      unit: nutrients.CHOCDF.unit
    };
  }

  // Determine if food is safe based on carbs and sugars content
  // Using general guidelines:
  // - Net carbs > 20g per serving: High
  // - Sugars > 10g per serving: High
  const isSafe = netCarbs <= 20 && sugars <= 15;

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
    FOLAC: t('vitamins.folicAcid'),
  };

  const renderNutrientSection = (sectionKey, items) => {
    const availableNutrients = items.filter(
      (key) => nutrients[key] && nutrients[key].quantity > 0
    );
    if (availableNutrients.length === 0) return null;

    return (
      <div className="mb-6">
        <h3
          className={cn(
            'mb-2 text-lg font-semibold',
            theme === 'dark' ? 'text-emerald-300' : 'text-orange-web'
          )}
        >
          {t(`sections.${sectionKey}`)}
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mx-auto w-[90%]">
          {availableNutrients.map((nutrientKey) => {
            const nutrient = nutrients[nutrientKey];
            return (
              <div
                key={nutrientKey}
                className="flex items-center justify-between"
              >
                <span
                  className={cn(
                    'font-medium',
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  )}
                >
                  {nutrientLabels[nutrientKey]}
                </span>
                <span
                  className={cn(
                    'font-medium',
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  )}
                >
                  {Math.round(nutrient.quantity * 10) / 10}
                  {nutrient.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative flex min-h-[80vh] items-center justify-center py-12"
        >
          <Dialog.Panel
            className={cn(
              'relative mx-auto flex max-h-[90vh] w-3/4 max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl',
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            )}
          >
            {/* Sticky Header with Food Info */}
            <div
              className={cn(
                'sticky top-0 z-10 border-b backdrop-blur-md',
                theme === 'dark'
                  ? 'border-gray-800 bg-gray-900/95'
                  : 'border-gray-200 bg-white/95'
              )}
            >
              <div className="px-8 py-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Dialog.Title
                      className={cn(
                        'mb-2 flex items-center gap-3 text-2xl font-bold',
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      )}
                    >
                      <IoRestaurant
                        className={cn(
                          'h-8 w-8',
                          theme === 'dark'
                            ? 'text-emerald-400'
                            : 'text-orange-web'
                        )}
                      />
                      {foodName}
                    </Dialog.Title>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <IoScale
                          className={cn(
                            'h-4 w-4',
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          )}
                        />
                        <span
                          className={cn(
                            'text-sm',
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          )}
                        >
                          {Math.round(nutritionData.totalWeight || 0)}g
                        </span>
                      </div>
                      {nutritionData.dietLabels?.length > 0 && (
                        <div className="flex gap-2">
                          {nutritionData.dietLabels.map((label, index) => (
                            <span
                              key={index}
                              className={cn(
                                'rounded-full px-2 py-1 text-xs',
                                theme === 'dark'
                                  ? 'bg-emerald-500/10 text-emerald-300'
                                  : 'bg-emerald-50 text-emerald-600'
                              )}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DisclaimerDialog triggerIcon={true} />
                    <button
                      onClick={onClose}
                      className={cn(
                        'rounded-full p-2 transition-colors',
                        theme === 'dark'
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      )}
                      aria-label={t('close')}
                    >
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {/* Error Message for Missing Quantity */}
              {hasMissingQuantity && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'mb-6 rounded-lg p-4',
                    theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <IoWarning
                      className={cn(
                        'h-6 w-6',
                        theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          'font-medium',
                          theme === 'dark' ? 'text-amber-300' : 'text-amber-700'
                        )}
                      >
                        {t('specifyQuantity')}
                      </p>
                      <p
                        className={cn(
                          'mt-1 text-sm',
                          theme === 'dark'
                            ? 'text-amber-300/70'
                            : 'text-amber-600'
                        )}
                      >
                        {t('quantityExample')}
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
                      'relative mb-8 flex flex-col items-center justify-center overflow-hidden rounded-xl p-8',
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                    )}
                  >
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

                    <div className="mb-3 flex items-center gap-3">
                      <IoFlame
                        className={cn(
                          'h-10 w-10',
                          theme === 'dark'
                            ? 'text-orange-400'
                            : 'text-orange-500'
                        )}
                      />
                      <span
                        className={cn(
                          'text-xl font-medium',
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        )}
                      >
                        {t('calories')}
                      </span>
                    </div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        'text-6xl font-bold',
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      )}
                    >
                      {nutritionData.calories || 0}
                      <span className="ml-2 text-3xl font-normal text-gray-500">
                        {t('units.kcal')}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Recommendation Section */}
                  <div className="mb-8">
                    <div
                      className={cn(
                        'mb-4 rounded-lg p-4',
                        theme === 'dark'
                          ? isSafe
                            ? 'bg-emerald-500/10'
                            : 'bg-red-500/10'
                          : isSafe
                            ? 'bg-emerald-50'
                            : 'bg-red-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {isSafe ? (
                          <IoCheckmarkCircle
                            className={cn(
                              'h-6 w-6',
                              theme === 'dark'
                                ? 'text-emerald-400'
                                : 'text-emerald-500'
                            )}
                          />
                        ) : (
                          <IoWarning
                            className={cn(
                              'h-6 w-6',
                              theme === 'dark' ? 'text-red-400' : 'text-red-500'
                            )}
                          />
                        )}
                        <p
                          className={cn(
                            'text-sm font-medium',
                            theme === 'dark'
                              ? isSafe
                                ? 'text-emerald-300'
                                : 'text-red-300'
                              : isSafe
                                ? 'text-emerald-700'
                                : 'text-red-700'
                          )}
                        >
                          {isSafe
                            ? t('recommendation.safe')
                            : t('recommendation.unsafe')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={cn(
                          'rounded-lg p-4',
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        )}
                      >
                        <div className="mb-1 text-sm text-gray-500">
                          {t('netCarbs')}
                        </div>
                        <div
                          className={cn(
                            'text-2xl font-semibold',
                            netCarbs > 20
                              ? theme === 'dark'
                                ? 'text-red-300'
                                : 'text-red-600'
                              : theme === 'dark'
                                ? 'text-emerald-300'
                                : 'text-emerald-600'
                          )}
                        >
                          {Math.round(netCarbs * 10) / 10}g
                        </div>
                      </div>
                      <div
                        className={cn(
                          'rounded-lg p-4',
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        )}
                      >
                        <div className="mb-1 text-sm text-gray-500">
                          {t('sugars')}
                        </div>
                        <div
                          className={cn(
                            'text-2xl font-semibold',
                            sugars > 10
                              ? theme === 'dark'
                                ? 'text-red-300'
                                : 'text-red-600'
                              : theme === 'dark'
                                ? 'text-emerald-300'
                                : 'text-emerald-600'
                          )}
                        >
                          {Math.round(sugars * 10) / 10}g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show More Button */}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={cn(
                      'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 transition-colors',
                      theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <span>{showDetails ? t('showLess') : t('showMore')}</span>
                    <IoChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform duration-300',
                        showDetails ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  {/* Detailed Nutrient Sections */}
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {Object.entries(categories).map(
                          ([category, nutrients]) => (
                            <motion.div
                              key={category}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              {renderNutrientSection(category, nutrients)}
                            </motion.div>
                          )
                        )}
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
                    'flex flex-col items-center justify-center rounded-lg p-8',
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                  )}
                >
                  <IoWarning
                    className={cn(
                      'mb-4 h-12 w-12',
                      theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
                    )}
                  />
                  <p
                    className={cn(
                      'mb-2 text-center font-medium',
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {t('noData')}
                  </p>
                  <p
                    className={cn(
                      'text-center text-sm',
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    )}
                  >
                    {t('noDataDescription')}
                  </p>
                  <p
                    className={cn(
                      'mt-4 font-medium',
                      theme === 'dark' ? 'text-amber-300' : 'text-amber-700'
                    )}
                  >
                    {t('specifyQuantity')}
                  </p>
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      theme === 'dark' ? 'text-amber-300/70' : 'text-amber-600'
                    )}
                  >
                    {t('quantityExample')}
                  </p>
                </motion.div>
              )}
            </div>
          </Dialog.Panel>
        </motion.div>
      </div>
    </Dialog>
  );
}
