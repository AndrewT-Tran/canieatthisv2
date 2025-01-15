'use client';

import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Thresholds for nutrition analysis (per 100g)
const THRESHOLDS = {
  SUGAR: 15, // grams per 100g
  CARBS: 30, // grams per 100g
  GLUCOSE: 10, // grams per 100g
  FAT: 20, // grams per 100g
  SATURATED_FAT: 5, // grams per 100g
  SODIUM: 400, // mg per 100g
  CHOLESTEROL: 60, // mg per 100g
};

const useNutritionData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Cache storage
  const cache = useRef(new Map());
  const cacheTimestamps = useRef(new Map());

  // Analyze nutrition data
  const analyzeNutrition = useCallback((nutritionData) => {
    if (!nutritionData || !nutritionData.totalNutrients) {
      return null;
    }

    const weight = nutritionData.totalWeight || 100;
    const getNutrientPer100g = (nutrientKey) => {
      const nutrient = nutritionData.totalNutrients[nutrientKey];
      return nutrient ? (nutrient.quantity / weight) * 100 : 0;
    };

    // Calculate all nutrients per 100g
    const sugarPer100g = getNutrientPer100g('SUGAR');
    const carbsPer100g = getNutrientPer100g('CHOCDF');
    const proteinPer100g = getNutrientPer100g('PROCNT');
    const fiberPer100g = getNutrientPer100g('FIBTG');
    const sodiumPer100g = getNutrientPer100g('NA');
    const fatPer100g = getNutrientPer100g('FAT');
    const saturatedFatPer100g = getNutrientPer100g('FASAT');
    const cholesterolPer100g = getNutrientPer100g('CHOLE');

    // Calculate calories per 100g
    const caloriesPer100g = (nutritionData.calories / weight) * 100;

    const isSafe =
      sugarPer100g <= THRESHOLDS.SUGAR &&
      carbsPer100g <= THRESHOLDS.CARBS &&
      fatPer100g <= THRESHOLDS.FAT;

    const analysis = {
      isSafe,
      details: {
        calories: caloriesPer100g.toFixed(0),
        totalCalories: nutritionData.calories,
        sugarContent: sugarPer100g.toFixed(1),
        carbContent: carbsPer100g.toFixed(1),
        proteinContent: proteinPer100g.toFixed(1),
        fiberContent: fiberPer100g.toFixed(1),
        sodiumContent: sodiumPer100g.toFixed(1),
        fatContent: fatPer100g.toFixed(1),
        saturatedFatContent: saturatedFatPer100g.toFixed(1),
        cholesterolContent: cholesterolPer100g.toFixed(1),
        totalWeight: weight.toFixed(0),
        message: isSafe
          ? '✅ This food appears to be safe for consumption based on its nutritional content.'
          : '⚠️ This food may need attention due to its nutritional content.',
        warnings: [],
      },
    };

    // Add warnings for each nutrient that exceeds thresholds
    if (sugarPer100g > THRESHOLDS.SUGAR) {
      analysis.details.warnings.push(
        `High sugar content (${sugarPer100g.toFixed(1)}g per 100g)`
      );
    }
    if (carbsPer100g > THRESHOLDS.CARBS) {
      analysis.details.warnings.push(
        `High carbohydrate content (${carbsPer100g.toFixed(1)}g per 100g)`
      );
    }
    if (fatPer100g > THRESHOLDS.FAT) {
      analysis.details.warnings.push(
        `High fat content (${fatPer100g.toFixed(1)}g per 100g)`
      );
    }
    if (saturatedFatPer100g > THRESHOLDS.SATURATED_FAT) {
      analysis.details.warnings.push(
        `High saturated fat content (${saturatedFatPer100g.toFixed(1)}g per 100g)`
      );
    }
    if (sodiumPer100g > THRESHOLDS.SODIUM) {
      analysis.details.warnings.push(
        `High sodium content (${sodiumPer100g.toFixed(1)}mg per 100g)`
      );
    }
    if (cholesterolPer100g > THRESHOLDS.CHOLESTEROL) {
      analysis.details.warnings.push(
        `High cholesterol content (${cholesterolPer100g.toFixed(1)}mg per 100g)`
      );
    }

    return analysis;
  }, []);

  // Clean expired cache entries
  const cleanCache = useCallback(() => {
    const now = Date.now();
    for (const [key, timestamp] of cacheTimestamps.current.entries()) {
      if (now - timestamp > CACHE_DURATION) {
        cache.current.delete(key);
        cacheTimestamps.current.delete(key);
      }
    }
  }, []);

  // Validate query
  const validateQuery = useCallback((query) => {
    if (!query || typeof query !== 'string') {
      throw new Error('Please enter a valid ingredient');
    }

    // Remove multiple spaces and trim
    query = query.replace(/\s+/g, ' ').trim();

    // Check for minimum length
    if (query.length < 2) {
      throw new Error('Query too short. Please be more specific');
    }

    // Check for valid quantity format if present
    const hasQuantity = /^\d+/.test(query);
    if (hasQuantity && !/^\d+(\.\d+)?\s*[a-zA-Z]+/.test(query)) {
      throw new Error(
        'Invalid quantity format. Example: "100g chicken" or "1 apple"'
      );
    }

    return query;
  }, []);

  // Retry mechanism
  const retryFetch = async (query, retryCount = 0) => {
    try {
      const response = await axios.get(
        'https://api.edamam.com/api/nutrition-data',
        {
          params: {
            app_id: process.env.NEXT_PUBLIC_EDAMAM_APP_ID,
            app_key: process.env.NEXT_PUBLIC_EDAMAM_APP_KEY,
            'nutrition-type': 'logging',
            ingr: query,
          },
        }
      );

      // Check if we got valid data
      if (
        response.data.calories === 0 &&
        !query.toLowerCase().includes('water')
      ) {
        throw new Error('No nutrition data found for this ingredient');
      }

      return response.data;
    } catch (error) {
      if (retryCount < MAX_RETRIES && error.response?.status >= 500) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
        );
        return retryFetch(query, retryCount + 1);
      }
      throw error;
    }
  };

  const fetchNutritionData = async (rawQuery) => {
    try {
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);

      // Validate and normalize query
      const query = validateQuery(rawQuery);

      // Check cache
      cleanCache();
      if (cache.current.has(query)) {
        const cachedData = cache.current.get(query);
        setData(cachedData);
        const analysis = analyzeNutrition(cachedData);
        setAnalysisResult(analysis);
        return cachedData;
      }

      // Fetch data with retry mechanism
      const responseData = await retryFetch(query);

      // Cache the result
      cache.current.set(query, responseData);
      cacheTimestamps.current.set(query, Date.now());

      // Analyze the data
      const analysis = analyzeNutrition(responseData);
      setAnalysisResult(analysis);

      setData(responseData);
      return responseData;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch nutrition data';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetData = useCallback(() => {
    setData(null);
    setError(null);
    setAnalysisResult(null);
  }, []);

  const clearCache = useCallback(() => {
    cache.current.clear();
    cacheTimestamps.current.clear();
  }, []);

  return {
    data,
    isLoading,
    error,
    analysisResult,
    fetchNutritionData,
    resetData,
    clearCache,
  };
};

export default useNutritionData;
