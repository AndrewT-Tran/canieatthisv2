'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoNutrition, IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

export default function DisplayNutrition({
  isOpen = false,
  onClose = () => {},
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

  const renderNutrientSection = (sectionKey, items) => (
    <div className="mb-6">
      <h3
        className={cn(
          'mb-2 text-lg font-semibold',
          theme === 'dark' ? 'text-emerald-300' : 'text-orange-web'
        )}
      >
        {t(`sections.${sectionKey}`)}
      </h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((nutrientKey) => {
          const nutrient = nutrients[nutrientKey];
          if (!nutrient) return null;
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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={cn(
            'mx-auto w-full max-w-3xl rounded-2xl p-6 shadow-xl',
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title
              className={cn(
                'flex items-center gap-2 text-2xl font-bold',
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}
            >
              <IoNutrition
                className={cn(
                  theme === 'dark' ? 'text-emerald-400' : 'text-orange-web'
                )}
              />
              {foodName}
            </Dialog.Title>
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

          <div className="mt-4">
            {renderNutrientSection('macronutrients', categories.macronutrients)}
            {renderNutrientSection('vitamins', categories.vitamins)}
            {renderNutrientSection('minerals', categories.minerals)}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
