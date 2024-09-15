// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@': resolve(__dirname,"/")
  },
  css:[
    "~/assets/main.css"
  ],
  
})
