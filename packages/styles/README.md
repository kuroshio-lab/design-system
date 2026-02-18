# @kuroshio/styles

Shared styling utilities, design tokens, and Tailwind CSS configuration for Kuroshio Lab projects.

## Features

- 🎨 **Design Tokens** - Complete color palette with brand colors, neutrals, and semantics
- 🌊 **Ocean-Inspired Colors** - Primary, accent, and gradient colors
- 🔧 **Tailwind Configuration** - Ready-to-use theme extension
- 📦 **Utility Functions** - Class name merging with `cn()`
- 🎯 **TypeScript Support** - Full type safety for tokens

## Installation

```bash
npm install @kuroshio/styles
```

## Quick Start

### Using Tokens in TypeScript

```typescript
import { palette, theme, gradients } from '@kuroshio/styles';

const primaryColor = palette.primary[500]; // #0077BA
const backgroundColor = palette.neutral['gray-100']; // #F3F6F7
const gradient = gradients['kerama-depth'];
```

### Using in Tailwind CSS

```jsx
function Card() {
  return (
    <div className="bg-primary-100 border border-neutral-300 rounded-md p-md">
      <h2 className="text-primary-900">Heading</h2>
      <p className="text-neutral-700">Content</p>
    </div>
  );
}
```

### Using Class Name Utility

```typescript
import { cn } from '@kuroshio/styles';

function Button({ isActive, disabled }) {
  return (
    <button
      className={cn(
        'px-md py-sm rounded-md',
        isActive && 'bg-primary-500 text-white',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      Click me
    </button>
  );
}
```

## Color Palette

### Brand Colors (Primary)

Ocean-inspired primary colors from deep navy to bright aqua:

```
900: #003A63 (Navy)
700: #005A8D (Deep Ocean)
500: #0077BA (Ocean Blue) ← Default
300: #21C6E3 (Aqua)
100: #E8FAFF (Sky)
```

### Neutral Colors

Carefully balanced grays:

```
900: #0D1B2A (Darkest)
700: #1E2D3A (Dark)
500: #A7B2B7 (Medium)
300: #D7DFE2 (Light)
100: #F3F6F7 (Lightest)
White: #FFFFFF
```

### Semantic Colors

Status and feedback colors:

```
Success: #30C39E (Eco Green)
Warning: #FFCF5C (Warm Yellow)
Error: #D64550 (Coral Red)
```

### Gradients

Beautiful gradients for special effects:

```
Kerama Depth: Linear 135deg, Aqua → Ocean → Navy
Shallow Reef: Linear 145deg, Light → Aqua
Okinawa Dawn: Linear 140deg, Ocean → Coral
```

## Tokens API

### Available Exports

```typescript
import {
  tokens,        // All design tokens
  palette,       // Organized color palette
  gradients,     // Gradient definitions
  radii,         // Border radius values
  spacing,       // Spacing scale
  opacity,       // Opacity levels
  theme,         // Default theme colors
  cn,            // Class name utility
} from '@kuroshio/styles';
```

### Tokens Structure

```typescript
tokens.brand          // Primary colors
tokens.neutral        // Gray colors
tokens.accent         // Eco, coral, sand
tokens.semantic       // Success, warning, error
tokens.gradient       // Named gradients
tokens.radii          // Border radius values
tokens.spacing        // Spacing scale
tokens.opacity        // Opacity levels
```

## Tailwind Integration

### In your `tailwind.config.js`

```javascript
const kuroshioConfig = require('@kuroshio/styles/tailwind');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/@kuroshio/ui/dist/**/*.js',
  ],
  theme: {
    extend: kuroshioConfig.theme.extend,
  },
  plugins: kuroshioConfig.plugins,
};
```

### Using in CSS

```tailwindcss
/* Colors */
.text-primary-900 { color: #003A63; }
.bg-primary-500 { background-color: #0077BA; }
.border-neutral-300 { border-color: #D7DFE2; }

/* Semantics */
.text-success-500 { color: #30C39E; }
.bg-warning-100 { background-color: #FFF6E1; }

/* Gradients */
.bg-gradient-kerama { background: linear-gradient(...); }

/* Spacing */
.p-md { padding: 16px; }
.gap-lg { gap: 32px; }

/* Border Radius */
.rounded-md { border-radius: 8px; }

/* Opacity */
.opacity-medium { opacity: 0.15; }
```

## Documentation

- [Design Tokens Reference](./TOKENS.md) - Detailed token documentation
- [Main Design System README](../README.md)
- [Package Details](../PACKAGES.md)

## Contributing

To add new tokens or modify existing ones:

1. Update `packages/styles/src/tokens.ts`
2. Update `packages/styles/tailwind.config.js`
3. Document changes in `TOKENS.md`
4. Submit a pull request

## License

MIT - See [LICENSE](../../LICENSE) for details
