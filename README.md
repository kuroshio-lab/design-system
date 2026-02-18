# @kuroshio-lab/design-system

An open-source design system and component library for Kuroshio Lab projects. Built with React, TypeScript, Radix UI, and Tailwind CSS.

## Overview

This monorepo contains three packages:

- **[@kuroshio-lab/ui](./packages/ui)** - Radix UI-based primitive components (Button, Card, Dialog, Form, etc.)
- **[@kuroshio-lab/components](./packages/components)** - Domain-specific components (ObservationCard, SpeciesSearch, MapComponent, etc.)
- **[@kuroshio-lab/styles](./packages/styles)** - Shared styling utilities, Tailwind configuration, and theme

## Quick Start

### Installation

```bash
# At the monorepo root
npm install
# or
pnpm install
# or
yarn install
```

### Development

```bash
# Watch mode for all packages
npm run dev

# Build all packages
npm run build

# Lint all packages
npm run lint

# Type check all packages
npm run type-check
```

### Structure

```
kuroshio-design-system/
├── packages/
│   ├── ui/                 # Radix UI-based components
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
│   │   └── package.json
│   │
│   ├── components/         # Domain-specific components
│   │   ├── src/
│   │   │   ├── observation/
│   │   │   │   ├── ObservationCard.tsx
│   │   │   │   └── ObservationModal.tsx
│   │   │   ├── species/
│   │   │   │   └── SpeciesSearch.tsx
│   │   │   ├── map/
│   │   │   │   └── MapComponent.tsx
│   │   │   ├── forms/
│   │   │   │   └── ShadcnDynamicForm.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── styles/             # Styling utilities and config
│       ├── src/
│       │   └── index.ts
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── package.json
│
├── tsconfig.json
├── turbo.json
├── package.json
└── README.md
```

## Publishing to npm

### Prerequisites

1. Create npm account at https://www.npmjs.com
2. Add npm credentials: `npm login`
3. Create GitHub repository for this design system

### Publishing Steps

```bash
# 1. Update version in root package.json and all packages
npm version patch  # or minor/major

# 2. Build all packages
npm run build

# 3. Publish to npm
npm publish

# 4. Publish @kuroshio-lab/ui
cd packages/ui && npm publish

# 5. Publish @kuroshio-lab/components
cd ../components && npm publish

# 6. Publish @kuroshio-lab/styles
cd ../styles && npm publish
```

## Usage in Projects

### In marine-species-tracker

```bash
# Install from npm
npm install @kuroshio-lab/ui @kuroshio-lab/components @kuroshio-lab/styles
```

```typescript
// src/app/layout.tsx
import { tailwindConfig } from '@kuroshio-lab/styles/tailwind';

// src/components/page.tsx
import { Button } from '@kuroshio-lab/ui/button';
import { Card } from '@kuroshio-lab/ui/card';
import { ObservationCard } from '@kuroshio-lab/components';
```

### In landing-page

```bash
npm install @kuroshio-lab/ui @kuroshio-lab/styles
```

### In ocean-data-dashboard

```bash
npm install @kuroshio-lab/ui @kuroshio-lab/styles
```

## Component APIs

### @kuroshio-lab/ui

All components are styled with Tailwind CSS and built on Radix UI primitives.

```typescript
import {
  Button,
  Card,
  Dialog,
  Form,
  Input,
  Label,
  Select,
  Badge,
  ScrollArea,
  Separator,
  Textarea,
} from '@kuroshio-lab/ui';
```

### @kuroshio-lab/components

Domain-specific components from Kuroshio Lab projects.

```typescript
import {
  ObservationCard,
  ObservationModal,
  SpeciesSearch,
  MapComponent,
  ShadcnDynamicForm,
} from '@kuroshio-lab/components';
```

### @kuroshio-lab/styles

Shared styling utilities.

```typescript
import { theme, cn } from '@kuroshio-lab/styles';

// Use theme colors
const color = theme.colors.primary;

// Use cn utility for conditional classes
const className = cn('p-4', isActive && 'bg-blue-500');
```

## Adding Components

### Adding a UI Component

1. Create component file in `packages/ui/src/` (e.g., `accordion.tsx`)
2. Add export to `packages/ui/src/index.ts`
3. Update `packages/ui/package.json` exports field

### Adding a Domain Component

1. Create directory structure in `packages/components/src/` (e.g., `src/observation/`)
2. Create component file
3. Add export to `packages/components/src/index.ts`

## Configuration Files

### tsconfig.json

Path aliases for importing from packages:

```json
{
  "paths": {
    "@kuroshio-lab/ui": ["packages/ui/src/index.ts"],
    "@kuroshio-lab/components": ["packages/components/src/index.ts"],
    "@kuroshio-lab/styles": ["packages/styles/src/index.ts"]
  }
}
```

### turbo.json

Optimizes builds across the monorepo using Turbo.

## Development Workflow

### For Contributors

1. Fork the repository
2. Create a feature branch
3. Make changes to component files
4. Test locally: `npm run dev`
5. Run type checks: `npm run type-check`
6. Commit and push to GitHub
7. Create a pull request

### Local Testing with Other Projects

To test changes before publishing:

```bash
# In the project using the design system (marine-species-tracker)
npm install /path/to/kuroshio-design-system/packages/ui
```

Or use npm link:

```bash
cd kuroshio-design-system/packages/ui
npm link

cd ../../../marine-species-tracker
npm link @kuroshio-lab/ui
```

## License

MIT - See LICENSE file for details

## Contributing

We welcome contributions! Please read our contributing guidelines and submit issues or pull requests.

## Links

- [GitHub Repository](https://github.com/kuroshio-lab/design-system)
- [npm Package](https://www.npmjs.com/org/kuroshio)
- [Kuroshio Lab](https://kuroshio-lab.io)
