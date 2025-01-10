'use client';

import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function LayoutContent({ children }) {
    const { theme } = useTheme();

    return (
        <div suppressHydrationWarning className={cn(
            "min-h-screen w-full relative",
            theme === 'dark'
                ? "text-white"
                : "text-gray-800"
        )}>
            {/* Radial gradient for the container */}
            <div suppressHydrationWarning className="absolute inset-0 overflow-hidden pointer-events-none">
                <div suppressHydrationWarning className={cn(
                    "absolute -top-1/2 left-1/2 -translate-x-1/2 aspect-square w-full max-w-2xl rounded-full",
                    theme === 'dark'
                        ? "bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent blur-2xl"
                        : "bg-gradient-radial from-celestial-blue/10 via-celestial-blue/5 to-transparent blur-2xl"
                )} />
            </div>

            {/* Main content */}
            <main suppressHydrationWarning className="relative">
                {children}
            </main>
        </div>
    );
}

export function ThemeWrapper({ children }) {
    return (
        <LayoutContent>{children}</LayoutContent>
    );
} 