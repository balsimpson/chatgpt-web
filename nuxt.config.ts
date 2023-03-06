// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'MyGPT',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      OPENAI_KEY: process.env.OPENAI_KEY,
    },
    private: {
      OPENAI_KEY: process.env.OPENAI_KEY
    }
  },
})
