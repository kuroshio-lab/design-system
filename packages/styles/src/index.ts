// Shared style utilities and theme configuration
export * from './tokens';

/**
 * Utility function to merge Tailwind classes conditionally
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
