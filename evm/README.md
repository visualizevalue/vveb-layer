# @visualizevalue/vveb-layer-evm

A comprehensive Nuxt layer for Ethereum/EVM integration, providing wallet connection, account management, and guided transaction flows using modern wagmi and viem libraries.

## Features

- **Multi-Wallet Support**: MetaMask, Coinbase Wallet, WalletConnect, and injected wallets
- **Modern Web3 Stack**: Built with viem 2.38+ and @wagmi/vue with Nuxt module
- **Transaction Flow Component**: Guided multi-step transaction execution with automatic chain validation
- **ENS Integration**: Automatic ENS name resolution for addresses
- **Multi-Chain Support**: Mainnet, Sepolia, Holesky, and localhost
- **Resilient RPC**: Automatic fallback between multiple RPC endpoints
- **SSR Compatible**: Cookie-based storage for server-side rendering
- **Batch Multicall**: Optimized contract calls with automatic batching

## Installation

```bash
pnpm add @visualizevalue/vveb-layer-evm viem @wagmi/vue @tanstack/vue-query
```

Add to your Nuxt config:

```ts
export default defineNuxtConfig({
  extends: ['@visualizevalue/vveb-layer-evm'],
})
```

## Configuration

### Environment Variables

```bash
# Required
NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your-walletconnect-project-id"

# Optional (with defaults)
NUXT_PUBLIC_TITLE="My App"
NUXT_PUBLIC_CHAIN_ID=1
NUXT_PUBLIC_BLOCK_EXPLORER="https://etherscan.io"

# RPC endpoints (fallback chain)
NUXT_PUBLIC_RPC1="https://eth.llamarpc.com"
NUXT_PUBLIC_RPC2="https://ethereum-rpc.publicnode.com"
NUXT_PUBLIC_RPC3="https://eth.drpc.org"
```

### Runtime Config

You can also configure via `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      title: 'My Web3 App',
      chainId: 1, // or 11155111 for Sepolia
      blockExplorer: 'https://etherscan.io',
      walletConnectProjectId: 'your-project-id',
    },
  },
})
```

## Components

### `<Connect>`

Wallet connection button with modal selector for choosing between wallets.

```vue
<template>
  <Connect>
    <!-- Default slot: shown when disconnected -->
    <template #default>
      Connect Wallet
    </template>

    <!-- Connected slot: shown when wallet is connected -->
    <template #connected="{ address, ensName }">
      <Account :address="address" />
    </template>
  </Connect>
</template>
```

**Props:**
- None (uses slots for customization)

**Slots:**
- `default`: Content shown when disconnected
- `connected({ address, ensName })`: Content shown when connected

### `<Account>`

Display Ethereum address with automatic ENS name resolution and copy-to-clipboard.

```vue
<template>
  <Account :address="userAddress" />
</template>

<script setup>
const { address: userAddress } = useAccount()
</script>
```

**Props:**
- `address` (string, required): Ethereum address to display

**Features:**
- Automatically resolves ENS names
- Shows shortened address as fallback
- Click to copy address
- Displays ENS avatar if available

### `<TransactionFlow>`

Guided transaction execution with automatic chain checking, user confirmation, and status tracking.

```vue
<template>
  <TransactionFlow
    :request="mintNFT"
    :text="{
      title: {
        confirm: 'Confirm Mint',
        requesting: 'Awaiting Signature',
        waiting: 'Minting...',
        complete: 'Minted!'
      },
      lead: {
        confirm: 'This will mint 1 NFT for 0.1 ETH.',
        complete: 'Your NFT has been minted successfully.'
      },
      action: {
        confirm: 'Mint NFT',
        complete: 'View on OpenSea'
      },
    }"
    @complete="handleComplete"
    @error="handleError"
  >
    <!-- Trigger button -->
    <template #start="{ start }">
      <Button @click="start">Mint NFT</Button>
    </template>

    <!-- Optional: customize confirmation step -->
    <template #confirm="{ data, next, cancel }">
      <div>
        <p>Minting {{ data.amount }} NFT(s)</p>
        <p>Cost: {{ data.cost }} ETH</p>
        <Button @click="next">Confirm</Button>
        <Button @click="cancel">Cancel</Button>
      </div>
    </template>

    <!-- Optional: customize complete step -->
    <template #complete="{ receipt, close }">
      <div>
        <p>Transaction: {{ receipt.transactionHash }}</p>
        <Button @click="close">Done</Button>
      </div>
    </template>
  </TransactionFlow>
</template>

<script setup>
import { writeContract } from '@wagmi/core'

const mintNFT = async () => {
  const hash = await writeContract({
    address: '0x1234...',
    abi: [...],
    functionName: 'mint',
    args: [1],
    value: parseEther('0.1'),
  })
  return hash
}

const handleComplete = (receipt) => {
  console.log('Mint successful!', receipt)
}

const handleError = (error) => {
  console.error('Mint failed:', error)
}
</script>
```

**Props:**
- `request` (function, required): Async function that executes the transaction and returns a transaction hash
- `text` (object, optional): Customize text for each step
  - `title`: Step titles (confirm, chain, requesting, waiting, complete, error)
  - `lead`: Step descriptions
  - `action`: Button text
- `requireChainId` (number, optional): Specific chain ID required (defaults to main chain)

**Events:**
- `@complete(receipt)`: Fired when transaction is confirmed
- `@error(error)`: Fired when an error occurs
- `@cancel()`: Fired when user cancels

**Slots:**
- `start({ start })`: Trigger button/element
- `confirm({ data, next, cancel })`: Custom confirmation UI
- `chain({ switchChain })`: Custom chain switching UI
- `requesting()`: Custom waiting for signature UI
- `waiting({ hash })`: Custom waiting for confirmation UI
- `complete({ receipt, close })`: Custom completion UI
- `error({ error, retry, cancel })`: Custom error UI

**Flow States:**
1. **start**: Initial state, waiting for user to trigger
2. **confirm**: Show transaction details, user can review
3. **chain**: Check/prompt chain switching if needed
4. **requesting**: Waiting for wallet signature
5. **waiting**: Transaction submitted, waiting for confirmation
6. **complete**: Transaction confirmed successfully
7. **error**: An error occurred

## Composables & Helpers

### `useMainChainId()`

Returns the configured main chain ID from runtime config.

```ts
const chainId = useMainChainId()
console.log(chainId) // 1 (mainnet) or configured value
```

### `useEnsureChainIdCheck()`

Returns a function that checks if the user is on the correct chain and prompts to switch if needed.

```ts
const ensureChain = useEnsureChainIdCheck()

// Check and switch to main chain if needed
const isCorrectChain = await ensureChain()
// Returns true if on correct chain, false if user cancelled switch
```

**Returns:** Async function that returns a Promise<boolean>. Automatically uses the configured main chain ID.

### `delay(ms)`

Promise-based delay helper for async operations.

```ts
import { delay } from '#imports'

await delay(1000) // Wait 1 second
```

### Wagmi Composables (Auto-imported)

All standard wagmi/vue composables are available:

```ts
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from '@wagmi/vue'

const { address, isConnected } = useAccount()
const { connect } = useConnect()
const { disconnect } = useDisconnect()
```

## Utilities

### `shortAddress(address, length?)`

Shorten Ethereum addresses for display.

```ts
import { shortAddress } from '#imports'

shortAddress('0x1234567890abcdef1234567890abcdef12345678')
// Returns: "0x1234...678"

shortAddress('0x1234567890abcdef1234567890abcdef12345678', 6)
// Returns: "0x12345678...345678"
```

**Parameters:**
- `address` (Address): Ethereum address
- `length` (number, optional): Characters to show on each side (default: 3)

### Viem Functions

Common viem functions can be imported:

```ts
import {
  parseEther,
  parseUnits,
  formatEther,
  formatUnits,
  isAddress,
  getAddress,
  encodeFunctionData,
  decodeFunctionResult,
} from 'viem'
```

## Wagmi Actions

Wagmi actions can be imported from `@wagmi/core`:

```ts
import {
  readContract,
  writeContract,
  getBalance,
  getEnsName,
  getEnsAvatar,
  waitForTransactionReceipt,
  switchChain,
} from '@wagmi/core'
```

## Advanced Usage

### Custom Transaction with Data

```vue
<script setup>
import { writeContract, parseEther } from '#imports'

const mintWithData = async () => {
  const hash = await writeContract({
    address: '0x...',
    abi: myContractABI,
    functionName: 'mintWithData',
    args: [
      '0x...', // recipient
      tokenId,
      metadata,
    ],
    value: parseEther('0.1'),
  })
  return hash
}
</script>
```

### Reading Contract Data

```ts
const { data: totalSupply } = useReadContract({
  address: '0x...',
  abi: myContractABI,
  functionName: 'totalSupply',
})

// Or using actions
const supply = await readContract({
  address: '0x...',
  abi: myContractABI,
  functionName: 'totalSupply',
})
```

### Multi-Step Transactions

```vue
<template>
  <TransactionFlow
    :request="approveAndMint"
    :text="{ title: { confirm: 'Approve & Mint' } }"
  >
    <template #start="{ start }">
      <Button @click="start">Approve & Mint</Button>
    </template>
  </TransactionFlow>
</template>

<script setup>
const approveAndMint = async () => {
  // First approve
  const approveHash = await writeContract({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [nftContract, parseEther('0.1')],
  })

  // Wait for approval
  await waitForTransactionReceipt({ hash: approveHash })

  // Then mint
  const mintHash = await writeContract({
    address: nftContract,
    abi: nftABI,
    functionName: 'mint',
    args: [1],
  })

  return mintHash // Return final hash
}
</script>
```

## Supported Chains

- **Mainnet** (chainId: 1)
- **Sepolia** (chainId: 11155111)
- **Holesky** (chainId: 17000)
- **Localhost** (chainId: 31337)

## Development

```bash
# Install dependencies
pnpm install

# Run playground
cd evm && pnpm dev

# Type check
cd evm && pnpm typecheck

# Build playground
cd evm && pnpm build
```

## Stack

- **viem**: 2.38.4 (Ethereum library)
- **@wagmi/vue**: 0.2.14 (Vue composables for Ethereum)
- **@tanstack/vue-query**: 5.62.3 (Async state management)
- **qrcode**: 1.5.4 (QR code generation for WalletConnect)
- **Nuxt**: 4.2.0

## WalletConnect Setup

1. Get a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Set `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in your `.env`
3. Configure your app metadata in the wagmi plugin if needed

## TypeScript

The layer includes full TypeScript support with auto-generated types from wagmi and viem.

```ts
import type { Address, Hash, TransactionReceipt } from 'viem'
import type { Config } from '@wagmi/vue'

const address: Address = '0x...'
const hash: Hash = '0x...'
```

## License

MIT
