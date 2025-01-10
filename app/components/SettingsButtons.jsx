import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const localeNames = {
    en: 'English',
    es: 'Español',
    zh: '中文'
};

export default function SettingsButtons() {
    const { locale } = useParams();
    const t = useTranslations();

    return (
        <div className="fixed top-4 right-4 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                bg-white/10 backdrop-blur-sm border border-white/20
                dark:bg-gray-800/50 dark:border-gray-700/50
                text-sm text-gray-600 dark:text-gray-300">
                <span className="hidden sm:inline">{t('common.language')}:</span>
                <span className="font-medium">{localeNames[locale]}</span>
                <LanguageSwitcher />
            </div>
            <ThemeToggle />
        </div>
    );
} 