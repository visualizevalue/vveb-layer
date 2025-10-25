# @visualizevalue/vveb-layer-base

A foundational Nuxt layer providing headless UI components, composables, and utilities for building modern web applications.

## Features

- **Headless UI Components**: Accessible, unstyled components built with Reka UI and Headless UI
- **Modern PostCSS Pipeline**: Custom properties, mixins, nested CSS, and responsive utilities
- **Type-Safe Utilities**: Date formatting, string manipulation, and random generators
- **Vue Composables**: Base URL handling, breakpoint detection, and time utilities
- **Auto-imports**: Luxon's DateTime automatically available

## Installation

```bash
pnpm add @visualizevalue/vveb-layer-base
```

Add to your Nuxt config:

```ts
export default defineNuxtConfig({
  extends: ['@visualizevalue/vveb-layer-base'],
})
```

## Components

### Layout & Structure
- **`<Card>`**: Container component for content cards
- **`<CardLink>`**: Linkable card component
- **`<Actions>`**: Action button group container

### UI Elements
- **`<Button>`**: Accessible button component
- **`<Icon>`**: Icon wrapper component
- **`<Image>`**: Optimized image component with lazy loading
- **`<Loading>`**: Loading state indicator

### Forms & Inputs
- **`<NumberField>`**: Accessible number input with increment/decrement
- **`<Calendar>`**: Date picker calendar component

### Overlays & Modals
- **`<Modal>`**: Modal dialog component
- **`<Dialog>`** (client-only): Headless dialog wrapper
- **`<Popover>`**: Popover/tooltip component
- **`<Dropdown>`** (client-only): Dropdown menu component
- **`<Alert>`**: Alert/notification component
- **`<Confirm>`**: Confirmation dialog

### Content
- **`<Embed>`**: Responsive embed wrapper (videos, iframes)
- **`<ExpandableText>`**: Text with show more/less functionality
- **`<Table>`**: Table component with sorting and styling
- **`<PaginatedContent>`**: Content pagination component

## Composables

### `useBaseURL()`
Returns the base URL for the application.

```ts
const baseURL = useBaseURL()
```

### `useWindowBreakpoints()`
Responsive breakpoint detection using VueUse:

```ts
const breakpoints = useWindowBreakpoints()

// Check specific breakpoints
if (breakpoints.smaller('md').value) {
  // Styles for screens smaller than 720px
}

if (breakpoints.greaterOrEqual('lg').value) {
  // Styles for screens 1024px and above
}
```

Available breakpoints: `xs` (384px), `sm` (432px), `md` (720px), `lg` (1024px)

### Time Utilities

```ts
// Reactive seconds counter
const now = useSeconds()

// Countdown timer
const countdown = useCountDown(secondsRef)
console.log(countdown.str.value) // "2d 3h 45m 10s"

// Time ago with auto-updates
const ago = useSecondsAgo(isoDateRef)
// Returns: "2 hr ago", "3 days ago", etc.

// Helper functions
const thirtyDays = daysInSeconds(30)
const timestamp = nowInSeconds()
const utcDate = asUTCDate(new Date())
```

## Utilities

### Date Formatting (`dates.ts`)

```ts
import { formatDate, formatDateUTC, formatDateTime, formatTime, timeAgo } from '#imports'

formatDate('2025-01-15T12:00:00Z') // "Jan 15, 2025"
formatDateUTC('2025-01-15T12:00:00Z') // "Jan 15, 2025" (UTC)
formatDateTime('2025-01-15T15:45:00Z') // "Jan 15, 2025, 3:45 PM"
formatTime('2025-01-15T15:45:00Z') // "3:45 PM"
timeAgo('2025-01-15T12:00:00Z') // "2 hr ago" or "Jan 15, 2025" if >2 days
```

**Note**: All functions accept ISO date strings, not Date objects.

### String Manipulation (`strings.ts`)

```ts
import { pluralize, cleanText, shortenedCleanText, extractURLs, sanitizeForJson } from '#imports'

// Pluralize words
pluralize('item', 5) // "items"
pluralize('item', 1) // "item"
pluralize('party', 2) // "parties"
pluralize('box', 3) // "boxes"

// Clean HTML and whitespace
cleanText('  <p>Hello</p>\n\n<div>World</div>  ') // "Hello World"

// Shorten and clean text
shortenedCleanText('<p>Long text here...</p>', 50) // "Long text here..."

// Extract URLs
const result = extractURLs('Check out https://example.com for more')
// result.urls: ['https://example.com']
// result.text: 'Check out  for more'

// Sanitize strings for JSON
sanitizeForJson('Hello "world"') // 'Hello \\"world\\"'
```

### Random Utilities (`random.ts`)

```ts
import { getRandomArbitrary, getRandomInt } from '#imports'

// Random float between min (inclusive) and max (exclusive)
getRandomArbitrary(1.5, 10.5) // e.g., 7.234

// Random integer between min and max (both inclusive)
getRandomInt(1, 10) // e.g., 7
```

## Styling

### CSS Custom Properties

The layer provides a comprehensive set of CSS variables:

```css
/* Colors */
--color-primary
--color-secondary
--color-accent

/* Spacing */
--space-xs through --space-6xl

/* Typography */
--font-sans
--font-mono
--font-size-xs through --font-size-6xl

/* Borders */
--border-radius
--border-width
```

### PostCSS Features

**Custom Media Queries**:
```css
@media (--xs) { /* min-width: 24rem (384px) */ }
@media (--sm) { /* min-width: 27rem (432px) */ }
@media (--md) { /* min-width: 45rem (720px) */ }
@media (--lg) { /* min-width: 64rem (1024px) */ }
```

**Mixins**:
```css
.element {
  @mixin card; /* Apply card styling */
  @mixin button; /* Apply button styling */
}
```

**Custom Selectors**:
```css
:--heading { /* h1, h2, h3, h4, h5, h6 */ }
:--interactive { /* a, button, input, select */ }
```

### Global Styles

The layer includes:
- `normalize.css`: CSS reset
- `base.css`: Base element styles
- `forms.css`: Form element styling
- `prose.css`: Typography styles for content
- `cards.css`: Card component patterns
- `utils.css`: Utility classes

## Configuration

The layer uses Nuxt 4's app directory structure and includes:

- **Auto-imports**: `DateTime` from Luxon
- **Modules**: `@vueuse/nuxt`, `reka-ui/nuxt`
- **TypeScript**: Strict type checking enabled
- **Nitro**: `node-cluster` preset for production

## Development

```bash
# Install dependencies
pnpm install

# Run playground
cd base && pnpm dev

# Type check
cd base && pnpm typecheck

# Build playground
cd base && pnpm build

# Generate static site
cd base && pnpm generate
```

## Stack

- **Nuxt**: 4.2.0
- **Vue**: 3.x
- **Reka UI**: 2.2.1 (Headless components)
- **@headlessui/vue**: 1.7.23
- **@vueuse/components**: 13.5.0
- **Luxon**: 3.5.0 (Date/time)
- **PostCSS**: Custom properties, mixins, nested CSS

## License

MIT
