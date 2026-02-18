/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/ui/src/**/*.{ts,tsx}',
    './packages/components/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary colors (ocean depths)
        primary: {
          900: '#003A63',
          700: '#005A8D',
          500: '#0077BA',
          300: '#21C6E3',
          100: '#E8FAFF',
        },
        // Neutral grays
        neutral: {
          900: '#0D1B2A',
          700: '#1E2D3A',
          500: '#A7B2B7',
          300: '#D7DFE2',
          100: '#F3F6F7',
        },
        // Accent colors
        eco: '#30C39E',
        coral: '#FF6F59',
        sand: '#F5F2E9',
        // Semantic colors
        success: {
          500: '#30C39E',
          100: '#E6F7F3',
        },
        warning: {
          500: '#FFCF5C',
          100: '#FFF6E1',
        },
        error: {
          500: '#D64550',
          100: '#FDECEE',
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
      },
      backgroundImage: {
        'gradient-kerama': 'linear-gradient(135deg, #21C6E3 0%, #0077BA 60%, #003A63 100%)',
        'gradient-reef': 'linear-gradient(145deg, #E8FAFF 0%, #21C6E3 100%)',
        'gradient-dawn': 'linear-gradient(140deg, #0077BA 0%, #FF6F59 100%)',
      },
      opacity: {
        light: '0.05',
        medium: '0.15',
        strong: '0.3',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
