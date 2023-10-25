<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup>
const config = useRuntimeConfig()
useHead({
  titleTemplate: (title) => title || "Nex's BLog",
  bodyAttrs: {
    class: "",
  },
  script: [],
  link: [
    {
      rel: "icon",
      href: "/ship-svgrepo-com.svg",
    },
  ],
});
useSeoMeta({
  title: "Nex's Blog",
  ogTitle: "Nex's Blog",
  description: 'This is my personal blog.',
  ogDescription: 'This is my personal blog.',
  ogImage: config.app.baseURL + 'catch.jpeg',
})

</script>
<style></style>
