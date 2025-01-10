"use client";
import React from 'react';

const NutritionLabel = ({ nutritionData }) => {
  if (!nutritionData || !nutritionData.totalNutrients) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="loading loading-spinner loading-lg text-secondary"></div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-lg border-2 border-base-300 max-w-md mx-auto font-poppins">
      <div className="border-b-2 border-base-300 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-center text-base-content">
          Nutrition Facts
        </h2>
        <p className="text-center text-base-content/70 text-sm mt-1">
          Serving Size: 100g
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-base-200/50 backdrop-blur-sm p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Calories</span>
            <span className="text-lg">{nutritionData.calories}</span>
          </div>
        </div>

        <div className="divide-y divide-base-300">
          {Object.entries(nutritionData.totalNutrients).map(([key, nutrient]) => (
            <div
              key={key}
              className="py-2 hover:bg-base-200/30 transition-colors duration-200 rounded-lg px-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-base-content/80 font-light">
                  {nutrient.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-light">
                    {nutrient.quantity.toFixed(1)}
                  </span>
                  <span className="text-base-content/60 text-sm font-light">
                    {nutrient.unit}
                  </span>
                </div>
              </div>

              {nutrient.dailyValue && (
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-base-content/50">
                    {nutrient.dailyValue}% DV
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-base-300">
        <p className="text-xs text-base-content/60 font-light">
          * Percent Daily Values are based on a 2,000 calorie diet.
        </p>
      </div>
    </div>
  );
};

export default NutritionLabel;