# Development Guide

This guide explains how to work on the design system locally.

## Initial Setup

```bash
# Clone the repository
git clone https://github.com/kuroshio-lab/design-system.git
cd design-system

# Install dependencies
npm install
# or: pnpm install, yarn install
```

## Project Structure

```
kuroshio-design-system/
├── packages/
│   ├── ui/                     # Primitive UI components
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── components/             # Domain-specific components
│   │   ├── src/
│   │   │   ├── observation/
│   │   │   ├── species/
│   │   │   ├── map/
│   │   │   ├── forms/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── styles/                 # Theme and utilities
│       ├── src/
│       │   └── index.ts
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── package.json
│       └── tsconfig.json
│
├── tsconfig.json               # Root TypeScript config
├── turbo.json                  # Turbo build config
├── package.json                # Root package.json
├── README.md                   # Project overview
├── CONTRIBUTING.md             # Contribution guide
├── MIGRATION_GUIDE.md          # Migration instructions
└── LICENSE                     # MIT License
```

## Commands

### Development

```bash
# Watch all packages for changes
npm run dev

# Build all packages
npm run build

# Type check all packages
npm run type-check

# Lint all packages
npm run lint

# Run tests
npm run test

# Clean build artifacts
npm run clean
```

### Package-Specific Commands

```bash
# Work on a specific package
cd packages/ui

npm run build      # Build only @kuroshio/ui
npm run dev        # Watch @kuroshio/ui
npm run type-check # Type check @kuroshio/ui
```

## Adding a New Component

### Adding to @kuroshio/ui

1. **Create component file**

```typescript
// packages/ui/src/accordion.tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@kuroshio/styles"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  />
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

2. **Export from index.ts**

```typescript
// packages/ui/src/index.ts
export * from './accordion'
```

3. **Update package.json exports**

```json
{
  "exports": {
    "./accordion": {
      "import": "./dist/accordion.js",
      "types": "./dist/accordion.d.ts"
    }
  }
}
```

### Adding to @kuroshio/components

1. **Create component directory and file**

```
packages/components/src/
└── header/
    ├── Header.tsx
    └── index.ts
```

```typescript
// packages/components/src/header/Header.tsx
import React from 'react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </header>
  );
};
```

2. **Create index.ts for exports**

```typescript
// packages/components/src/header/index.ts
export * from './Header';
```

3. **Export from main index.ts**

```typescript
// packages/components/src/index.ts
export * from './header';
```

## Testing Changes Locally

### Testing in Another Project

Use npm link to test changes before publishing:

```bash
# In design-system repo
cd packages/ui
npm link

# In consumer project (e.g., marine-species-tracker)
npm link @kuroshio/ui
```

Or use the file: protocol in package.json:

```json
{
  "dependencies": {
    "@kuroshio/ui": "file:../kuroshio-design-system/packages/ui"
  }
}
```

Then run:

```bash
npm install
npm run type-check
npm run build
npm run dev
```

## Publishing

### Preparing a Release

1. **Update version numbers**

```bash
# Update all package versions
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

2. **Build and test**

```bash
npm run clean
npm run build
npm run type-check
npm run lint
```

3. **Publish to npm**

```bash
npm publish
cd packages/ui && npm publish
cd packages/components && npm publish
cd packages/styles && npm publish
```

## Best Practices

### Component Development

1. **Use TypeScript**
   - Strict mode enabled
   - Proper type exports
   - Use generics when appropriate

2. **Follow Radix UI patterns**
   - Use primitives as a base
   - Follow composition patterns
   - Support forwarding refs

3. **Styling with Tailwind**
   - Use `cn()` utility for merging classes
   - Support `className` prop
   - Respect accessibility (use ARIA attributes)

4. **Documentation**
   - Add JSDoc comments
   - Export types for public APIs
   - Include usage examples

### Code Style

```typescript
// ✅ Good
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

// ❌ Bad
function Button(props: ButtonProps) {
  return <button {...props} />;
}
```

### File Organization

```
packages/ui/src/
├── accordion/
│   ├── Accordion.tsx       # Component
│   ├── accordion.styles.ts # Styles (if complex)
│   └── index.ts            # Exports
├── button.tsx              # Simple component
└── index.ts                # Main export
```

## Troubleshooting

### Module Resolution Issues

```bash
# Clear caches and reinstall
npm run clean
npm install

# Rebuild everything
npm run build
```

### Type Errors

```bash
# Check types across all packages
npm run type-check

# Fix any errors then rebuild
npm run build
```

### Changes Not Reflecting

```bash
# In consumer project
rm -rf node_modules/.cache
npm run build
npm run dev
```

## Resources

- [Radix UI Docs](https://www.radix-ui.com/)
- [React Best Practices](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Turbo Docs](https://turbo.build/)
