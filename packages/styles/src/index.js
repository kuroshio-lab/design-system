// Shared style utilities and theme configuration
export * from "./tokens";
/**
 * Utility function to merge Tailwind classes conditionally
 */
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};
//# sourceMappingURL=index.js.map