import { Inter } from 'next/font/google';
import { Climate_Crisis } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeWrapper } from '../components/ThemeWrapper';
import { cn } from '../utils/cn';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '../i18n/settings';

const inter = Inter({ subsets: ['latin'] });
const climateCrisis = Climate_Crisis({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-climate-crisis',
});

export const metadata = {
    title: 'Can I Eat This?',
    description: 'Discover the nutritional content of any food or meal',
};

export default async function RootLayout({ children, params }) {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;

    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = (await import(`../../messages/${locale}.json`)).default;

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <meta name="color-scheme" content="dark light" />
            </head>
            <body suppressHydrationWarning className={cn(
                inter.className,
                climateCrisis.variable,
                "min-h-screen w-full overflow-x-hidden transition-colors duration-300",
                "bg-gradient-to-b from-orange-50 via-orange-50/50 to-white",
                "dark:from-gray-900 dark:via-gray-850 dark:to-gray-800"
            )}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider>
                        <ThemeWrapper>
                            {/* Background gradient overlay */}
                            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-orange-100/20 to-orange-100/10 dark:via-black/5 dark:to-black/10 pointer-events-none" />

                            {/* Main content */}
                            <main className="relative min-h-screen w-full z-10">
                                {children}
                            </main>
                        </ThemeWrapper>
                    </ThemeProvider>
                </NextIntlClientProvider>

                {/* Script to prevent theme flash */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function getTheme() {
                                    const savedTheme = localStorage.getItem('theme');
                                    if (savedTheme) return savedTheme;
                                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                }
                                document.documentElement.classList.add(getTheme());
                            })();
                        `,
                    }}
                />
            </body>
        </html>
    );
} 