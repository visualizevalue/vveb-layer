# AGENTS.md

## Overview

This is a monorepo containing two Nuxt layers for building web applications:

- `@visualizevalue/vveb-layer-base`: Core UI components and utilities
- `@visualizevalue/vveb-layer-theme`: Theming layer with VV-specific styling

The layers are designed to be published to NPM and consumed by Nuxt applications via the `extends` configuration.

## Commands

### Package Manager

This project uses **pnpm** (version 10.7.0). All commands should use pnpm.

### Development

Each layer has its own `.playground` directory for development/testing:

```bash
# Base layer development
cd base && pnpm dev

# Theme layer development
cd theme && pnpm dev
```

The playground extends the parent layer, allowing you to test changes in isolation.

### Building

```bash
# Build base layer playground
cd base && pnpm build

# Build theme layer playground
cd theme && pnpm build

# Generate static site
cd base && pnpm generate
cd theme && pnpm generate
```

### Type Checking

```bash
# Type check base layer
cd base && pnpm typecheck

# Type check theme layer
cd theme && pnpm typecheck
```

### Installing Dependencies

```bash
# Install all workspace dependencies from root
pnpm install

# Install in specific layer
cd base && pnpm install
cd theme && pnpm install
```

## Architecture

### Workspace Structure

The root `package.json` defines pnpm workspace overrides that link the two layers:

- `@visualizevalue/vveb-layer-base` → `link:base`
- `@visualizevalue/vveb-layer-theme` → `link:theme`

The theme layer depends on the base layer via `workspace:^` protocol.

### Base Layer (`base/`)

The foundation layer providing:

- **Components** (`components/`): Headless UI components (Alert, Button, Calendar, Dialog, Dropdown, Image, Modal, Popover, Table, etc.)
- **Composables** (`composables/`): Vue composables (`useBaseURL`, breakpoint utilities, time utilities)
- **Utils** (`utils/`): Pure functions (date formatting, random utilities, string manipulation including `pluralize`, `cleanText`, `extractURLs`)
- **Styles** (`assets/styles/`):
  - CSS custom properties in `variables/` (colors, borders, fonts, sizes, ui, z-index)
  - PostCSS mixins in `mixins/`
  - Global styles (normalize.css, base.css, forms.css, prose.css, cards.css, utils.css)
  - Custom selectors and custom media queries for responsive design

**Key Configuration** (`base/nuxt.config.ts`):

- Integrates `@vueuse/nuxt` and `reka-ui/nuxt` modules
- PostCSS pipeline with mixins, nested CSS, custom selectors/media, preset-env
- Auto-imports `DateTime` from Luxon
- Nitro preset: `node-cluster`

### Theme Layer (`theme/`)

Extends the base layer with VV-specific theming:

- **Components** (`components/`): Theme-specific components (DefaultAvatar, Icon with Feather icons, ToggleDarkMode, VV logo)
- **Styles** (`assets/`):
  - `light-dark.css`: Defines CSS variables for dark/light modes using a "z-index" color system (--gray-z-0 through --gray-z-10 flip between light/dark)
  - `variables.css`: Theme-specific color palette
  - `fonts.css`: DM Sans font loading
  - Component-specific styles

**Key Configuration** (`theme/nuxt.config.ts`):

- Extends base layer
- Creates `@base` alias pointing to `@visualizevalue/vveb-layer-base`
- Imports theme CSS followed by base CSS (order matters)
- Vite config optimizes vue-feather dependency

### Playground Pattern

Both layers use `.playground/` directories that extend their parent layer. This is the development/testing environment. The playground's `nuxt.config.ts` simply extends the parent:

```ts
// base/.playground/nuxt.config.ts
export default defineNuxtConfig({
  extends: ['..'],
})

// theme/.playground/nuxt.config.ts
export default defineNuxtConfig({
  extends: ['..', '../../base'],
})
```

### Styling Architecture

**Color System**: The theme uses a "z-index" approach to colors where `--gray-z-0` through `--gray-z-10` represent layers from background to foreground. In dark mode, these values flip (z-0 becomes gray-950 instead of gray-50), making it easy to create theme-aware components.

**PostCSS Pipeline**:

- Custom media queries defined in `custom-media.css`
- Custom selectors in `custom-selectors.css`
- Mixins in `assets/styles/mixins/` loaded via `postcss-mixins`
- Nested CSS support
- Stage 3 preset-env features

**Component Patterns**: Components in the base layer are generally headless/unstyled or minimally styled, allowing the theme layer to provide visual design.

## Publishing

To publish a layer to NPM:

```bash
cd base  # or cd theme
npm publish --access public
```

Consumers add the layer to their `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@visualizevalue/vveb-layer-base'],
  // or both:
  extends: ['@visualizevalue/vveb-layer-theme', '@visualizevalue/vveb-layer-base'],
})
```
