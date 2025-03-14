import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_SSR !== 'false',

  modules: ['@vueuse/nuxt'],

  runtimeConfig: {
    public: {
      title: 'VVEB STARTER',
    }
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      htmlAttrs: { lang: 'en' },
      title: process.env.NUXT_PUBLIC_TITLE,
      link: [
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      ]
    },
  },

  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          join(currentDir, './assets/styles/custom-selectors.css'),
          join(currentDir, './assets/styles/custom-media.css'),
        ]
      },
      'postcss-mixins': {
        mixinsDir: join(currentDir, './assets/styles/mixins'),
      },
      'postcss-nested': {},
      'postcss-custom-selectors': {},
      'postcss-custom-media': {},
      'postcss-preset-env': {
        stage: 3,
        features: {},
      },
      'autoprefixer': {},
    },
  },

  nitro: {
    preset: 'node-cluster',
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
  },

  imports: {
    presets: [
      {
        from: 'luxon',
        imports: [
          'DateTime',
        ]
      }
    ]
  },

  compatibilityDate: '2024-11-01',
})
