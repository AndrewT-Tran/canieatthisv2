'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoNutrition, IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

export default function DisplayNutrition({
  isOpen = false,
  onClose = () => { },
  foodData,
  foodName,
}) {
  const { theme } = useTheme();
  const t = useTranslations('nutrition');

  if (!foodData?.totalNutrients) return null;

  // Group nutrients by category
  const nutrients = foodData.totalNutrients;
  const categories = {
    macronutrients: [
      'ENERC_KCAL',
      'FAT',
      'FASAT',
      'FATRN',
      'FAMS',
      'FAPU',
      'CHOCDF',
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
    minerals: ['CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE'],
  };

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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
        <Dialog.Panel
          className={cn(
            'mx-auto w-[95%] sm:w-[85%] md:w-[75%] max-w-3xl overflow-y-auto max-h-[90vh]',
            'rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl',
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          )}
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <Dialog.Title
              className={cn(
                'flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-bold',
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}
            >
              <IoNutrition className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="truncate">{foodName}</span>
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 sm:p-2"
            >
              <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
            {Object.entries(categories).map(([category, nutrients]) => (
              <div key={category} className="w-full">
                <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold">
                  {t(`sections.${category}`)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {nutrients.map((nutrientKey) => {
                    const nutrient = foodData.totalNutrients[nutrientKey];
                    if (!nutrient) return null;
                    return (
                      <div
                        key={nutrientKey}
                        className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <span className="text-sm sm:text-base font-medium">
                          {nutrientLabels[nutrientKey]}
                        </span>
                        <span className="text-sm sm:text-base">
                          {Math.round(nutrient.quantity * 10) / 10}
                          {nutrient.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
