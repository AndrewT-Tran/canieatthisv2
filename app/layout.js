import './globals.css';
import { Inter, Climate_Crisis, Noto_Sans_SC, Ma_Shan_Zheng, Poppins } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import { cn } from './utils/cn';

// Font Definitions
const inter = Inter({ subsets: ['latin'] });
const climateCrisis = Climate_Crisis({ subsets: ['latin'], variable: '--font-climate-crisis', display: 'swap' });
const notoSansSC = Noto_Sans_SC({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-noto-sans-sc', preload: true, display: 'swap' });
const maShanZheng = Ma_Shan_Zheng({ weight: ['400'], subsets: ['latin'], variable: '--font-ma-shan-zheng', preload: true, display: 'swap' });
const poppins = Poppins({ weight: ['300', '400', '500', '600'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' });

// Metadata
export const metadata = {
  title: 'Can I Eat This?',
  description: 'Discover the nutritional content of any food or meal',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Can I Eat This?',
  },
};

// Viewport Settings
export const viewport = {
  themeColor: '#FCA311',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Manifest and Favicon */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        {/* Meta Tags for PWA */}
        <meta name="theme-color" content="#FCA311" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Can I Eat This?" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />

        {/* Script to Remove Unwanted Attributes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const html = document.documentElement;
                const removeAttrs = ['data-extension-installed', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
                removeAttrs.forEach(attr => {
                  html.removeAttribute(attr);
                  const observer = new MutationObserver(() => {
                    html.removeAttribute(attr);
                  });
                  observer.observe(html, { attributes: true, attributeFilter: [attr] });
                });
              })();
            `,
          }}
        />
      </head>

      <body
        className={cn(
          inter.className,
          climateCrisis.variable,
          notoSansSC.variable,
          maShanZheng.variable,
          poppins.variable,
          'antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(err => console.error('Service Worker registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}