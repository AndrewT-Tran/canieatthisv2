'use client';

import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 h-full w-full">
      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(10px, -10px) scale(1.05);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-15px, 15px) scale(0.95);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) scale(1.02);
          }
          50% {
            transform: translate(8px, 8px) scale(0.98);
          }
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
        <div className="animate-float-slow absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-amber-200/30 to-yellow-400/20 blur-3xl" />
        <div className="animate-float-medium absolute bottom-1/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 blur-2xl" />
        <div className="animate-float-fast absolute left-1/3 top-2/3 h-32 w-32 rounded-full bg-gradient-to-r from-amber-200/25 to-yellow-400/15 blur-xl" />
        <div className="top-1/5 animate-float-medium absolute right-1/3 h-44 w-44 rounded-full bg-gradient-to-r from-amber-500/15 to-pink-500/15 blur-2xl" />
        <div className="bottom-1/5 animate-float-fast absolute left-1/4 h-28 w-28 rounded-full bg-gradient-to-r from-amber-200/20 to-yellow-400/10 blur-xl" />
        <div className="top-2/5 right-1/6 animate-float-slow absolute h-36 w-36 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/20 blur-3xl" />
      </div>

      {/* Dark theme blobs */}
      <div className="hidden dark:block">
        {/* Teal gradients */}
        <div className="animate-float-slow absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-teal-200/20 to-teal-500/15 blur-3xl" />
        <div className="animate-float-medium absolute bottom-1/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-teal-400/20 to-yellow-200/15 blur-2xl" />
        <div className="animate-float-fast absolute left-1/3 top-2/3 h-32 w-32 rounded-full bg-gradient-to-r from-teal-200/25 to-teal-500/20 blur-xl" />
        <div className="top-1/5 animate-float-medium absolute right-1/3 h-44 w-44 rounded-full bg-gradient-to-r from-teal-400/15 to-yellow-200/10 blur-2xl" />
        <div className="bottom-1/5 animate-float-fast absolute left-1/4 h-28 w-28 rounded-full bg-gradient-to-r from-teal-200/20 to-teal-500/15 blur-xl" />
        <div className="top-2/5 right-1/6 animate-float-slow absolute h-36 w-36 rounded-full bg-gradient-to-r from-teal-400/25 to-yellow-200/20 blur-3xl" />
      </div>

      {/* White subtle blobs for both themes */}
      <div className="top-1/6 right-1/5 bg-gradient-radial animate-float-fast absolute h-24 w-24 rounded-full from-white/10 to-transparent blur-2xl" />
      <div className="left-1/6 bg-gradient-radial animate-float-medium absolute bottom-1/4 h-36 w-36 rounded-full from-white/5 to-transparent blur-3xl" />
      <div className="right-1/6 bg-gradient-radial from-white/8 animate-float-slow absolute top-1/2 h-28 w-28 rounded-full to-transparent blur-2xl" />
    </div>
  );
}
