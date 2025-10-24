# @visualizevalue/vveb-layer-evm

EVM/Web3 integration layer for Nuxt applications, providing wallet connection, account management, and transaction flow components.

## Features

- **Modern Stack**: Built with viem 2.37.13 and wagmi Vue integration
- **Wallet Support**: MetaMask, Coinbase Wallet, WalletConnect, and injected wallets
- **Chain Support**: Mainnet, Sepolia, Holesky, and localhost
- **Components**:
  - `Connect`: Wallet connection button with modal picker
  - `Account`: Display address with ENS resolution
  - `TransactionFlow`: Guided transaction execution with state management

## Installation

Add to your Nuxt config:

```ts
export default defineNuxtConfig({
  extends: ['@visualizevalue/vveb-layer-evm'],
})
```

## Configuration

Set environment variables or runtime config:

```bash
NUXT_PUBLIC_TITLE="My App"
NUXT_PUBLIC_CHAIN_ID=1
NUXT_PUBLIC_BLOCK_EXPLORER="https://etherscan.io"
NUXT_PUBLIC_RPC1="https://eth.llamarpc.com"
NUXT_PUBLIC_RPC2="https://ethereum-rpc.publicnode.com"
NUXT_PUBLIC_RPC3="https://eth.drpc.org"
NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your-project-id"
```

## Usage

### Connect Component

```vue
<template>
  <Connect>
    <template #connected="{ address }">
      <Account :address="address" />
    </template>
  </Connect>
</template>
```

### Account Component

```vue
<template>
  <Account :address="userAddress" />
</template>
```

### TransactionFlow Component

```vue
<template>
  <TransactionFlow
    :request="executeTransaction"
    :text="{
      title: { confirm: 'Confirm Mint' },
      lead: { confirm: 'This will mint a new NFT.' },
      action: { confirm: 'Mint' }
    }"
    @complete="onComplete"
  >
    <template #start="{ start }">
      <Button @click="start">Mint NFT</Button>
    </template>
  </TransactionFlow>
</template>

<script setup>
import { writeContract } from '@wagmi/core'

const executeTransaction = async () => {
  const hash = await writeContract({
    address: '0x...',
    abi: [...],
    functionName: 'mint',
  })
  return hash
}

const onComplete = (receipt) => {
  console.log('Transaction complete:', receipt)
}
</script>
```

## Composables

- `useMainChainId()`: Get the configured main chain ID
- `useEnsureChainIdCheck()`: Ensure user is on the correct chain

## Utilities

- `shortAddress(address, length)`: Shorten Ethereum addresses

## Development

```bash
# Install dependencies
pnpm install

# Run playground
cd evm && pnpm dev

# Type check
cd evm && pnpm typecheck

# Build
cd evm && pnpm build
```
