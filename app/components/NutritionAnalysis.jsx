import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoNutrition, IoWarning, IoCheckmarkCircle } from 'react-icons/io5';
import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { useTranslations } from 'next-intl';
import { cn } from '../utils/cn';

export default function NutritionAnalysis({ isOpen, onClose, nutritionData }) {
    const { theme } = useTheme();
    const t = useTranslations('nutrition');

    if (!nutritionData) return null;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    const getNutrientStatus = (nutrient) => {
        const quantity = nutrient?.quantity || 0;
        if (quantity === 0) return 'neutral';
        if (quantity < 10) return 'low';
        if (quantity > 50) return 'high';
        return 'good';
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className={cn(
                    "w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-xl",
                    "flex flex-col",
                    theme === 'dark' ? "bg-gray-900" : "bg-white"
                )}>
                    {/* Header */}
                    <motion.div
                        className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Dialog.Title className={cn(
                            "text-xl font-bold flex items-center gap-2",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>
                            <IoNutrition className={cn(
                                "w-6 h-6",
                                theme === 'dark' ? "text-emerald-400" : "text-orange-web"
                            )} />
                            {t('analysis.title')}
                        </Dialog.Title>
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
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-6"
                        >
                            {/* Calories */}
                            <motion.div variants={itemVariants} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">{t('totalCalories')}:</span>
                                </div>
                                <span className="text-2xl font-bold text-orange-web">
                                    {Math.round(nutritionData.calories)} {t('units.kcal')}
                                </span>
                            </motion.div>

                            {/* Nutrients */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(nutritionData.totalNutrients).map(([key, nutrient]) => (
                                    <motion.div
                                        key={key}
                                        variants={itemVariants}
                                        className={cn(
                                            "p-4 rounded-lg border",
                                            theme === 'dark'
                                                ? "bg-gray-800/50 border-gray-700"
                                                : "bg-gray-50 border-gray-200"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{t(`nutrients.${key}`)}</span>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {Math.round(nutrient.quantity)}{t(`units.${nutrient.unit}`)}
                                                </span>
                                                {getNutrientStatus(nutrient) === 'high' && (
                                                    <IoWarning className="text-orange-web" title={t('status.high')} />
                                                )}
                                                {getNutrientStatus(nutrient) === 'good' && (
                                                    <IoCheckmarkCircle className="text-emerald-400" title={t('status.good')} />
                                                )}
                                            </div>
                                        </div>
                                        <motion.div
                                            className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <motion.div
                                                className={cn(
                                                    "h-full rounded-full",
                                                    getNutrientStatus(nutrient) === 'high'
                                                        ? "bg-orange-web"
                                                        : getNutrientStatus(nutrient) === 'good'
                                                            ? "bg-emerald-400"
                                                            : "bg-gray-400"
                                                )}
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${Math.min((nutrient.quantity / 100) * 100, 100)}%`
                                                }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
} 