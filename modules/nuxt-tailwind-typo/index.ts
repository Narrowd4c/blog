// ~/modules/nuxt-tailwind-typo/index.ts
import { defineNuxtModule, addTemplate } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "nuxt-tailwind-typo",
  },
  setup(options, nuxt) {
    nuxt.hook("tailwindcss:loadConfig", function (loadConfig) {
      // read: https://tailwindcss.nuxtjs.org/tailwind/editor-support
      addTemplate({
        filename: "tailwind.config.js",
        getContents: () => `module.exports = ${JSON.stringify(loadConfig)}`,
        write: true,
      });
    });
  },
});
