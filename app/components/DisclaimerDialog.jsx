'use client';

import { Dialog } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { IoWarning, IoClose, IoInformation, IoCheckmarkCircle } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DisclaimerDialog({ isOpen, onClose }) {
    const { theme } = useTheme();
    const t = useTranslations();

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Dialog.Panel className={cn(
                        "mx-auto max-w-lg w-full rounded-2xl shadow-xl p-6",
                        theme === 'dark' ? "bg-gray-900" : "bg-white"
                    )}>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <Dialog.Title className={cn(
                                "text-xl font-bold flex items-center gap-2",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}>
                                <IoInformation className={cn(
                                    "w-6 h-6",
                                    theme === 'dark' ? "text-emerald-400" : "text-orange-web"
                                )} />
                                Important Information
                            </Dialog.Title>
                            <button
                                onClick={onClose}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    theme === 'dark'
                                        ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <IoClose className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            {/* Calculation Method */}
                            <div className={cn(
                                "p-4 rounded-lg",
                                theme === 'dark' ? "bg-gray-800" : "bg-gray-50"
                            )}>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-2 flex items-center gap-2",
                                    theme === 'dark' ? "text-emerald-300" : "text-orange-web"
                                )}>
                                    <IoCheckmarkCircle className="w-5 h-5" />
                                    Calculation Method
                                </h3>
                                <p className={cn(
                                    "text-sm",
                                    theme === 'dark' ? "text-gray-300" : "text-gray-600"
                                )}>
                                    The nutritional information provided is calculated using data from the USDA Food Database and other reliable sources. Values are estimates and may vary based on factors such as food preparation, portion size, and ingredient variations.
                                </p>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className={cn(
                                "p-4 rounded-lg",
                                theme === 'dark' ? "bg-amber-500/10" : "bg-amber-50"
                            )}>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-2 flex items-center gap-2",
                                    theme === 'dark' ? "text-amber-300" : "text-amber-700"
                                )}>
                                    <IoWarning className="w-5 h-5" />
                                    Medical Disclaimer
                                </h3>
                                <div className={cn(
                                    "text-sm space-y-2",
                                    theme === 'dark' ? "text-amber-200" : "text-amber-700"
                                )}>
                                    <p>
                                        This app is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                                    </p>
                                    <p>
                                        Always seek the advice of your physician or other qualified health provider regarding:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Any questions about your medical condition</li>
                                        <li>Dietary restrictions or requirements</li>
                                        <li>Changes to your diet or exercise routine</li>
                                        <li>Management of diabetes or other health conditions</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Acknowledgment Button */}
                            <button
                                onClick={onClose}
                                className={cn(
                                    "w-full py-3 px-4 rounded-lg font-medium transition-colors mt-4",
                                    theme === 'dark'
                                        ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                                        : "bg-orange-web/20 hover:bg-orange-web/30 text-orange-web"
                                )}
                            >
                                I Understand
                            </button>
                        </div>
                    </Dialog.Panel>
                </motion.div>
            </div>
        </Dialog>
    );
} 