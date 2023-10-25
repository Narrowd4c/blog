<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup>
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
</script>
<style></style>
