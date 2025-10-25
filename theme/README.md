# @visualizevalue/vveb-layer-theme

A Nuxt theming layer extending `@visualizevalue/vveb-layer-base` with VisualizeValue-specific styling, dark mode support, and branded components.

## Features

- **Automatic Dark Mode**: Intelligent light/dark theme switching with z-index color system
- **VV Brand Components**: Logo, icons, and styled UI elements
- **DM Sans Typography**: Modern font family with variable weight support
- **Feather Icons**: 280+ beautiful icons via vue-feather
- **Smart Color System**: CSS variables that automatically adapt to light/dark mode
- **Extends Base Layer**: Inherits all components, composables, and utilities from base layer

## Installation

```bash
pnpm add @visualizevalue/vveb-layer-theme @visualizevalue/vveb-layer-base
```

Add to your Nuxt config:

```ts
export default defineNuxtConfig({
  // Theme layer automatically extends base layer
  extends: ['@visualizevalue/vveb-layer-theme'],
})
```

## Components

### Branding
- **`<VV>`**: VisualizeValue logo component
- **`<DefaultAvatar>`**: Default user avatar component

### UI Elements
- **`<Icon>`**: Feather icon wrapper component (extends base Icon)
  ```vue
  <Icon name="check" />
  <Icon name="arrow-right" />
  <Icon name="heart" />
  ```

### Theme Controls
- **`<ToggleDarkMode>`** (client-only): Dark/light mode toggle button

## Dark Mode System

The theme layer uses an innovative "z-index" color system that automatically flips between light and dark modes:

### Color Z-Index Scale

Colors are defined from background (z-0) to foreground (z-10):

```css
/* Light Mode */
--gray-z-0   /* gray-50  - Background */
--gray-z-1   /* gray-100 */
--gray-z-2   /* gray-200 */
...
--gray-z-10  /* gray-950 - Foreground text */

/* Dark Mode (automatically flipped) */
--gray-z-0   /* gray-950 - Background */
--gray-z-1   /* gray-900 */
--gray-z-2   /* gray-800 */
...
--gray-z-10  /* gray-50  - Foreground text */
```

### Using Dark Mode Colors

```css
.card {
  background: var(--gray-z-0); /* Always correct background */
  color: var(--gray-z-10);      /* Always correct text */
  border: 1px solid var(--gray-z-2);
}
```

This approach means you write your CSS once, and it automatically adapts to both themes without media queries or duplicate styles.

### Toggle Dark Mode

```vue
<template>
  <ToggleDarkMode />
</template>
```

The toggle automatically saves user preference to localStorage and applies the theme system-wide.

## Typography

The theme includes **DM Sans** as the primary font family:

```css
body {
  font-family: var(--font-sans); /* DM Sans */
}
```

Font weights available: 100-900 (variable font)

## Icons

Use Feather icons throughout your app:

```vue
<template>
  <Icon name="check" />
  <Icon name="x" />
  <Icon name="arrow-right" />
  <Icon name="settings" />
  <Icon name="user" />
</template>
```

[Browse all 280+ Feather icons](https://feathericons.com/)

## Color Palette

The theme extends the base color system with VV-specific colors:

```css
/* Brand colors */
--color-vv-primary
--color-vv-accent

/* Z-index gray scale (auto-flips in dark mode) */
--gray-z-0 through --gray-z-10

/* Standard colors */
--color-white
--color-black
--color-error
--color-success
--color-warning
```

## Styling Architecture

### CSS Load Order

The theme carefully manages CSS load order:

1. Theme-specific variables (`theme/app/assets/variables.css`)
2. Dark mode system (`theme/app/assets/light-dark.css`)
3. Font loading (`theme/app/assets/fonts.css`)
4. Base layer styles (inherited)

### Component Styles

Theme layer components have their own styles that build on base layer foundations:

- `components/Icon.vue` - Icon styling
- `components/VV.vue` - Logo styling
- `components/ToggleDarkMode.client.vue` - Theme toggle styling

## Configuration

The layer includes:

- **Nuxt 4**: App directory structure
- **Base Alias**: `@base` points to `@visualizevalue/vveb-layer-base`
- **Optimizations**: Vite optimizes vue-feather for faster dev/build

## Development

```bash
# Install dependencies
pnpm install

# Run playground (extends theme + base)
cd theme && pnpm dev

# Type check
cd theme && pnpm typecheck

# Build playground
cd theme && pnpm build

# Generate static site
cd theme && pnpm generate
```

## Using with Base Layer

Since the theme extends the base layer, you get access to ALL base layer features:

```vue
<template>
  <!-- Base layer components -->
  <Card>
    <Button>Click me</Button>
    <Modal v-model:open="isOpen">
      <Calendar v-model="selectedDate" />
    </Modal>
  </Card>

  <!-- Theme layer components -->
  <VV />
  <Icon name="heart" />
  <ToggleDarkMode />
</template>

<script setup>
// Base layer composables
import { useTimeSince, formatDate } from '#imports'

// Base layer utilities
import { pluralize, cleanText } from '#imports'

// All auto-imported and available
</script>

<style>
/* Theme layer colors (auto dark mode) */
.element {
  background: var(--gray-z-0);
  color: var(--gray-z-10);
}

/* Base layer media queries */
@media (--md) {
  /* Styles for medium screens and up (720px+) */
}
</style>
```

## Stack

- **Nuxt**: 4.2.0
- **Base Layer**: @visualizevalue/vveb-layer-base
- **DM Sans**: Variable font (weights 100-900)
- **vue-feather**: 2.0.0 (280+ Feather icons)
- **opepen-standard**: 1.0.1 (TypeScript types)

## License

MIT
