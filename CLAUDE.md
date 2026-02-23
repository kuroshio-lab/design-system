# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

@kuroshio-lab/design-system is a monorepo design system built with React, TypeScript, Radix UI, and Tailwind CSS. It exports three npm packages:
- **@kuroshio-lab/ui** - Radix UI-based primitive components (Button, Card, Dialog, Form, Input, Label, Select, Badge, ScrollArea, Separator, Textarea)
- **@kuroshio-lab/components** - Domain-specific components (ObservationCard, SpeciesSearch, MapComponent, ShadcnDynamicForm)
- **@kuroshio-lab/styles** - Shared styling utilities and Tailwind configuration

## Quick Reference Commands

### Development
```bash
npm run dev           # Watch mode for all packages
npm run build         # Build all packages
npm run lint          # Lint all packages
npm run type-check    # Type check all packages
npm run test          # Run tests (no tests currently)
npm run clean         # Clean build artifacts and node_modules
```

### Package-Specific Work
```bash
cd packages/ui && npm run build    # Build only @kuroshio-lab/ui
cd packages/components && npm run dev  # Watch @kuroshio-lab/components
```

### Publishing
```bash
# Via shell script (handles dependency ordering and multi-package publishing)
./scripts/release.sh   # Interactive release with version bumping and git tagging

# Or manually via GitHub Actions
git tag v0.2.0         # GitHub Actions will detect and publish automatically
git push origin main --tags
```

## Architecture

### Monorepo Structure (Turbo)
The project uses Turbo for task orchestration. Key config in `turbo.json`:
- **build**: Outputs to `dist/` and `.next/`, cache disabled
- **dev**: Watch mode, persistent task
- **lint/type-check**: No caching
- **test**: Outputs coverage, cache disabled

### Package Dependency Hierarchy
This ordering is critical for publishing and understanding:
1. **styles** - No dependencies on other packages; provides Tailwind config and utilities
2. **ui** - Depends on styles; exports primitive Radix UI components
3. **components** - Depends on ui; domain-specific components

### Path Aliases (tsconfig.json)
```
@kuroshio-lab/ui → packages/ui/src/index.ts
@kuroshio-lab/components → packages/components/src/index.ts
@kuroshio-lab/styles → packages/styles/src/index.ts
```

### Package Exports
Each package defines granular exports in package.json:
- **@kuroshio-lab/ui**: Individual component exports (./button, ./card, etc.)
- **@kuroshio-lab/components**: Single main export
- **@kuroshio-lab/styles**: Main export + ./tailwind and ./postcss for config files

## Adding Components

### UI Components (Radix-based primitives)
1. Create `packages/ui/src/component-name.tsx`
2. Export from `packages/ui/src/index.ts`
3. Add export entry in `packages/ui/package.json`
4. Use `cn()` utility from styles for conditional Tailwind classes
5. Use `React.forwardRef` pattern for ref support

Pattern:
```typescript
import { cn } from '@kuroshio-lab/styles';

export const MyComponent = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive>
>(({ className, ...props }, ref) => (
  <RadixPrimitive ref={ref} className={cn('default-styles', className)} {...props} />
));
MyComponent.displayName = 'MyComponent';
```

### Domain-Specific Components
1. Create `packages/components/src/feature-name/ComponentName.tsx`
2. Create `packages/components/src/feature-name/index.ts` with exports
3. Re-export from `packages/components/src/index.ts`
4. Use @kuroshio-lab/ui components for consistency

## Key Dependencies

### Core
- **React 18**: Component library
- **TypeScript 5**: Type safety
- **Radix UI**: Unstyled primitives (dialog, select, scroll-area, etc.)

### Styling
- **Tailwind CSS 3**: Utility-first CSS
- **class-variance-authority (CVA)**: Component variant management
- **tailwind-merge**: Merge Tailwind classes intelligently
- **postcss/autoprefixer**: CSS processing

### Forms
- **react-hook-form**: Form state and validation
- **@hookform/resolvers**: Schema validation support
- **zod**: Schema validation (in components package)

### Other
- **lucide-react**: Icons (referenced in examples)
- **axios**: HTTP client (components package)
- **clsx**: Conditional class helper

## CI/CD Pipeline

### GitHub Actions Workflows (.github/workflows/)
1. **ci.yml** - Runs on every push/PR to main
   - Type check → Build → Lint → Tests
   - Required status check for merging

2. **publish.yml** - Triggered by `v*` git tags
   - Builds packages
   - Publishes each to npm in dependency order
   - Requires NPM_TOKEN secret

3. **semantic-release.yml** - Disabled (optional for future)

### Publishing Process
Don't forget when modifying one of packes/UI or component to bump a version before publishing it to avoir conflict
The standard flow:
1. Make changes and ensure tests pass: `npm run build && npm run type-check && npm run lint`
2. Use `./scripts/release.sh` to bump version and create git tags
3. GitHub Actions automatically publishes when tag is pushed
4. Or manually create tags and push: `git tag vX.Y.Z && git push --tags`

## Development Patterns

### Component Development
- Use TypeScript strict mode
- Export types for public APIs
- Use composition patterns from Radix UI
- Support `className` prop and ref forwarding
- Test in consuming projects before publishing

### Styling
- Use `cn()` utility from @kuroshio-lab/styles for class merging
- Follow Tailwind CSS utility-first approach
- Respect accessibility (ARIA attributes in Radix wrappers)
- Components inherit default styles + support className overrides

### Testing
Currently no automated tests - manual testing in consuming projects is required:
```bash
cd kuroshio-design-system/packages/ui
npm link

cd ../../other-project
npm link @kuroshio-lab/ui
npm run dev
```

Or use file:// protocol in package.json dependencies.

## Important Notes

### Build & TypeScript
- Each package compiles to CommonJS (`tsc` in build scripts)
- Outputs go to `dist/` in each package
- Type declarations generated with `d.ts` files
- Strict TypeScript enabled by default

### Versioning
- Uses Semantic Versioning (MAJOR.MINOR.PATCH)
- version scripts update ALL package.json files simultaneously
- Publish order matters: styles → ui → components

### Common Issues
- If components don't reflect changes: `npm run clean && npm install && npm run build`
- Type errors across packages: `npm run type-check` at root
- Module resolution: Check path aliases in tsconfig.json
- Build cache issues: Turbo has cache disabled for build/test/dev tasks

## File Organization Reference

```
packages/
├── ui/
│   ├── src/
│   │   ├── button.tsx         # Simple component files
│   │   ├── card.tsx
│   │   └── index.ts           # Aggregate exports
│   ├── dist/                  # Compiled output
│   ├── package.json           # With granular exports
│   └── tsconfig.json
│
├── components/
│   ├── src/
│   │   ├── observation/       # Feature directories
│   │   │   ├── ObservationCard.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── dist/
│   └── package.json
│
└── styles/
    ├── src/
    │   └── index.ts           # Exports tokens and cn()
    ├── tailwind.config.js     # Exported separately
    ├── postcss.config.js      # Exported separately
    └── package.json
```

## References
- README.md - Project overview and usage examples
- DEVELOPMENT.md - Detailed development guide
- CI_CD.md - CI/CD workflow documentation
- CONTRIBUTING.md - Contribution guidelines
