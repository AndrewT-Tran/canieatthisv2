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
        <div className="flex gap-2 items-center">
            {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={`/${lang.code}${pathnameWithoutLocale}`}
                    className={`px-2 py-1 rounded-md text-sm ${locale === lang.code
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                >
                    {lang.name}
                </Link>
            ))}
        </div>
    );
} 