# @kuroshio-lab/styles

Foundation layer of the Kuroshio Lab design system. Provides the `cn()` utility, design tokens, Tailwind CSS theme extensions, and PostCSS configuration consumed by `@kuroshio-lab/ui` and `@kuroshio-lab/components`.

## Installation

```bash
npm install @kuroshio-lab/styles
```

---

## Exports

The package exposes three entry points:

| Import path                     | Contents                           |
| ------------------------------- | ---------------------------------- |
| `@kuroshio-lab/styles`          | `cn()` utility + all design tokens |
| `@kuroshio-lab/styles/tailwind` | Tailwind configuration object      |
| `@kuroshio-lab/styles/postcss`  | PostCSS configuration object       |

---

## `cn()` utility

A lightweight class-merging helper used across every component in the design system.

```ts
import { cn } from "@kuroshio-lab/styles";

cn("base-class", isActive && "active", undefined, "another-class");
// → "base-class active another-class"
```

Accepts any number of `string | undefined | null | false` arguments. Falsy values are filtered out and the remaining strings are joined with spaces.

---

## Design tokens

```ts
import {
  tokens,
  palette,
  gradients,
  spacing,
  radii,
  opacity,
  theme,
} from "@kuroshio-lab/styles";
```

For the full token reference see [TOKENS.md](./TOKENS.md).

### Colors

**Brand (ocean blue)**

| Token                         | Value     | Name       |
| ----------------------------- | --------- | ---------- |
| `tokens.brand['primary-900']` | `#003A63` | Navy       |
| `tokens.brand['primary-700']` | `#005A8D` | Deep Ocean |
| `tokens.brand['primary-500']` | `#0077BA` | Ocean Blue |
| `tokens.brand['primary-300']` | `#21C6E3` | Aqua       |
| `tokens.brand['primary-100']` | `#E8FAFF` | Sky        |

**Neutral grays**

| Token                        | Value     |
| ---------------------------- | --------- |
| `tokens.neutral['gray-900']` | `#0D1B2A` |
| `tokens.neutral['gray-700']` | `#1E2D3A` |
| `tokens.neutral['gray-500']` | `#A7B2B7` |
| `tokens.neutral['gray-300']` | `#D7DFE2` |
| `tokens.neutral['gray-100']` | `#F3F6F7` |

**Accent**

| Token                         | Value                  |
| ----------------------------- | ---------------------- |
| `tokens.accent['eco-500']`    | `#30C39E` (reef green) |
| `tokens.accent['coral-500']`  | `#FF6F59` (warm coral) |
| `tokens.accent['sand-light']` | `#F5F2E9`              |

**Semantic**

| Token                            | Value     |
| -------------------------------- | --------- |
| `tokens.semantic['success-500']` | `#30C39E` |
| `tokens.semantic['success-100']` | `#E6F7F3` |
| `tokens.semantic['warning-500']` | `#FFCF5C` |
| `tokens.semantic['warning-100']` | `#FFF6E1` |
| `tokens.semantic['error-500']`   | `#D64550` |
| `tokens.semantic['error-100']`   | `#FDECEE` |

### Gradients

| Name           | Direction | Stops                    |
| -------------- | --------- | ------------------------ |
| `kerama-depth` | 135deg    | Aqua → Ocean Blue → Navy |
| `shallow-reef` | 145deg    | Sky → Aqua               |
| `okinawa-dawn` | 140deg    | Ocean Blue → Coral       |

### Spacing, radii, opacity

| Category  | Scale                                           |
| --------- | ----------------------------------------------- |
| `spacing` | `xs: 4px` · `sm: 8px` · `md: 16px` · `lg: 32px` |
| `radii`   | `sm: 4px` · `md: 8px` · `lg: 16px`              |
| `opacity` | `light: 0.05` · `medium: 0.15` · `strong: 0.3`  |

---

## Tailwind configuration

Extend your project's Tailwind config with the shared theme:

```js
// tailwind.config.js
const sharedConfig = require("@kuroshio-lab/styles/tailwind");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: sharedConfig.theme.extend,
  },
  plugins: sharedConfig.plugins,
};
```

Or use `presets` to inherit the full config:

```js
const sharedConfig = require("@kuroshio-lab/styles/tailwind");

module.exports = {
  presets: [sharedConfig],
  content: ["./src/**/*.{ts,tsx}"],
};
```

### Theme extensions

**Colors** — available as Tailwind utilities (`bg-`, `text-`, `border-`, etc.)

| Utility                                                 | Tokens               |
| ------------------------------------------------------- | -------------------- |
| `brand-primary-{100,300,500,700,900}`                   | Brand blue scale     |
| `neutral-gray-{100,300,500,700,900}`                    | Gray scale           |
| `accent-eco`                                            | `#30C39E`            |
| `accent-coral`                                          | `#FF6F59`            |
| `accent-sand`                                           | `#F5F2E9`            |
| `semantic-success-{500,100}`                            | Green                |
| `semantic-warning-{500,100}`                            | Yellow               |
| `semantic-error-{500,100}`                              | Red                  |
| `ocean-200`                                             | `#E8FAFF`            |
| Short aliases (`primary`, `eco`, `coral`, `success`, …) | Legacy compatibility |

**Background gradients**

```
bg-gradient-kerama   bg-gradient-reef   bg-gradient-dawn   bg-kerama-depth
```

**Spacing** — `xs`, `sm`, `md`, `lg` added to spacing scale

**Border radius** — `sm`, `md`, `lg` added to radius scale

**Opacity** — `light`, `medium`, `strong` added to opacity scale

**Animations** — `accordion-down` and `accordion-up` keyframes for Radix UI accordion support

### Plugins

- [`tailwindcss-animate`](https://github.com/jamiebuilds/tailwindcss-animate) — animation utilities

---

## PostCSS configuration

```js
// postcss.config.js
module.exports = require("@kuroshio-lab/styles/postcss");
```

The exported config runs Tailwind CSS and Autoprefixer:

```js
{
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

## Package dependency position

`@kuroshio-lab/styles` has no dependencies on other design system packages. It is the base layer:

```
@kuroshio-lab/styles
        ↑
@kuroshio-lab/ui
        ↑
@kuroshio-lab/components
```

---

## Development

```bash
# From repo root
npm run dev              # Watch all packages
cd packages/styles
npm run build            # Build this package only (runs tsc)
```

The compiled output in `dist/` exports `cn()` and all tokens. `tailwind.config.js` and `postcss.config.js` are published as-is (not compiled) so consuming projects can reference them directly as configuration files.

See the root [DEVELOPMENT.md](../../DEVELOPMENT.md) for full monorepo setup instructions.
