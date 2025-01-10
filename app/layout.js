import './globals.css';
import { Inter, Climate_Crisis, Noto_Sans_SC } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import { cn } from './utils/cn';

const inter = Inter({ subsets: ['latin'] });

const climateCrisis = Climate_Crisis({
  subsets: ['latin'],
  variable: '--font-climate-crisis',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  preload: true,
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        climateCrisis.variable,
        notoSansSC.variable,
        'antialiased'
      )}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}