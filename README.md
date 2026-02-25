# @kuroshio-lab/design-system

Monorepo design system for Kuroshio Lab projects. Built with React, TypeScript, Radix UI, and Tailwind CSS.

## Packages

| Package | Version | Description |
|---|---|---|
| [`@kuroshio-lab/styles`](./packages/styles) | ![npm](https://img.shields.io/npm/v/@kuroshio-lab/styles) | Design tokens, `cn()` utility, Tailwind and PostCSS configuration |
| [`@kuroshio-lab/ui`](./packages/ui) | ![npm](https://img.shields.io/npm/v/@kuroshio-lab/ui) | Radix UI-based primitive components |
| [`@kuroshio-lab/components`](./packages/components) | ![npm](https://img.shields.io/npm/v/@kuroshio-lab/components) | Domain-specific components for the marine observation platform |

Packages depend on each other in this order:

```
@kuroshio-lab/styles  →  @kuroshio-lab/ui  →  @kuroshio-lab/components
```

---

## Installation

Install only what you need:

```bash
# Primitives + styling only
npm install @kuroshio-lab/ui @kuroshio-lab/styles

# Full suite including domain components
npm install @kuroshio-lab/ui @kuroshio-lab/components @kuroshio-lab/styles
```

### Tailwind setup

In your consuming project's `tailwind.config.js`:

```js
const sharedConfig = require('@kuroshio-lab/styles/tailwind');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@kuroshio-lab/ui/dist/**/*.js',
    'node_modules/@kuroshio-lab/components/dist/**/*.js',
  ],
  theme: {
    extend: sharedConfig.theme.extend,
  },
  plugins: sharedConfig.plugins,
};
```

---

## Quick usage

### Primitive components

```tsx
import { Button } from '@kuroshio-lab/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@kuroshio-lab/ui/card';
import { Input } from '@kuroshio-lab/ui/input';
import { Badge } from '@kuroshio-lab/ui/badge';

<Card>
  <CardHeader>
    <CardTitle>New observation</CardTitle>
  </CardHeader>
  <CardContent>
    <Input placeholder="Species name" />
    <Button variant="edit">Submit</Button>
  </CardContent>
</Card>
```

### Domain components

```tsx
import { ObservationCard, UserProvider, useUser } from '@kuroshio-lab/components';
import Header from '@kuroshio-lab/components';

<UserProvider apiUrl="https://api.example.com">
  <Header
    onApplyFilters={setFilters}
    initialFilters={filters}
    onSpeciesSearch={fetchSpecies}
    onExport={exportData}
  />
  <ObservationCard
    observation={obs}
    onSelectObservation={handleSelect}
    onDeleteObservation={handleDelete}
    onEditObservationClick={handleEdit}
  />
</UserProvider>
```

### Styling utilities

```tsx
import { cn } from '@kuroshio-lab/styles';
import { tokens } from '@kuroshio-lab/styles';

const primary = tokens.brand['primary-500']; // #0077BA

<div className={cn('base-class', isActive && 'active', className)} />
```

---

## Repository structure

```
packages/
├── styles/                     # @kuroshio-lab/styles
│   ├── src/
│   │   ├── index.ts            # cn() + token exports
│   │   └── tokens.ts           # Design token definitions
│   ├── tailwind.config.js      # Shared Tailwind theme
│   └── postcss.config.js       # Shared PostCSS pipeline
│
├── ui/                         # @kuroshio-lab/ui
│   └── src/
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       ├── textarea.tsx
│       └── index.ts
│
└── components/                 # @kuroshio-lab/components
    └── src/
        ├── observation/        # ObservationCard, MiniObservationCard,
        │                       # ObservationModal, ObservationFilterAndSort
        ├── species/            # SpeciesSearch
        ├── header/             # Header
        ├── filter-modal/       # FilterModal
        ├── export-confirm-modal/ # ExportConfirmModal
        ├── loaders/            # Loader, GlobalLoader
        ├── user/               # UserProvider, useUser, UserRoleBadge,
        │                       # UserObservationSection
        └── index.ts
```

---

## Development

```bash
npm install          # Install all dependencies
npm run dev          # Watch mode for all packages (Turbo)
npm run build        # Build all packages
npm run type-check   # Type check all packages
npm run lint         # Lint all packages
npm run clean        # Remove dist/ and node_modules/
```

Working on a single package:

```bash
cd packages/ui && npm run dev
cd packages/components && npm run build
```

### Local testing in another project

```bash
# Link the package
cd packages/ui && npm link

# In your consuming project
npm link @kuroshio-lab/ui
```

Or use `file://` in the consuming project's `package.json`:

```json
"dependencies": {
  "@kuroshio-lab/ui": "file:../kuroshio-design-system/packages/ui"
}
```

---

## Publishing

Use the interactive release script, which handles version bumping, git tagging, and publish order:

```bash
./scripts/release.sh
```

Or manually:

```bash
# 1. Build and verify
npm run build && npm run type-check && npm run lint

# 2. Tag the release (triggers GitHub Actions publish workflow)
git tag v0.3.0
git push origin main --tags
```

The publish workflow in `.github/workflows/publish.yml` publishes packages in dependency order: `styles → ui → components`.

> Bump the version in `package.json` for any modified package before publishing to avoid npm conflicts.

---

## Documentation

| Document | Contents |
|---|---|
| [packages/styles/README.md](./packages/styles/README.md) | `cn()`, design tokens, Tailwind and PostCSS config |
| [packages/ui/README.md](./packages/ui/README.md) | All UI component APIs and examples |
| [packages/components/README.md](./packages/components/README.md) | All domain component APIs and examples |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Detailed development guide |
| [CI_CD.md](./CI_CD.md) | CI/CD workflow documentation |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines |

---

## License

MIT
