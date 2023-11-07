<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup>
const url = useRequestURL();

useHead({
  titleTemplate: (title) => (title ? title : "Nex Blog"),
  link: [
    {
      rel: "icon",
      href: "/ship-svgrepo-com.svg",
    },
  ],
});

useSeoMeta({
  ogTitle: "Nex Blog",
  description: "This is my personal blog.",
  ogDescription: "This is my personal blog.",
  ogImage: url.href + "cat.jpeg",
  ogUrl: url.href,
  ogImageWidth: 800,
  ogImageHeight: 450,
  ogType: "website",
});
</script>
<style></style>
