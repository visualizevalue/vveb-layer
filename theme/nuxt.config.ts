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

  css: [join(currentDir, './app/assets/theme.css'), '@base/app/assets/styles/index.css'],

  vite: {
    optimizeDeps: {
      include: ['@visualizevalue/vveb-layer-theme > vue-feather'],
    },
  },

  compatibilityDate: '2024-08-14',
})
