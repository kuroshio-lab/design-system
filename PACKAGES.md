# Package Details

This document provides an overview of each package in the design system.

## @kuroshio-lab/ui

**Primitive UI components built with Radix UI and Tailwind CSS.**

### Purpose

Provides a consistent set of unstyled, accessible, composable React components that can be used across all Kuroshio Lab projects.

### Included Components

| Component | Radix Base | Use Case |
|-----------|-----------|----------|
| `Button` | - | Clickable actions |
| `Card` | - | Container for grouped content |
| `Dialog` | `@radix-ui/react-dialog` | Modal dialogs |
| `Form` | - | React Hook Form wrapper |
| `Input` | - | Text input fields |
| `Label` | `@radix-ui/react-label` | Form labels |
| `Select` | `@radix-ui/react-select` | Dropdown selections |
| `Badge` | - | Status tags and labels |
| `ScrollArea` | `@radix-ui/react-scroll-area` | Custom scrollable regions |
| `Separator` | `@radix-ui/react-separator` | Visual dividers |
| `Textarea` | - | Multi-line text input |

### Installation

```bash
npm install @kuroshio-lab/ui
```

### Usage

```typescript
import { Button, Card, Input, Label } from '@kuroshio-lab/ui';

export function MyForm() {
  return (
    <Card>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Dependencies

- `@radix-ui/*` - Headless components
- `react` ^18.2.0
- `tailwindcss` - Styling
- `clsx` - Class name utilities

### Export Pattern

Each component is exported as a named export:

```typescript
export * from './button';
export * from './card';
// ... etc
```

Also supports direct imports:

```typescript
import { Button } from '@kuroshio-lab/ui/button';
import { Card } from '@kuroshio-lab/ui/card';
```

## @kuroshio-lab/components

**Domain-specific React components for Kuroshio Lab projects.**

### Purpose

Reusable components specific to Kuroshio Lab's marine and oceanographic applications. These are higher-level components built using `@kuroshio-lab/ui` primitives.

### Planned Components

The following components will be migrated from existing projects:

```
observation/
  ├── ObservationCard.tsx       # Display observation metadata
  ├── ObservationModal.tsx      # Full observation details modal
  └── ObservationList.tsx       # List with filtering

species/
  ├── SpeciesSearch.tsx         # Search and select species
  └── SpeciesCard.tsx           # Display species info

map/
  ├── MapComponent.tsx          # Leaflet map with observations
  └── MapControls.tsx           # Map layer controls

forms/
  ├── ShadcnDynamicForm.tsx    # Dynamic form from schema
  └── ObservationForm.tsx       # Observation entry form

charts/
  ├── TemperatureChart.tsx     # Recharts wrapper
  └── DataVisualization.tsx    # Common chart patterns

layout/
  ├── Header.tsx                # App header
  ├── Sidebar.tsx               # Navigation sidebar
  └── AuthLayout.tsx            # Auth pages layout
```

### Installation

```bash
npm install @kuroshio-lab/components
```

### Usage

```typescript
import {
  ObservationCard,
  SpeciesSearch,
  MapComponent
} from '@kuroshio-lab/components';

export function Dashboard() {
  return (
    <div>
      <MapComponent />
      <SpeciesSearch />
      <ObservationCard observation={data} />
    </div>
  );
}
```

### Dependencies

- `@kuroshio-lab/ui` - UI primitives
- `react` ^18.2.0
- `axios` - API calls
- `react-hook-form` - Form handling
- `zod` - Schema validation

### Structure

Components are organized by domain:

```
packages/components/src/
├── observation/
│   ├── ObservationCard.tsx
│   └── index.ts
├── species/
│   ├── SpeciesSearch.tsx
│   └── index.ts
├── map/
│   ├── MapComponent.tsx
│   └── index.ts
└── index.ts                # Main exports
```

## @kuroshio-lab/styles

**Shared styling utilities, theme configuration, and Tailwind CSS setup.**

### Purpose

Centralizes theme, colors, typography, and styling utilities used across all packages and projects.

### Exports

```typescript
// Utilities
export { cn } from '@kuroshio-lab/styles';

// Theme
export { theme } from '@kuroshio-lab/styles';
```

### Tailwind Configuration

```typescript
// tailwind.config.js
const kuroshioConfig = require('@kuroshio-lab/styles/tailwind');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/@kuroshio-lab/ui/dist/**/*.js',
  ],
  theme: {
    extend: kuroshioConfig.theme.extend,
  },
  plugins: kuroshioConfig.plugins,
};
```

### Installation

```bash
npm install @kuroshio-lab/styles
```

### Usage

```typescript
import { cn, theme } from '@kuroshio-lab/styles';

// Merge Tailwind classes
const className = cn(
  'px-4 py-2',
  isActive && 'bg-blue-500',
  disabled && 'opacity-50'
);

// Use theme colors
const color = theme.colors.primary; // #0ea5e9
```

### Theme Structure

```typescript
{
  colors: {
    primary: '#0ea5e9',
    secondary: '#6366f1',
    accent: '#ec4899',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    neutral: '#6b7280',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  }
}
```

### Tailwind Extensions

Adds animations for Radix UI components:

- `animate-accordion-down` - Accordion open animation
- `animate-accordion-up` - Accordion close animation

## Package Relationships

```
┌─────────────────────────┐
│  @kuroshio-lab/styles       │
│  (theme, utilities)     │
└────────────┬────────────┘
             │ uses
             ▼
┌─────────────────────────┐
│  @kuroshio-lab/ui           │
│  (primitives)           │
└────────────┬────────────┘
             │ uses
             ▼
┌─────────────────────────┐
│  @kuroshio-lab/components   │
│  (domain components)    │
└─────────────────────────┘
```

## Version Management

Each package follows semantic versioning independently:

- **Major**: Breaking changes to component APIs
- **Minor**: New components or features (backward compatible)
- **Patch**: Bug fixes

However, it's recommended to keep all packages at the same major.minor version for consistency.

## Migration Status

### marine-species-tracker
- ✅ UI components ready in `@kuroshio-lab/ui`
- ⏳ Domain components (observation, species, map) pending migration to `@kuroshio-lab/components`

### landing-page
- ✅ UI components ready in `@kuroshio-lab/ui`
- ✅ Styles ready in `@kuroshio-lab/styles`
- ⏳ Project-specific components (project-card) to be evaluated

### ocean-data-dashboard
- ✅ UI components ready in `@kuroshio-lab/ui`
- ⏳ Chart components (TemperatureChart) pending migration to `@kuroshio-lab/components`

## Future Enhancements

- [ ] Storybook for component documentation
- [ ] Component testing suite
- [ ] Design tokens (colors, typography, spacing)
- [ ] Theming system (light/dark mode)
- [ ] Additional Radix UI components (accordion, tabs, etc.)
- [ ] Icons package

## Contributing

To add or modify components:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Read [DEVELOPMENT.md](./DEVELOPMENT.md)
3. Create feature branch
4. Make changes
5. Submit pull request

## Links

- [Design System README](./README.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
