# @kuroshio-lab/ui

Radix UI-based primitive components for the Kuroshio Lab design system. Unstyled Radix primitives wrapped with Tailwind CSS, ref forwarding, and consistent design tokens.

## Installation

```bash
npm install @kuroshio-lab/ui
```

### Peer dependencies

```bash
npm install react react-dom
```

---

## Components

### Button

Polymorphic button with twelve style variants and four sizes. Supports `asChild` for composition with custom elements (e.g. router links).

```tsx
import { Button } from '@kuroshio-lab/ui/button';

<Button variant="default" size="default">Click me</Button>

// Compose with a router link
<Button asChild variant="ghost">
  <a href="/home">Home</a>
</Button>
```

**Props**

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`.

| Prop | Type | Default |
|---|---|---|
| `variant` | see below | `"default"` |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` |
| `asChild` | `boolean` | `false` |

**Variants**

| Variant | Description |
|---|---|
| `default` | Blue primary |
| `destructive` | Red danger |
| `outline` | Border, no fill |
| `secondary` | Gray secondary |
| `ghost` | No background, accent on hover |
| `link` | Text with underline |
| `edit` | Brand cyan-blue with gradient hover |
| `delete` | Coral with cyan gradient hover |
| `addingObs` | Ocean-depth multi-colour gradient |
| `actions` | Dark primary |
| `signOut` | Neutral semi-transparent |
| `glass` | Frosted glass (white/10 bg) |
| `glassDanger` | Frosted glass with coral danger on hover |

**Exports**: `Button`, `buttonVariants`

---

### Badge

Inline label for status or category display.

```tsx
import { Badge } from '@kuroshio-lab/ui/badge';

<Badge variant="secondary">Pending</Badge>
```

**Props**

Extends `React.HTMLAttributes<HTMLDivElement>`.

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline"` | `"default"` |

**Exports**: `Badge`, `badgeVariants`

---

### Card

Composable card layout with header, content, and footer sub-components.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@kuroshio-lab/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

All sub-components extend `React.HTMLAttributes<HTMLDivElement>` and support refs.

**Exports**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

---

### Dialog

Modal dialog built on `@radix-ui/react-dialog`. `DialogContent` includes a built-in close button (X icon, top-right).

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@kuroshio-lab/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <p>Body content</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Exports**: `Dialog`, `DialogPortal`, `DialogOverlay`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

---

### Form

Type-safe form primitives built on `react-hook-form` with automatic ARIA wiring and error display.

```tsx
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@kuroshio-lab/ui/form';
import { Input } from '@kuroshio-lab/ui/input';

const form = useForm<{ email: string }>();

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="you@example.com" {...field} />
          </FormControl>
          <FormDescription>We'll never share your email.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

`FormControl` automatically sets `id`, `aria-describedby`, and `aria-invalid` from the field context. `FormMessage` renders the field error or falls back to `children`.

**Exports**: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`

---

### Input

Styled native `<input>` element.

```tsx
import { Input } from '@kuroshio-lab/ui/input';

<Input type="email" placeholder="you@example.com" />
```

Extends `React.ComponentProps<"input">`. Supports refs.

**Exports**: `Input`

---

### Label

Accessible label built on `@radix-ui/react-label`. Automatically pairs with disabled peer elements.

```tsx
import { Label } from '@kuroshio-lab/ui/label';

<Label htmlFor="email">Email address</Label>
```

Extends `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>`. Supports refs.

**Exports**: `Label`

---

### Select

Dropdown select built on `@radix-ui/react-select`. `SelectTrigger` includes a built-in chevron icon. `SelectContent` wraps in a portal with scroll buttons.

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from '@kuroshio-lab/ui/select';

<Select onValueChange={(val) => console.log(val)}>
  <SelectTrigger>
    <SelectValue placeholder="Pick one…" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>
```

**Exports**: `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`

---

### ScrollArea

Scrollable container with a custom scrollbar, built on `@radix-ui/react-scroll-area`.

```tsx
import { ScrollArea, ScrollBar } from '@kuroshio-lab/ui/scroll-area';

<ScrollArea className="h-64 w-full">
  <div>{/* long content */}</div>
  <ScrollBar orientation="vertical" />
</ScrollArea>
```

`ScrollArea` renders a vertical `ScrollBar` by default. Add a second `ScrollBar` with `orientation="horizontal"` for two-axis scrolling.

**Exports**: `ScrollArea`, `ScrollBar`

---

### Separator

Horizontal or vertical divider, built on `@radix-ui/react-separator`. Decorative by default.

```tsx
import { Separator } from '@kuroshio-lab/ui/separator';

<Separator />
<Separator orientation="vertical" />
```

Extends `React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>`. Supports refs.

| Prop | Type | Default |
|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `decorative` | `boolean` | `true` |

**Exports**: `Separator`

---

### Textarea

Styled native `<textarea>` element.

```tsx
import { Textarea } from '@kuroshio-lab/ui/textarea';

<Textarea placeholder="Write something…" rows={4} />
```

Extends `React.ComponentProps<"textarea">`. Supports refs.

**Exports**: `Textarea`

---

## Import paths

Each component has a granular export path, avoiding full-package imports:

```ts
import { Button }     from '@kuroshio-lab/ui/button';
import { Badge }      from '@kuroshio-lab/ui/badge';
import { Card, … }   from '@kuroshio-lab/ui/card';
import { Dialog, … } from '@kuroshio-lab/ui/dialog';
import { Form, … }   from '@kuroshio-lab/ui/form';
import { Input }      from '@kuroshio-lab/ui/input';
import { Label }      from '@kuroshio-lab/ui/label';
import { Select, … } from '@kuroshio-lab/ui/select';
import { ScrollArea } from '@kuroshio-lab/ui/scroll-area';
import { Separator }  from '@kuroshio-lab/ui/separator';
import { Textarea }   from '@kuroshio-lab/ui/textarea';
```

Or import everything from the main entry:

```ts
import { Button, Input, … } from '@kuroshio-lab/ui';
```

---

## Design patterns

- **Ref forwarding** — all components except `Badge` support `ref`.
- **`asChild`** — `Button` and `DialogTrigger` support `asChild` via Radix `Slot` for polymorphic composition.
- **`cn()` utility** — all components use `cn()` from `@kuroshio-lab/styles` for safe Tailwind class merging; pass a `className` prop to override or extend any component's styles.
- **Accessibility** — ARIA roles and attributes are handled by Radix primitives; `Form` wires `aria-invalid` and `aria-describedby` automatically.

---

## Development

```bash
# From repo root
npm run dev              # Watch all packages
cd packages/ui
npm run build            # Build this package only
```

See the root [DEVELOPMENT.md](../../DEVELOPMENT.md) for full monorepo setup instructions.
