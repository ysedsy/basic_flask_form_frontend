// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  ssr: false,
  build: {
    transpile: ['vuetify']
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
      'process.env-DEBUG': false,
    },
  },
    modules: [
      '@pinia/nuxt',
      async (_options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config) => {
          config.plugins.push(vuetify({autoImport: true}));
        });
      }
    ]
        compatibilityDate: '2024-11-01',

  })
