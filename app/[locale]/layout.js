import { Inter } from 'next/font/google';
import { Climate_Crisis } from 'next/font/google';
import '../../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeWrapper } from '../components/ThemeWrapper';
import { cn } from '../utils/cn';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '../i18n/settings';
import AnimatedBackground from '../components/AnimatedBackground';

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
      <body
        suppressHydrationWarning
        className={cn(
          inter.className,
          climateCrisis.variable,
          'min-h-screen w-full overflow-x-hidden',
          'bg-gradient-to-b from-orange-50/40 via-transparent to-white/60',
          'dark:from-gray-900/80 dark:via-transparent dark:to-gray-800/70'
        )}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <ThemeWrapper>
              {/* Background with animated blobs */}
              <AnimatedBackground />

              {/* Main content container */}
              <div className="relative min-h-screen w-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </div>
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
