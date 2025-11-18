import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@wagmi/vue/nuxt'],

  typescript: {
    typeCheck: false,
  },

  ssr: process.env.NUXT_SSR !== 'false',

  alias: {
    '@base': '@visualizevalue/vveb-layer-base',
    '@theme': '@visualizevalue/vveb-layer-theme',
  },

  css: [
    '@theme/app/assets/theme.css',
    '@base/app/assets/styles/index.css',
  ],

  runtimeConfig: {
    public: {
      title: 'VVEB EVM',
      blockExplorer: 'https://etherscan.io',
      chainId: 1,
      rpc1: '',
      rpc2: '',
      rpc3: '',
      walletConnectProjectId: '',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@visualizevalue/vveb-layer-evm > eventemitter3',
        '@visualizevalue/vveb-layer-evm > @metamask/sdk',
      ]
    }
  },

  nitro: {
    preset: 'node-cluster',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  // imports: {
  //   presets: [
  //     {
  //       from: '@wagmi/core',
  //       imports: ['readContract', 'waitForTransactionReceipt', 'writeContract'],
  //     },
  //     {
  //       from: 'viem',
  //       imports: [
  //         'decodeEventLog',
  //         'isAddress',
  //         'getAddress',
  //         'toBytes',
  //         'toHex',
  //         'getContract',
  //         'encodeAbiParameters',
  //         'parseAbiParameters',
  //         'parseAbiParameter',
  //       ],
  //     },
  //   ],
  // },

  compatibilityDate: '2024-11-01',
})
