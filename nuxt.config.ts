import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

const apiBaseUrl = '/api'
// const apiBaseUrl = 'https://movies-proxy.vercel.app'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/supabase',
  ],
  experimental: {
    viewTransition: false,
    renderJsonPayloads: true,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
    supabase: {
      url: process.env.SUPABASE_URL || '',
      key: process.env.SUPABASE_KEY || '',
    },
  },
  devtools: {
    enabled: true,
  },
  image: {
    domains: [
      'eu-region.b-cdn.net',
      'image.tmdb.org',
      'img.youtube.com',
    ],
    bunny: {
      baseURL: 'https://eu-region.b-cdn.net/',
    },
    alias: {
      b: 'https://eu-region.b-cdn.net/',
      tmdb: 'https://image.tmdb.org/t/p/original/',
      youtube: 'https://img.youtube.com/',
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50,
        },
      },
    },
  },
  nitro: {
    routeRules: {
      '/**': { isr: false, cors: true },
      '/tmdb/**': { swr: true },
    },
  },
})
