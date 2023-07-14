// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    dirs: ['store']
  },
  experimental: {
    inlineSSRStyles: false
  },
  nitro: {
    compressPublicAssets: {
      brotli: true
    }
  },
  app: {
    rootId: 'app',
    buildAssetsDir: '/',
    head: {
      title: 'Training Tracker',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'theme-color',
          content: '#2e3440'
        }
      ],
      link: [
        { rel: 'icon', href: 'public/favicon.svg' },

        { rel: 'apple-touch-icon', href: 'icons/icon192.svg' },

        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },

        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sofia+Sans&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
          referrerpolicy: 'no-referrer'
        },
        { rel: 'manifest', href: 'manifest.json' }

      ]
    }
  },
  css: ['@/assets/sass/main.scss'],
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]',
          chunkFileNames: '[hash].js',
          entryFileNames: '[hash].js',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      ongoingCookieName: 'ongoing',
    },
    charsNumIter: 25,
    passCharLength: 14,
    passNumLength: 11
  },
})
