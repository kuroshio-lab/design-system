# Contributing to @kuroshio/design-system

Thank you for your interest in contributing! This guide explains how to get started.

## Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/design-system.git
   cd design-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or pnpm/yarn
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/my-new-component
   ```

## Development

### Running the Dev Server

```bash
npm run dev
```

This watches all packages for changes and rebuilds on file save.

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Adding a New Component

### For Primitive UI Components

1. Create a new file in `packages/ui/src/` (e.g., `accordion.tsx`)
2. Follow the pattern of existing components:
   ```typescript
   import React from 'react';
   import * as RadixComponent from '@radix-ui/react-accordion';
   import { cn } from '@kuroshio/styles';

   interface AccordionProps
     extends React.ComponentPropsWithoutRef<typeof RadixComponent.Root> {
     // Add custom props here
   }

   export const Accordion = React.forwardRef<
     React.ElementRef<typeof RadixComponent.Root>,
     AccordionProps
   >(({ className, ...props }, ref) => (
     <RadixComponent.Root
       ref={ref}
       className={cn('...', className)}
       {...props}
     />
   ));

   Accordion.displayName = 'Accordion';
   ```

3. Export from `packages/ui/src/index.ts`
4. Add to `packages/ui/package.json` exports field
5. Test the component in a consuming project

### For Domain-Specific Components

1. Create directory in `packages/components/src/` (e.g., `src/observation/`)
2. Create your component with proper TypeScript types
3. Export from `packages/components/src/index.ts`
4. Use `@kuroshio/ui` components for consistency

## Code Standards

### TypeScript

- Use strict mode
- Add proper type annotations
- Use `React.forwardRef` for components that accept refs

### Styling

- Use Tailwind CSS classes
- Use the `cn` utility from `@kuroshio/styles` for conditional styling
- Follow existing component styling patterns

### Naming

- Components: PascalCase (e.g., `ObservationCard`)
- Functions: camelCase
- Types/Interfaces: PascalCase

## Testing

While we don't have automated tests yet, please manually test your components:

1. Import in a consuming project
2. Verify functionality
3. Check TypeScript inference
4. Test with different prop combinations

## Commit Messages

Use descriptive commit messages following conventional commits:

```
feat: add new accordion component
fix: correct button styling in dark mode
docs: update installation instructions
refactor: simplify form component API
```

## Pull Request Process

1. Update README if adding new components
2. Ensure `npm run type-check` passes
3. Create a descriptive PR title and description
4. Link any related issues
5. Wait for review and address feedback

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

## Publishing

Only maintainers can publish to npm. Once your PR is merged:

1. Create a new version tag
2. Run `npm run build`
3. Publish using npm CLI

## Questions?

Open an issue or contact the Kuroshio Lab team.
