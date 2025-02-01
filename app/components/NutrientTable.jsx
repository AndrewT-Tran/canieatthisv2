'use client';

import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useTranslations } from 'next-intl';

export default function NutrientTable({ nutritionData }) {
  const { theme } = useTheme();
  const t = useTranslations('nutrition');

  if (!nutritionData) return null;

  // Check if nutrition data is empty or has zero values
  const hasNoNutrients =
    !nutritionData.totalNutrients ||
    Object.keys(nutritionData.totalNutrients).length === 0 ||
    (nutritionData.calories === 0 &&
      Object.values(nutritionData.totalNutrients).every(
        (n) => n?.quantity === 0
      ));

  if (hasNoNutrients) {
    return (
      <div
        className={cn(
          'rounded-lg p-4 text-center',
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        )}
      >
        <p
          className={cn(
            'text-sm',
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          )}
        >
          {t('noData')}
        </p>
      </div>
    );
  }

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

  const renderNutrientSection = (sectionKey, items) => {
    const availableNutrients = items.filter(
      (key) => nutrients[key] && nutrients[key].quantity > 0
    );
    if (availableNutrients.length === 0) return null;

    return (
      <div className="mb-fluid-6">
        <h3
          className={cn(
            'mb-fluid-3 px-fluid-4 text-fluid-lg font-semibold',
            theme === 'dark' ? 'text-emerald-300' : 'text-orange-web'
          )}
        >
          {t(`sections.${sectionKey}`)}
        </h3>
        <div
          className={cn(
            'overflow-hidden rounded-lg',
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          )}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr
                  className={cn(
                    'border-b',
                    theme === 'dark'
                      ? 'border-gray-700 bg-gray-700/50'
                      : 'border-gray-200 bg-gray-100'
                  )}
                >
                  <th
                    className={cn(
                      'p-fluid-3 text-left text-fluid-sm font-medium',
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}
                  >
                    Nutrient
                  </th>
                  <th
                    className={cn(
                      'p-fluid-3 text-right text-fluid-sm font-medium',
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}
                  >
                    Amount
                  </th>
                  <th
                    className={cn(
                      'p-fluid-3 text-right text-fluid-sm font-medium',
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}
                  >
                    % Daily Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {availableNutrients.map((nutrientKey) => {
                  const nutrient = nutrients[nutrientKey];
                  const dailyValue = nutritionData.totalDaily[nutrientKey];
                  return (
                    <tr
                      key={nutrientKey}
                      className={cn(
                        'transition-colors',
                        theme === 'dark'
                          ? 'hover:bg-gray-700/50'
                          : 'hover:bg-gray-100'
                      )}
                    >
                      <td
                        className={cn(
                          'p-fluid-3 text-fluid-sm',
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        )}
                      >
                        {nutrientLabels[nutrientKey]}
                      </td>
                      <td
                        className={cn(
                          'p-fluid-3 text-right text-fluid-sm',
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        )}
                      >
                        {Math.round(nutrient.quantity * 10) / 10}
                        {nutrient.unit}
                      </td>
                      <td
                        className={cn(
                          'p-fluid-3 text-right text-fluid-sm',
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        )}
                      >
                        {dailyValue ? `${Math.round(dailyValue.quantity)}%` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-fluid-6">
      {/* Calories Summary */}
      <div
        className={cn(
          'mb-fluid-6 rounded-lg p-fluid-base text-center',
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        )}
      >
        <div className="mb-fluid-1">
          <span className="text-fluid-4xl font-bold">
            {Math.round(nutritionData.calories)}
          </span>
          <span className="ml-fluid-2 text-fluid-xl opacity-70">{t('units.kcal')}</span>
        </div>
        <div
          className={cn(
            'text-fluid-sm',
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          )}
        >
          {t('totalCalories')}
        </div>
      </div>

      {/* Nutrient Categories */}
      <div className="grid grid-cols-1 gap-fluid-6 md:grid-cols-2">
        {Object.entries(categories).map(([category, nutrients]) => (
          <div key={category}>{renderNutrientSection(category, nutrients)}</div>
        ))}
      </div>
    </div>
  );
}
