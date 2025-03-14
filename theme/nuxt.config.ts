import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: `@visualizevalue/vveb-layer-base`,

  alias: {
    '@base': '@visualizevalue/vveb-layer-base',
  },

  css: [
    '@base/assets/styles/index.css',
    join(currentDir, './assets/theme.css'),
  ],

  compatibilityDate: '2024-08-14'
})

