// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: { baseURL: process.env.BASE_URL },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { property: "og:image", content: import.meta.url + "cat.jpeg" },
        { property: "og:image:width", content: 900 },
        { property: "og:image:height", content: 450 },
        { property: "og:title", content: "Nex's Blog" },
        { property: "og:description", content: "Nex's Blog for learning Nuxt" },
        { name: "description", content: "Nex's Blog for learning Nuxt" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: import.meta.url },
      ],
    },
  },
});
