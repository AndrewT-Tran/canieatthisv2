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
                "min-h-screen overflow-x-hidden transition-colors duration-300",
                "bg-[#fcfcfc] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
            )}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider>
                        <ThemeWrapper>
                            <main className="min-h-screen w-full flex items-center justify-center">
                                <div className="w-full h-full">
                                    {children}
                                </div>
                            </main>
                        </ThemeWrapper>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
} 