'use client';

import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 w-full h-full">
            <style jsx global>{`
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(10px, -10px) scale(1.05); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-15px, 15px) scale(0.95); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translate(0, 0) scale(1.02); }
                    50% { transform: translate(8px, 8px) scale(0.98); }
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                .animate-float-medium {
                    animation: float-medium 6s ease-in-out infinite;
                }
                .animate-float-fast {
                    animation: float-fast 4s ease-in-out infinite;
                }
            `}</style>

            {/* Light theme blobs */}
            <div className="dark:hidden">
                {/* Amber to Yellow gradients */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-200/30 to-yellow-400/20 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-full blur-2xl animate-float-medium" />
                <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-gradient-to-r from-amber-200/25 to-yellow-400/15 rounded-full blur-xl animate-float-fast" />
                <div className="absolute top-1/5 right-1/3 w-44 h-44 bg-gradient-to-r from-amber-500/15 to-pink-500/15 rounded-full blur-2xl animate-float-medium" />
                <div className="absolute bottom-1/5 left-1/4 w-28 h-28 bg-gradient-to-r from-amber-200/20 to-yellow-400/10 rounded-full blur-xl animate-float-fast" />
                <div className="absolute top-2/5 right-1/6 w-36 h-36 bg-gradient-to-r from-amber-500/25 to-pink-500/20 rounded-full blur-3xl animate-float-slow" />
            </div>

            {/* Dark theme blobs */}
            <div className="hidden dark:block">
                {/* Teal gradients */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-200/20 to-teal-500/15 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-teal-400/20 to-yellow-200/15 rounded-full blur-2xl animate-float-medium" />
                <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-gradient-to-r from-teal-200/25 to-teal-500/20 rounded-full blur-xl animate-float-fast" />
                <div className="absolute top-1/5 right-1/3 w-44 h-44 bg-gradient-to-r from-teal-400/15 to-yellow-200/10 rounded-full blur-2xl animate-float-medium" />
                <div className="absolute bottom-1/5 left-1/4 w-28 h-28 bg-gradient-to-r from-teal-200/20 to-teal-500/15 rounded-full blur-xl animate-float-fast" />
                <div className="absolute top-2/5 right-1/6 w-36 h-36 bg-gradient-to-r from-teal-400/25 to-yellow-200/20 rounded-full blur-3xl animate-float-slow" />
            </div>

            {/* White subtle blobs for both themes */}
            <div className="absolute top-1/6 right-1/5 w-24 h-24 bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl animate-float-fast" />
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl animate-float-medium" />
            <div className="absolute top-1/2 right-1/6 w-28 h-28 bg-gradient-radial from-white/8 to-transparent rounded-full blur-2xl animate-float-slow" />
        </div>
    );
} 