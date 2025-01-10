import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
];

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const { locale } = useParams();

    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    return (
        <div className="flex items-center gap-3">
            {languages.map((lang) => {
                const isActive = lang.code === locale;
                return (
                    <motion.div
                        key={lang.code}
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isActive ? (
                            <div className="relative px-2 py-1 rounded-lg 
                                dark:text-white text-gray-900 font-medium
                                dark:bg-white/10 bg-white/80
                                backdrop-blur-sm"
                            >
                                <span>{lang.code.toUpperCase()}</span>
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-celestial-blue to-asparagus"
                                    layoutId="activeLocale"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        ) : (
                            <Link
                                href={`/${lang.code}${pathnameWithoutLocale}`}
                                className="group relative px-2 py-1 rounded-lg
                                    dark:text-white/70 text-gray-600
                                    hover:dark:text-white hover:text-gray-900
                                    transition-colors duration-200"
                            >
                                <span className="relative z-10">{lang.code.toUpperCase()}</span>
                                {/* Hover background effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg dark:bg-white/5 bg-black/5 opacity-0"
                                    initial={false}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                {/* Hover underline effect */}
                                <motion.div
                                    className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gradient-to-r from-celestial-blue to-asparagus"
                                    initial={false}
                                    whileHover={{
                                        left: '0%',
                                        right: '0%',
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Link>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
} 