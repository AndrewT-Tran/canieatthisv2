import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
        <div className="flex gap-1">
            {languages.map((lang) => (
                lang.code !== locale && (
                    <Link
                        key={lang.code}
                        href={`/${lang.code}${pathnameWithoutLocale}`}
                        className="px-1.5 py-0.5 rounded text-sm hover:bg-white/10 dark:hover:bg-gray-700/50 
                            transition-colors duration-200"
                    >
                        {lang.code.toUpperCase()}
                    </Link>
                )
            ))}
        </div>
    );
} 