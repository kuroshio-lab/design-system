# Migration Guide: Moving to @kuroshio-lab/design-system

This guide helps you migrate existing Kuroshio Lab projects to use the shared design system.

## Overview

Instead of maintaining components in each project, all shared UI components are now in `@kuroshio-lab/design-system`. This reduces duplication and makes it easier to maintain consistent styling across projects.

## Step-by-Step Migration

### Phase 1: Install Design System

```bash
# Install the design system packages
npm install @kuroshio-lab/ui @kuroshio-lab/components @kuroshio-lab/styles

# For local development, use the monorepo version
npm install file:../kuroshio-design-system/packages/ui
npm install file:../kuroshio-design-system/packages/components
npm install file:../kuroshio-design-system/packages/styles
```

### Phase 2: Remove Local Component Duplicates

#### For UI Components

Remove these files from your project:

```
src/components/ui/
├── badge.tsx          ✓ Remove (use @kuroshio-lab/ui)
├── button.tsx         ✓ Remove (use @kuroshio-lab/ui)
├── card.tsx           ✓ Remove (use @kuroshio-lab/ui)
├── dialog.tsx         ✓ Remove (use @kuroshio-lab/ui)
├── form.tsx           ✓ Remove (use @kuroshio-lab/ui)
├── input.tsx          ✓ Remove (use @kuroshio-lab/ui)
├── label.tsx          ✓ Remove (use @kuroshio-lab/ui)
├── scroll-area.tsx    ✓ Remove (use @kuroshio-lab/ui)
├── select.tsx         ✓ Remove (use @kuroshio-lab/ui)
├── separator.tsx      ✓ Remove (use @kuroshio-lab/ui)
└── textarea.tsx       ✓ Remove (use @kuroshio-lab/ui)
```

#### For Domain Components

Move these to `@kuroshio-lab/components` (if shared) or keep project-specific ones:

```
src/components/
├── ObservationCard.tsx           → @kuroshio-lab/components or keep
├── ObservationModal.tsx          → @kuroshio-lab/components or keep
├── SpeciesSearch.tsx             → @kuroshio-lab/components or keep
├── MapComponent.tsx              → @kuroshio-lab/components or keep
├── ShadcnDynamicForm.tsx         → @kuroshio-lab/components or keep
└── [project-specific].tsx        ✓ Keep (not in design system yet)
```

### Phase 3: Update Imports

#### Before

```typescript
// marine-species-tracker/src/components/page.tsx
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ObservationCard } from './ObservationCard';
```

#### After

```typescript
// marine-species-tracker/src/components/page.tsx
import { Button, Card } from '@kuroshio-lab/ui';
import { ObservationCard } from '@kuroshio-lab/components';
```

### Phase 4: Update Styling Configuration

#### Tailwind Config

Update your `tailwind.config.js` to include design system components:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@kuroshio-lab/ui/dist/**/*.js',
    './node_modules/@kuroshio-lab/components/dist/**/*.js',
  ],
  // Extend with your project-specific theme
  theme: {
    extend: {
      colors: {
        // Your custom colors here
      },
    },
  },
  plugins: [],
};
```

Or use the shared config:

```javascript
const kuroshioConfig = require('@kuroshio-lab/styles/tailwind');

module.exports = {
  ...kuroshioConfig,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    ...kuroshioConfig.content,
  ],
  theme: {
    extend: {
      ...kuroshioConfig.theme.extend,
      // Add project-specific theme overrides
    },
  },
};
```

### Phase 5: Test Thoroughly

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Run dev server
npm run dev
```

## Project-Specific Instructions

### marine-species-tracker

1. Remove `src/components/ui/` directory entirely
2. Update imports in all files using UI components
3. Move custom components to `@kuroshio-lab/components` if they should be shared
4. Update `tailwind.config.js`

**Estimated effort:** 2-3 hours

### landing-page

1. Remove or consolidate duplicate UI components
2. Use `@kuroshio-lab/ui` for shared primitives
3. Keep `project-card.tsx` (project-specific)
4. Update `tailwind.config.js`

**Estimated effort:** 1-2 hours

### ocean-data-dashboard

1. Consider extracting chart components to `@kuroshio-lab/components`
2. Use `@kuroshio-lab/ui` for UI primitives
3. Update styling configuration

**Estimated effort:** 1-2 hours

## Handling Conflicts

### Different Component Styling

If your project styles UI components differently:

1. Keep the component local (don't remove it)
2. File an issue on the design system repo
3. Consider making styling more configurable

### Missing Components

If the design system doesn't have a component you need:

1. Create it in `@kuroshio-lab/components` and submit a PR
2. Or keep it local until it's added

### Version Mismatches

Ensure all projects use the same version:

```bash
npm install @kuroshio-lab/ui@^0.1.0 @kuroshio-lab/components@^0.1.0
```

## Reverting Changes

If you need to revert:

```bash
# Uninstall design system packages
npm uninstall @kuroshio-lab/ui @kuroshio-lab/components @kuroshio-lab/styles

# Restore component files from git history
git checkout src/components/ui/
```

## Common Issues

### Import Resolution

**Error:** `Cannot find module '@kuroshio-lab/ui'`

**Solution:**
- Ensure packages are installed: `npm install`
- Check `tsconfig.json` paths configuration
- Clear node_modules: `rm -rf node_modules && npm install`

### Styling Not Applied

**Error:** Components render but styling is missing

**Solution:**
- Verify `tailwind.config.js` includes design system paths
- Run `npm run build` in the design system
- Check that Tailwind CSS is imported in your main CSS file

### Type Errors

**Error:** Type definitions not found

**Solution:**
- Ensure TypeScript is configured correctly
- Run `npm run type-check` in design system repo
- Rebuild: `npm run build`

## Next Steps

1. Read the [Design System README](./README.md)
2. Check the [Component Documentation](./packages/ui/README.md)
3. File issues for missing components
4. Contribute improvements via PRs

## Questions?

Open an issue on the [design system repository](https://github.com/kuroshio-lab/design-system/issues).
