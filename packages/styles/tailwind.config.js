/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, '../ui/src/**/*.{ts,tsx}'),
    path.resolve(__dirname, '../components/src/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        // Standard Tailwind semantic colors (for default/destructive/secondary variants)
        'primary-foreground': '#ffffff',
        'destructive-foreground': '#ffffff',
        'secondary-foreground': '#ffffff',
        'accent-foreground': '#ffffff',
        background: '#ffffff',
        foreground: '#0D1B2A',
        input: '#D7DFE2',
        ring: '#0077BA',
        // Brand colors with explicit naming
        'brand-primary': {
          900: '#003A63',
          700: '#005A8D',
          500: '#0077BA',
          300: '#21C6E3',
          100: '#E8FAFF',
        },
        // Neutral grays
        'neutral-gray': {
          900: '#0D1B2A',
          700: '#1E2D3A',
          500: '#A7B2B7',
          300: '#D7DFE2',
          100: '#F3F6F7',
        },
        // Accent colors
        'accent-eco': '#30C39E',
        'accent-coral': '#FF6F59',
        'accent-sand': '#F5F2E9',
        // Semantic colors
        'semantic-success': {
          500: '#30C39E',
          100: '#E6F7F3',
        },
        'semantic-warning': {
          500: '#FFCF5C',
          100: '#FFF6E1',
        },
        'semantic-error': {
          500: '#D64550',
          100: '#FDECEE',
        },
        // Legacy naming for compatibility
        primary: {
          DEFAULT: '#0077BA',
          900: '#003A63',
          700: '#005A8D',
          500: '#0077BA',
          300: '#21C6E3',
          100: '#E8FAFF',
        },
        neutral: {
          900: '#0D1B2A',
          700: '#1E2D3A',
          500: '#A7B2B7',
          300: '#D7DFE2',
          100: '#F3F6F7',
        },
        eco: '#30C39E',
        coral: '#FF6F59',
        sand: '#F5F2E9',
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
        'ocean-200': '#E8FAFF',
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
        'kerama-depth': 'linear-gradient(135deg, #21C6E3 0%, #0077BA 60%, #003A63 100%)',
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
