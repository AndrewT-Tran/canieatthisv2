import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useState } from 'react';
import { IoLanguage, IoChevronDown } from 'react-icons/io5';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'cn', name: '中文', className: 'font-ma-shan-zheng' },
    { code: 'vi', name: 'Tiếng Việt' }
];

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const { locale } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    const currentLanguage = languages.find(lang => lang.code === locale);

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                    "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 text-gray-700",
                    isOpen && "dark:bg-gray-800 bg-gray-100"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <IoLanguage className="w-5 h-5" />
                <span className={cn(
                    currentLanguage?.className,
                    "min-w-[60px] text-left"
                )}>
                    {currentLanguage?.name}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50",
                            "dark:bg-gray-800 bg-white"
                        )}
                    >
                        {languages.map((lang) => {
                            const isActive = lang.code === locale;
                            const href = `/${lang.code}${pathnameWithoutLocale || ''}`;

                            return (
                                <Link
                                    key={lang.code}
                                    href={href}
                                    prefetch={true}
                                    replace={true}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <motion.div
                                        className={cn(
                                            "block px-4 py-2 text-sm transition-colors",
                                            "dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 text-gray-700",
                                            isActive && "dark:bg-gray-700 bg-gray-100",
                                            lang.className
                                        )}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {lang.name}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 