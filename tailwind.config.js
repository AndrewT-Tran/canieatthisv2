const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        // Fluid typography
        'fluid-xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', '1.4'],
        'fluid-sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', '1.5'],
        'fluid-base': ['clamp(1rem, 0.925rem + 0.375vw, 1.125rem)', '1.6'],
        'fluid-lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', '1.6'],
        'fluid-xl': ['clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem)', '1.6'],
        'fluid-2xl': ['clamp(1.5rem, 1.375rem + 0.625vw, 1.875rem)', '1.4'],
        'fluid-3xl': ['clamp(1.875rem, 1.75rem + 0.625vw, 2.25rem)', '1.3'],
        'fluid-4xl': ['clamp(2.25rem, 2rem + 1.25vw, 3rem)', '1.2'],
        'fluid-5xl': ['clamp(3rem, 2.75rem + 1.25vw, 3.75rem)', '1.1'],
        'fluid-6xl': ['clamp(3.75rem, 3.5rem + 1.25vw, 4.5rem)', '1'],
      },
      spacing: {
        // Fluid spacing
        'fluid-1': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem)',
        'fluid-2': 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)',
        'fluid-3': 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)',
        'fluid-4': 'clamp(1rem, 0.925rem + 0.375vw, 1.25rem)',
        'fluid-5': 'clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem)',
        'fluid-6': 'clamp(1.5rem, 1.375rem + 0.625vw, 2rem)',
        'fluid-8': 'clamp(2rem, 1.875rem + 0.625vw, 2.5rem)',
        'fluid-10': 'clamp(2.5rem, 2.375rem + 0.625vw, 3rem)',
        'fluid-12': 'clamp(3rem, 2.875rem + 0.625vw, 3.5rem)',
        'fluid-16': 'clamp(4rem, 3.875rem + 0.625vw, 4.5rem)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          }
        }
      },
      colors: {
        'orange-web': '#FCA311',
        'celestial-blue': '#009FFD',
        'asparagus': '#87A878',
        'outer-space': '#2D383A',
      },
      fontFamily: {
        'climate-crisis': ['var(--font-climate-crisis)'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        // Fluid padding utilities
        '.p-fluid-sm': {
          padding: 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)',
        },
        '.p-fluid-base': {
          padding: 'clamp(1rem, 0.925rem + 0.375vw, 1.25rem)',
        },
        '.p-fluid-lg': {
          padding: 'clamp(1.5rem, 1.375rem + 0.625vw, 2rem)',
        },
        // Fluid margin utilities
        '.m-fluid-sm': {
          margin: 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)',
        },
        '.m-fluid-base': {
          margin: 'clamp(1rem, 0.925rem + 0.375vw, 1.25rem)',
        },
        '.m-fluid-lg': {
          margin: 'clamp(1.5rem, 1.375rem + 0.625vw, 2rem)',
        },
        // Fluid gap utilities
        '.gap-fluid-sm': {
          gap: 'clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)',
        },
        '.gap-fluid-base': {
          gap: 'clamp(1rem, 0.925rem + 0.375vw, 1.25rem)',
        },
        '.gap-fluid-lg': {
          gap: 'clamp(1.5rem, 1.375rem + 0.625vw, 2rem)',
        },
      })
    })
  ],
}
