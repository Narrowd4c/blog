// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  runtimeConfig: {
    public: { baseURL: process.env.BASE_URL },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [{ property: "og:image", content: 'https://nuxt-learn-mu.vercel.app/cat.jpeg' }],
    },
  },
});
