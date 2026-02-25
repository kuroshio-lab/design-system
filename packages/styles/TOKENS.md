# Design Tokens

Complete design tokens for the Kuroshio Lab design system, including colors, spacing, radius, and other values.

## Import

```typescript
import {
  tokens,
  palette,
  gradients,
  radii,
  spacing,
  opacity,
  theme,
} from "@kuroshio-lab/styles";
```

## Colors

### Brand Colors (Primary - Ocean Depths)

Deep ocean-inspired primary colors from dark navy to bright aqua.

```typescript
// JavaScript
import { palette } from "@kuroshio-lab/styles";

const primaryColor = palette.primary[500]; // #0077BA
```

```tailwindcss
<!-- Tailwind CSS -->
<div class="bg-primary-500 text-primary-900">Ocean Depths</div>
```

| Level | Hex     | Name     | Use Case                      |
| ----- | ------- | -------- | ----------------------------- |
| 900   | #003A63 | Darkest  | Headings, Dark backgrounds    |
| 700   | #005A8D | Dark     | Interactive elements, Borders |
| 500   | #0077BA | Primary  | Buttons, Links, Key UI        |
| 300   | #21C6E3 | Light    | Accents, Hover states         |
| 100   | #E8FAFF | Lightest | Backgrounds, Light accents    |

### Neutral Colors (Grays)

Carefully balanced grays for text, backgrounds, and borders.

```typescript
import { palette } from "@kuroshio-lab/styles";

const textColor = palette.neutral["gray-900"]; // #0D1B2A
const backgroundColor = palette.neutral["gray-100"]; // #F3F6F7
```

| Level | Hex     | Name       | Use Case                          |
| ----- | ------- | ---------- | --------------------------------- |
| 900   | #0D1B2A | Darkest    | Body text                         |
| 700   | #1E2D3A | Dark       | Secondary text                    |
| 500   | #A7B2B7 | Medium     | Placeholder text, Disabled states |
| 300   | #D7DFE2 | Light      | Borders, Dividers                 |
| 100   | #F3F6F7 | Lightest   | Backgrounds, Cards                |
| White | #FFFFFF | Pure White | Text background, Paper            |

### Accent Colors

Eco-friendly and coastal accents.

```typescript
import { palette } from "@kuroshio-lab/styles";

const ecoColor = palette.accent["eco-500"]; // #30C39E
const coralColor = palette.accent["coral-500"]; // #FF6F59
```

| Color | Hex     | Use Case                 |
| ----- | ------- | ------------------------ |
| Eco   | #30C39E | Positive actions, Growth |
| Coral | #FF6F59 | Attention, Warm accents  |
| Sand  | #F5F2E9 | Warm backgrounds         |

### Semantic Colors

Functional colors for status and feedback.

```typescript
import { palette } from "@kuroshio-lab/styles";

const success = palette.success[500]; // #30C39E
const warning = palette.warning[500]; // #FFCF5C
const error = palette.error[500]; // #D64550
```

**Success**

- 500: #30C39E
- 100: #E6F7F3

**Warning**

- 500: #FFCF5C
- 100: #FFF6E1

**Error**

- 500: #D64550
- 100: #FDECEE

## Gradients

Beautiful gradients inspired by ocean landscapes.

```typescript
import { gradients } from "@kuroshio-lab/styles";

const gradient = gradients["kerama-depth"];
// "linear-gradient(135deg, #21C6E3 0%, #0077BA 60%, #003A63 100%)"
```

```tailwindcss
<!-- Tailwind CSS -->
<div class="bg-gradient-kerama">Kerama Depth</div>
<div class="bg-gradient-reef">Shallow Reef</div>
<div class="bg-gradient-dawn">Okinawa Dawn</div>
```

| Name         | Direction | Use Case                        |
| ------------ | --------- | ------------------------------- |
| kerama-depth | 135deg    | Hero sections, Rich backgrounds |
| shallow-reef | 145deg    | Light overlays, Soft accents    |
| okinawa-dawn | 140deg    | Dramatic sections, Transitions  |

**Kerama Depth**

```
135deg, #21C6E3 → #0077BA → #003A63
(Light Aqua → Deep Ocean → Navy)
```

**Shallow Reef**

```
145deg, #E8FAFF → #21C6E3
(Light Sky → Bright Aqua)
```

**Okinawa Dawn**

```
140deg, #0077BA → #FF6F59
(Ocean Blue → Coral)
```

## Spacing

Consistent spacing scale based on 4px base unit.

```typescript
import { spacing } from "@kuroshio-lab/styles";

const padding = spacing.md; // "16px"
```

```tailwindcss
<!-- Tailwind CSS -->
<div class="p-md m-lg">Content</div>
```

| Name | Value | Pixels |
| ---- | ----- | ------ |
| xs   | 4px   | 4      |
| sm   | 8px   | 8      |
| md   | 16px  | 16     |
| lg   | 32px  | 32     |

## Border Radius

Rounded corner values for consistency.

```typescript
import { radii } from "@kuroshio-lab/styles";

const rounded = radii.md; // "8px"
```

```tailwindcss
<!-- Tailwind CSS -->
<div class="rounded-sm">Rounded</div>
<div class="rounded-md">More Rounded</div>
<div class="rounded-lg">Very Rounded</div>
```

| Name | Value |
| ---- | ----- |
| sm   | 4px   |
| md   | 8px   |
| lg   | 16px  |

## Opacity

Opacity levels for layering and transparency.

```typescript
import { opacity } from "@kuroshio-lab/styles";

const lightOpacity = opacity.light; // 0.05
const strongOpacity = opacity.strong; // 0.3
```

| Name   | Value | Use Case                         |
| ------ | ----- | -------------------------------- |
| light  | 0.05  | Subtle overlays                  |
| medium | 0.15  | Moderate overlays                |
| strong | 0.3   | Strong overlays, Disabled states |

## Using in Components

### TypeScript

```typescript
import { tokens, palette, theme } from "@kuroshio-lab/styles";

// Use theme for component defaults
const buttonColor = theme.colors.primary; // #0077BA

// Access specific palettes
const heading = palette.primary[900];
const text = palette.neutral["gray-900"];

// Use tokens directly
const border = tokens.radii.md;
```

### CSS-in-JS

```typescript
import { palette, gradients } from "@kuroshio-lab/styles";

const styles = {
  button: {
    background: palette.primary[500],
    color: palette.neutral.white,
    borderRadius: "8px",
    padding: "8px 16px",
  },
  hero: {
    background: gradients["kerama-depth"],
  },
};
```

### Tailwind CSS

```jsx
function Button() {
  return (
    <button className="bg-primary-500 text-white rounded-md px-md py-sm">
      Click me
    </button>
  );
}
```

### CSS

```css
.button {
  background-color: #0077ba; /* primary-500 */
  color: #ffffff;
  border-radius: 8px;
  padding: 8px 16px;
}

.hero {
  background: linear-gradient(135deg, #21c6e3 0%, #0077ba 60%, #003a63 100%);
}
```

## Color Combinations

### Recommended Pairings

**Primary with Neutrals**

```
Text: primary-900 on neutral-100 background
Links: primary-500 on white background
Hover: primary-700 state
```

**Accent Actions**

```
Success: eco-500 background, eco-500 text on eco-100
Warning: warning-500 background, warning-500 text on warning-100
Error: error-500 background, error-500 text on error-100
```

**Dark Mode (Future)**

```
Background: gray-900
Text: gray-100
Primary: primary-300 (lighter variant)
```

## Accessibility

All color combinations meet WCAG AA contrast requirements:

- Text on backgrounds: 4.5:1 minimum contrast
- UI components: 3:1 minimum contrast
- Semantic colors work for colorblind users

## Customization

To override tokens in your project:

```tailwindcss
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#YOUR_COLOR',
        },
      },
    },
  },
};
```

Or in TypeScript:

```typescript
import { palette } from "@kuroshio-lab/styles";

// Extend palette
const customTheme = {
  ...palette,
  custom: {
    special: "#ABC123",
  },
};
```

## Resources

- [Color Theory](https://www.interaction-design.org/literature/topics/color-theory)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind Color Reference](https://tailwindcss.com/docs/customizing-colors)
