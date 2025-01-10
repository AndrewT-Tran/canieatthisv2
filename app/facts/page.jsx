'use client';

import NutritionLabel from '../components/NutritionLabel';

const Page = () => {
  const nutritionData = {
    calories: 84,
    totalNutrients: {
      ENERC_KCAL: {
        label: 'Energy',
        quantity: 84.0,
        unit: 'kcal',
        dailyValue: 4,
      },
      FAT: {
        label: 'Total Fat',
        quantity: 0.3,
        unit: 'g',
        dailyValue: 0.5,
      },
      FASAT: {
        label: 'Saturated Fat',
        quantity: 0.1,
        unit: 'g',
        dailyValue: 0.4,
      },
      CHOCDF: {
        label: 'Total Carbohydrate',
        quantity: 21.0,
        unit: 'g',
        dailyValue: 7,
      },
      FIBTG: {
        label: 'Dietary Fiber',
        quantity: 1.12,
        unit: 'g',
        dailyValue: 4,
      },
      SUGAR: {
        label: 'Total Sugars',
        quantity: 17.36,
        unit: 'g',
      },
      PROCNT: {
        label: 'Protein',
        quantity: 0.47,
        unit: 'g',
        dailyValue: 1,
      },
      NA: {
        label: 'Sodium',
        quantity: 1.0,
        unit: 'mg',
        dailyValue: 0,
      },
      CA: {
        label: 'Calcium',
        quantity: 5.0,
        unit: 'mg',
        dailyValue: 0.4,
      },
      FE: {
        label: 'Iron',
        quantity: 0.12,
        unit: 'mg',
        dailyValue: 0.7,
      },
      VITC: {
        label: 'Vitamin C',
        quantity: 4.6,
        unit: 'mg',
        dailyValue: 5.1,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-light text-primary mb-8 text-center">
        Nutrition Facts Example
      </h1>
      <div className="max-w-md mx-auto">
        <NutritionLabel nutritionData={nutritionData} />
      </div>
    </div>
  );
};

export default Page;
