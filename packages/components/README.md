# @kuroshio-lab/components

Domain-specific React components for the Kuroshio Lab marine observation platform. Built on top of `@kuroshio-lab/ui` primitives with Tailwind CSS and a dark glass-morphism design language.

## Installation

```bash
npm install @kuroshio-lab/components
```

### Peer dependencies

```bash
npm install react react-dom @kuroshio-lab/ui
```

---

## Components

### Observation

#### `ObservationCard`

Full-detail card for displaying a single observation with metadata, image, and actions.

```tsx
import { ObservationCard } from "@kuroshio-lab/components";

<ObservationCard
  observation={obs}
  onSelectObservation={(obs) => {}}
  onDeleteObservation={(id) => {}}
  onEditObservationClick={(obs) => {}}
/>;
```

| Prop                     | Type                         | Required |
| ------------------------ | ---------------------------- | -------- |
| `observation`            | `Observation`                | Yes      |
| `onSelectObservation`    | `(obs: Observation) => void` | Yes      |
| `onDeleteObservation`    | `(id: number) => void`       | Yes      |
| `onEditObservationClick` | `(obs: Observation) => void` | Yes      |
| `className`              | `string`                     | No       |

> **Note:** Action labels ("Edit", "Delete"), emoji icons, and data field labels are currently hardcoded. Customisable labels will be added in a future release.

---

#### `MiniObservationCard`

Compact card variant, intended for use in map popups.

```tsx
import { MiniObservationCard } from "@kuroshio-lab/components";

<MiniObservationCard observation={obs} />;
```

| Prop          | Type          | Required |
| ------------- | ------------- | -------- |
| `observation` | `Observation` | Yes      |

> **Note:** Field labels and emoji prefixes (depth, temperature, visibility, etc.) are currently hardcoded.

---

#### `ObservationModal`

Portal-based modal for creating or editing an observation. Includes full Zod-validated form.

```tsx
import ObservationModal from "@kuroshio-lab/components";

<ObservationModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onObservationUpserted={() => refetch()}
  mode="add"
/>;
```

| Prop                     | Type                                            | Required | Default |
| ------------------------ | ----------------------------------------------- | -------- | ------- |
| `isOpen`                 | `boolean`                                       | Yes      |         |
| `onClose`                | `() => void`                                    | Yes      |         |
| `onObservationUpserted`  | `() => void`                                    | Yes      |         |
| `mode`                   | `"add" \| "edit"`                               | Yes      |         |
| `observation`            | `Observation \| null`                           | No       |         |
| `onSubmit`               | `(data: any) => Promise<void>`                  | No       |         |
| `onSpeciesSearch`        | `(q: string) => Promise<SpeciesSearchResult[]>` | No       |         |
| `SpeciesSearchComponent` | `React.ComponentType`                           | No       |         |
| `useUserHook`            | `() => any`                                     | No       |         |

> **Note:** Modal titles, button labels, and field placeholders are currently hardcoded in English. Internationalisation support is planned for a future release.

---

#### `ObservationFilterAndSort`

Dropdown to filter a list of observations by validation status, with automatic sort by date descending.

```tsx
import { ObservationFilterAndSort } from "@kuroshio-lab/components";

<ObservationFilterAndSort
  observations={observations}
  onFilteredObservationsChange={(filtered) => setDisplayed(filtered)}
/>;
```

| Prop                           | Type                                                                | Required |
| ------------------------------ | ------------------------------------------------------------------- | -------- |
| `observations`                 | `Observation[]`                                                     | Yes      |
| `onFilteredObservationsChange` | `(obs: Observation[]) => void`                                      | Yes      |
| `onFilterChange`               | `(filter: "all" \| "validated" \| "pending" \| "rejected") => void` | No       |

> **Note:** Filter option labels are currently hardcoded.

---

### Species

#### `SpeciesSearch`

Debounced autocomplete input for scientific and common species name lookup.

```tsx
import SpeciesSearch from "@kuroshio-lab/components";

<SpeciesSearch
  value={selected}
  onChange={(species) => setSelected(species)}
  onSearch={async (query) => await fetchSpecies(query)}
/>;
```

| Prop          | Type                                                  | Required | Default                   |
| ------------- | ----------------------------------------------------- | -------- | ------------------------- |
| `value`       | `{ speciesName: string; commonName: string } \| null` | No       |                           |
| `onChange`    | `(species: SpeciesSearchResult \| null) => void`      | Yes      |                           |
| `onBlur`      | `() => void`                                          | No       |                           |
| `disabled`    | `boolean`                                             | No       | `false`                   |
| `placeholder` | `string`                                              | No       | `"Search for species..."` |
| `error`       | `boolean`                                             | No       | `false`                   |
| `id`          | `string`                                              | No       |                           |
| `onSearch`    | `(q: string) => Promise<SpeciesSearchResult[]>`       | No       |                           |

Minimum 2 characters required to trigger a search. Supports keyboard navigation (↑ ↓ Enter Escape).

---

### Header

#### `Header`

Main navigation bar with branding, filter controls, export action, and user menu.

```tsx
import Header from "@kuroshio-lab/components";

<Header
  onApplyFilters={(filters) => setFilters(filters)}
  initialFilters={{
    speciesName: null,
    commonName: null,
    minDate: null,
    maxDate: null,
  }}
  onSpeciesSearch={async (q) => await fetchSpecies(q)}
  user={user}
  onLogout={logout}
  onExport={exportData}
  observationCount={42}
/>;
```

| Prop                     | Type                                            | Required |
| ------------------------ | ----------------------------------------------- | -------- |
| `onApplyFilters`         | `(filters: ActiveFilters) => void`              | Yes      |
| `initialFilters`         | `ActiveFilters`                                 | Yes      |
| `onSpeciesSearch`        | `(q: string) => Promise<SpeciesSearchResult[]>` | Yes      |
| `user`                   | `any`                                           | No       |
| `loading`                | `boolean`                                       | No       |
| `onLogout`               | `() => Promise<void>`                           | No       |
| `UserRoleBadgeComponent` | `React.ComponentType`                           | No       |
| `onExport`               | `() => void`                                    | No       |
| `observationCount`       | `number`                                        | No       |

> **Note:** Branding ("Kuroshio-Lab", "Marine Species Observation Tracker"), the tagline, and all button labels are currently hardcoded. These will be made configurable in a future release.

---

### Modals

#### `FilterModal`

Portal modal for filtering observations by species and date range. Embeds `SpeciesSearch`.

```tsx
import FilterModal from "@kuroshio-lab/components";

<FilterModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onApplyFilters={(filters) => setFilters(filters)}
  initialFilters={filters}
  onSearch={async (q) => await fetchSpecies(q)}
/>;
```

| Prop             | Type                                            | Required |
| ---------------- | ----------------------------------------------- | -------- |
| `isOpen`         | `boolean`                                       | Yes      |
| `onClose`        | `() => void`                                    | Yes      |
| `onApplyFilters` | `(filters: ActiveFilters) => void`              | Yes      |
| `initialFilters` | `ActiveFilters`                                 | Yes      |
| `onSearch`       | `(q: string) => Promise<SpeciesSearchResult[]>` | Yes      |

> **Note:** All labels and button text are currently hardcoded.

---

#### `ExportConfirmModal`

Confirmation modal before exporting observations as GeoJSON. Displays active filters and observation count.

```tsx
import ExportConfirmModal from "@kuroshio-lab/components";

<ExportConfirmModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleExport}
  filters={activeFilters}
  observationCount={42}
/>;
```

| Prop               | Type            | Required |
| ------------------ | --------------- | -------- |
| `isOpen`           | `boolean`       | Yes      |
| `onClose`          | `() => void`    | Yes      |
| `onConfirm`        | `() => void`    | Yes      |
| `filters`          | `ActiveFilters` | Yes      |
| `observationCount` | `number`        | No       |

> **Note:** The export format label ("GeoJSON · marine_observations_export.json") and all copy are currently hardcoded.

---

### Loaders

#### `Loader`

Full-screen loading overlay with a default spinner. Accepts a custom loader component.

```tsx
import Loader from '@kuroshio-lab/components';

<Loader isLoading={isLoading} />
// or with custom spinner:
<Loader isLoading={isLoading} LoaderComponent={MySpinner} />
```

| Prop              | Type                  | Required |
| ----------------- | --------------------- | -------- |
| `isLoading`       | `boolean`             | Yes      |
| `LoaderComponent` | `React.ComponentType` | No       |

---

#### `GlobalLoader`

Wrapper around `Loader` that accepts either a hook or a prop for loading state.

```tsx
import GlobalLoader from '@kuroshio-lab/components';

// Hook-based (takes priority)
<GlobalLoader useLoadingHook={useMyLoadingHook} />

// Prop-based
<GlobalLoader isLoading={isLoading} />
```

| Prop              | Type                           | Required | Default |
| ----------------- | ------------------------------ | -------- | ------- |
| `useLoadingHook`  | `() => { isLoading: boolean }` | No       |         |
| `isLoading`       | `boolean`                      | No       | `false` |
| `LoaderComponent` | `React.ComponentType`          | No       |         |

---

### User

#### `UserProvider` + `useUser`

Context provider for authenticated user state. Fetches the current user and handles unauthenticated redirects.

```tsx
import { UserProvider, useUser } from "@kuroshio-lab/components";

// Wrap your app
<UserProvider apiUrl="https://api.example.com" onLogout={logout}>
  <App />
</UserProvider>;

// Consume in any child
const { user, loading, refetchUser, logout } = useUser();
```

**`UserProvider` props**

| Prop          | Type                          | Required |
| ------------- | ----------------------------- | -------- |
| `children`    | `ReactNode`                   | Yes      |
| `apiUrl`      | `string`                      | No       |
| `onFetchUser` | `() => Promise<User \| null>` | No       |
| `onLogout`    | `() => Promise<void>`         | No       |

**`useUser()` return value**

| Key           | Type                  |
| ------------- | --------------------- |
| `user`        | `User \| null`        |
| `loading`     | `boolean`             |
| `refetchUser` | `() => void`          |
| `logout`      | `() => Promise<void>` |

> **Note:** The redirect path (`/sign-in`) and excluded auth routes are currently hardcoded.

---

#### `UserRoleBadge`

Displays a user's role with a colour-coded badge and icon.

```tsx
import UserRoleBadge from "@kuroshio-lab/components";

<UserRoleBadge user={user} variant="inline" />;
```

| Prop      | Type                              | Required | Default  |
| --------- | --------------------------------- | -------- | -------- |
| `user`    | `User`                            | Yes      |          |
| `variant` | `"compact" \| "full" \| "inline"` | No       | `"full"` |

Role mapping:

| Role                       | Label        | Style   |
| -------------------------- | ------------ | ------- |
| `hobbyist`                 | Observer     | Neutral |
| `researcher_pending`       | Under Review | Warning |
| `researcher_community`     | Can Validate | Success |
| `researcher_institutional` | Full Access  | Primary |

> **Note:** Role labels are currently hardcoded.

---

#### `UserObservationSection`

Full container component combining a map, observation list, filter/sort, and add/edit modal.

```tsx
import UserObservationSection from "@kuroshio-lab/components";

<UserObservationSection
  filterSpeciesName={filters.speciesName}
  filterCommonName={filters.commonName}
  filterMinDate={filters.minDate}
  filterMaxDate={filters.maxDate}
  onFetchObservations={fetchObservations}
  onDeleteObservation={deleteObservation}
  onCreateObservation={createObservation}
  onUpdateObservation={updateObservation}
  MapComponent={MyMapComponent}
/>;
```

| Prop                                | Type                                       | Required |
| ----------------------------------- | ------------------------------------------ | -------- |
| `filterSpeciesName`                 | `string \| null`                           | Yes      |
| `filterCommonName`                  | `string \| null`                           | Yes      |
| `filterMinDate`                     | `string \| null`                           | Yes      |
| `filterMaxDate`                     | `string \| null`                           | Yes      |
| `className`                         | `string`                                   | No       |
| `ObservationModalComponent`         | `React.ComponentType`                      | No       |
| `ObservationCardComponent`          | `React.ComponentType`                      | No       |
| `ObservationFilterAndSortComponent` | `React.ComponentType`                      | No       |
| `LoaderComponent`                   | `React.ComponentType`                      | No       |
| `MapComponent`                      | `React.ComponentType`                      | No       |
| `onFetchObservations`               | `() => Promise<Observation[]>`             | No       |
| `onDeleteObservation`               | `(id: number) => Promise<void>`            | No       |
| `onUpdateObservation`               | `(id: number, data: any) => Promise<void>` | No       |
| `onCreateObservation`               | `(data: any) => Promise<void>`             | No       |

> **Note:** Section heading ("Your Observations"), status messages, and the "Add Observation" button label are currently hardcoded. These will be made configurable in a future release.

---

## Exported types

```ts
import type {
  Observation,
  SpeciesSearchResult,
  ActiveFilters,
  User,
  FormField,
} from "@kuroshio-lab/components";
```

---

## Design language

All components use a dark glass-morphism theme. They are not designed to support light mode at this time. Colour semantics follow a consistent pattern across components:

| Meaning             | Colour          |
| ------------------- | --------------- |
| Validated / Success | Green           |
| Pending / Warning   | Yellow / Orange |
| Rejected / Error    | Red             |
| Primary action      | Blue / Indigo   |

---

## Development

```bash
# From repo root
npm run dev              # Watch all packages
cd packages/components
npm run build            # Build this package only
```

See the root [DEVELOPMENT.md](../../DEVELOPMENT.md) for full monorepo setup instructions.
