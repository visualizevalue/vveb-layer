import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },

  alias: {
    '@base': '@visualizevalue/vveb-layer-base',
  },

  css: [
    '@fontsource-variable/dm-sans',
    '@fontsource-variable/dm-sans/wght-italic.css',
    '@base/assets/styles/index.css',
    join(currentDir, './assets/theme.css'),
  ],

  hooks: {
    'vite:extendConfig': (config) => {
      config.optimizeDeps ??= {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('@visualizevalue/vveb-layer-theme > vue-feather')
    },
  },

  compatibilityDate: '2024-08-14',
})
