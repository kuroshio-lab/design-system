/**
 * Design tokens for Kuroshio Lab
 * Colors, spacing, radii, and other design system values
 */

export const tokens = {
  brand: {
    'primary-900': '#003A63',
    'primary-700': '#005A8D',
    'primary-500': '#0077BA',
    'primary-300': '#21C6E3',
    'primary-100': '#E8FAFF',
  },
  neutral: {
    'gray-900': '#0D1B2A',
    'gray-700': '#1E2D3A',
    'gray-500': '#A7B2B7',
    'gray-300': '#D7DFE2',
    'gray-100': '#F3F6F7',
    white: '#FFFFFF',
  },
  accent: {
    'eco-500': '#30C39E',
    'coral-500': '#FF6F59',
    'sand-light': '#F5F2E9',
  },
  semantic: {
    'success-500': '#30C39E',
    'success-100': '#E6F7F3',
    'warning-500': '#FFCF5C',
    'warning-100': '#FFF6E1',
    'error-500': '#D64550',
    'error-100': '#FDECEE',
  },
  gradient: {
    'kerama-depth': 'linear-gradient(135deg, #21C6E3 0%, #0077BA 60%, #003A63 100%)',
    'shallow-reef': 'linear-gradient(145deg, #E8FAFF 0%, #21C6E3 100%)',
    'okinawa-dawn': 'linear-gradient(140deg, #0077BA 0%, #FF6F59 100%)',
  },
  radii: {
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
  opacity: {
    light: 0.05,
    medium: 0.15,
    strong: 0.3,
  },
};

/**
 * Color palette organized by purpose
 */
export const palette = {
  // Primary brand colors (deep ocean)
  primary: {
    900: tokens.brand['primary-900'],
    700: tokens.brand['primary-700'],
    500: tokens.brand['primary-500'],
    300: tokens.brand['primary-300'],
    100: tokens.brand['primary-100'],
  },
  // Neutral grays
  neutral: tokens.neutral,
  // Accent colors
  accent: tokens.accent,
  // Semantic colors
  success: {
    500: tokens.semantic['success-500'],
    100: tokens.semantic['success-100'],
  },
  warning: {
    500: tokens.semantic['warning-500'],
    100: tokens.semantic['warning-100'],
  },
  error: {
    500: tokens.semantic['error-500'],
    100: tokens.semantic['error-100'],
  },
};

/**
 * Gradients for special effects
 */
export const gradients = tokens.gradient;

/**
 * Border radius values
 */
export const radii = tokens.radii;

/**
 * Spacing scale
 */
export const spacing = tokens.spacing;

/**
 * Opacity levels
 */
export const opacity = tokens.opacity;

/**
 * Default theme colors for components
 */
export const theme = {
  colors: {
    primary: tokens.brand['primary-500'],
    'primary-dark': tokens.brand['primary-900'],
    secondary: tokens.brand['primary-300'],
    background: tokens.neutral.white,
    'background-alt': tokens.neutral['gray-100'],
    foreground: tokens.neutral['gray-900'],
    'foreground-alt': tokens.neutral['gray-700'],
    border: tokens.neutral['gray-300'],
    muted: tokens.neutral['gray-500'],
    success: tokens.semantic['success-500'],
    warning: tokens.semantic['warning-500'],
    error: tokens.semantic['error-500'],
    accent: tokens.accent['eco-500'],
  },
  spacing: tokens.spacing,
  radii: tokens.radii,
};
