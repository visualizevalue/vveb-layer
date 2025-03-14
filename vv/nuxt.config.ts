// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: false,

  extends: `@visualizevalue/mint-app-base`,
 
  alias: {
    '@base': '@visualizevalue/mint-app-base',
  },

  css: [
    '~/assets/theme.css',
  ],

  compatibilityDate: '2024-08-14'
})

