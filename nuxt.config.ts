// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      backendURL: process.env.BACKEND_ADRESS
    }
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  ssr: false,

  build: {
    transpile: ['vuetify']
  },
  nitro: {
    devProxy:{
      '/api': {
        target: 'http://localhost:9999',
        prependPath:true
      },
  }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      }
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  compatibilityDate: '2025-01-03'
})