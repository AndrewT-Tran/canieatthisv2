"use client";

import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useTranslations } from 'next-intl';

export default function NutrientTable({ nutritionData }) {
  const { theme } = useTheme();
  const t = useTranslations('nutrition');

  if (!nutritionData) return null;

  // Check if nutrition data is empty or has zero values
  const hasNoNutrients = !nutritionData.totalNutrients ||
    Object.keys(nutritionData.totalNutrients).length === 0 ||
    (nutritionData.calories === 0 && Object.values(nutritionData.totalNutrients).every(n => n?.quantity === 0));

  if (hasNoNutrients) {
    return (
      <div className={cn(
        "p-4 rounded-lg text-center",
        theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
      )}>
        <p className={cn(
          "text-sm",
          theme === 'dark' ? "text-gray-400" : "text-gray-600"
        )}>
          No nutrition data available
        </p>
      </div>
    );
  }

  // Group nutrients by category
  const nutrients = nutritionData.totalNutrients;
  const categories = {
    macronutrients: ['ENERC_KCAL', 'FAT', 'FASAT', 'FATRN', 'FAMS', 'FAPU', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT'],
    vitamins: ['VITA_RAE', 'VITC', 'VITD', 'VITB6A', 'VITB12', 'VITK1', 'THIA', 'RIBF', 'NIA', 'FOLAC'],
    minerals: ['CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE']
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
    FOLAC: t('vitamins.folicAcid')
  };

  const renderNutrientSection = (sectionKey, items) => {
    const availableNutrients = items.filter(key => nutrients[key] && nutrients[key].quantity > 0);
    if (availableNutrients.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className={cn(
          "text-lg font-semibold mb-3 px-4",
          theme === 'dark' ? "text-emerald-300" : "text-orange-web"
        )}>{t(`sections.${sectionKey}`)}</h3>
        <div className={cn(
          "overflow-hidden rounded-lg",
          theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
        )}>
          <table className="w-full">
            <thead>
              <tr className={cn(
                theme === 'dark' ? "bg-gray-700/50" : "bg-gray-100"
              )}>
                <th className={cn(
                  "px-4 py-2 text-left text-sm font-medium",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>Nutrient</th>
                <th className={cn(
                  "px-4 py-2 text-right text-sm font-medium",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>Amount</th>
                <th className={cn(
                  "px-4 py-2 text-right text-sm font-medium",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>% Daily Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {availableNutrients.map(nutrientKey => {
                const nutrient = nutrients[nutrientKey];
                const dailyValue = nutritionData.totalDaily[nutrientKey];
                return (
                  <tr key={nutrientKey} className={cn(
                    "transition-colors",
                    theme === 'dark' ? "hover:bg-gray-700/50" : "hover:bg-gray-100"
                  )}>
                    <td className={cn(
                      "px-4 py-2 text-sm",
                      theme === 'dark' ? "text-gray-300" : "text-gray-700"
                    )}>{nutrientLabels[nutrientKey]}</td>
                    <td className={cn(
                      "px-4 py-2 text-sm text-right",
                      theme === 'dark' ? "text-gray-300" : "text-gray-700"
                    )}>{Math.round(nutrient.quantity * 10) / 10}{nutrient.unit}</td>
                    <td className={cn(
                      "px-4 py-2 text-sm text-right",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )}>{dailyValue ? `${Math.round(dailyValue.quantity)}%` : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calories Summary */}
      <div className={cn(
        "p-4 rounded-lg mb-6 text-center",
        theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
      )}>
        <div className="text-3xl font-bold mb-1">
          {Math.round(nutritionData.calories)}
          <span className="text-lg ml-1 opacity-70">kcal</span>
        </div>
        <div className={cn(
          "text-sm",
          theme === 'dark' ? "text-gray-400" : "text-gray-600"
        )}>Total Calories</div>
      </div>

      {/* Nutrient Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, nutrients]) => (
          <div key={category}>
            {renderNutrientSection(category, nutrients)}
          </div>
        ))}
      </div>
    </div>
  );
}
