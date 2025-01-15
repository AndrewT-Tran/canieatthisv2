'use client';

import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function LayoutContent({ children }) {
  const { theme } = useTheme();

  return (
    <div
      suppressHydrationWarning
      className={cn(
        'relative min-h-screen w-full',
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      )}
    >
      {/* Radial gradient for the container */}
      <div
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          suppressHydrationWarning
          className={cn(
            'absolute -top-1/2 left-1/2 aspect-square w-full max-w-2xl -translate-x-1/2 rounded-full',
            theme === 'dark'
              ? 'bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent blur-2xl'
              : 'bg-gradient-radial from-celestial-blue/10 via-celestial-blue/5 to-transparent blur-2xl'
          )}
        />
      </div>

      {/* Main content */}
      <main suppressHydrationWarning className="relative">
        {children}
      </main>
    </div>
  );
}

export function ThemeWrapper({ children }) {
  return <LayoutContent>{children}</LayoutContent>;
}
