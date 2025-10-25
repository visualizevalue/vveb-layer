# VV Web Layers

A collection of composable Nuxt layers for building modern web applications with a focus on clean UI components, theming, and Web3 integration.

## Overview

This monorepo contains three complementary Nuxt layers that can be used independently or together:

- **[@visualizevalue/vveb-layer-base](./base)** - Core UI components and utilities
- **[@visualizevalue/vveb-layer-theme](./theme)** - VV-specific theming and design system
- **[@visualizevalue/vveb-layer-evm](./evm)** - Ethereum/Web3 wallet connection and transaction flows

## Quick Start

### Installation

```bash
pnpm add @visualizevalue/vveb-layer-base
# or with theme
pnpm add @visualizevalue/vveb-layer-theme @visualizevalue/vveb-layer-base
# or with all layers for Web3 apps
pnpm add @visualizevalue/vveb-layer-evm @visualizevalue/vveb-layer-theme @visualizevalue/vveb-layer-base
```

### Usage

Add the layers to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  // Base only - headless components and utilities
  extends: ['@visualizevalue/vveb-layer-base']

  // Base + Theme - full design system
  extends: [
    '@visualizevalue/vveb-layer-theme',
    '@visualizevalue/vveb-layer-base'
  ]

  // Full stack - everything including Web3
  extends: [
    '@visualizevalue/vveb-layer-evm',
    '@visualizevalue/vveb-layer-theme',
    '@visualizevalue/vveb-layer-base'
  ]
})
```

## Layer Details

### Base Layer

Foundation layer providing headless/unstyled components and utilities.

**Key Features:**
- Headless UI components (Alert, Button, Calendar, Dialog, Dropdown, Modal, Popover, Table, etc.)
- Vue composables for common patterns
- Utility functions (date formatting, string manipulation, etc.)
- CSS custom properties and PostCSS pipeline
- Responsive design system with custom media queries

**Tech Stack:** Vue 3, Nuxt 3, VueUse, Reka UI, Luxon

[View Base Layer Documentation →](./base)

### Theme Layer

Extends the base layer with VV-specific visual design and theming.

**Key Features:**
- Dark/light mode with automatic theme switching
- Z-index based color system that flips for dark mode
- Icon components using Feather icons
- DM Sans font integration
- Component-specific styling

**Dependencies:** Extends `@visualizevalue/vveb-layer-base`

[View Theme Layer Documentation →](./theme)

### EVM Layer

Web3 integration layer for Ethereum-based applications.

**Key Features:**
- Multi-wallet support (MetaMask, Coinbase, WalletConnect, Injected)
- Wallet connection UI components
- ENS name resolution
- Guided transaction flows with state management
- Chain switching and validation
- Multi-RPC fallback configuration

**Tech Stack:** wagmi/vue, viem, @tanstack/vue-query

**Dependencies:** Extends `@visualizevalue/vveb-layer-base`

[View EVM Layer Documentation →](./evm)

## Development

This project uses pnpm workspaces. Each layer has its own `.playground` directory for isolated development and testing.

### Prerequisites

- Node.js 18+
- pnpm 10.7.0+

### Setup

```bash
# Install all dependencies
pnpm install

# Prepare all layers
pnpm -r prepare
```

### Working on a Layer

Each layer can be developed independently:

```bash
# Base layer
cd base && pnpm dev

# Theme layer
cd theme && pnpm dev

# EVM layer
cd evm && pnpm dev
```

The playground extends the parent layer, allowing you to test changes in isolation at `http://localhost:3000`.

### Type Checking

```bash
# Check all layers
pnpm -r typecheck

# Check specific layer
cd base && pnpm typecheck
```

### Building

```bash
# Build playground for a layer
cd base && pnpm build

# Generate static site
cd base && pnpm generate
```

## Architecture

### Workspace Structure

The root `package.json` defines pnpm workspace overrides linking the layers:

```
vveb-layer/
├── base/           # @visualizevalue/vveb-layer-base
│   ├── components/
│   ├── composables/
│   ├── utils/
│   ├── assets/
│   └── .playground/
├── theme/          # @visualizevalue/vveb-layer-theme
│   ├── components/
│   ├── assets/
│   └── .playground/
└── evm/            # @visualizevalue/vveb-layer-evm
    ├── components/
    ├── composables/
    ├── utils/
    ├── plugins/
    └── .playground/
```

### Styling System

**Color Architecture:** The theme uses a "z-index" color system where `--gray-z-0` through `--gray-z-10` represent layers from background to foreground. In dark mode, these values automatically flip, making theme-aware components simple to build.

**PostCSS Pipeline:**
- Custom media queries for responsive design
- Custom selectors for reusable patterns
- Mixins for common styles
- Nested CSS support
- Modern CSS features via preset-env

### Component Philosophy

Components in the base layer are intentionally headless or minimally styled, providing maximum flexibility. The theme layer adds VV-specific visual design while maintaining the same component API.

## Publishing

To publish a layer to NPM:

```bash
cd base  # or theme, or evm
npm publish --access public
```

Version bumping follows semantic versioning. Update the version in the layer's `package.json` before publishing.

## Examples

### Using Base Components

```vue
<template>
  <Button @click="handleClick">
    Click me
  </Button>

  <Modal v-model:open="isOpen">
    <template #title>Modal Title</template>
    <p>Modal content</p>
  </Modal>
</template>
```

### Using Themed Components

```vue
<template>
  <Icon name="heart" />
  <ToggleDarkMode />
</template>
```

### Using EVM Components

```vue
<template>
  <Connect />

  <TransactionFlow
    v-model:step="step"
    :chain-id="1"
    @complete="handleComplete"
  >
    <template #confirm>
      <p>Confirm your transaction</p>
    </template>
    <template #complete>
      <p>Transaction successful!</p>
    </template>
  </TransactionFlow>
</template>
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see [LICENSE](./LICENSE) for details
