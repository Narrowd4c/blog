<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup>
const url = useRequestURL();
useHead({
  titleTemplate: (title) => (title ? title : "Nex's BLog"),
  link: [
    {
      rel: "icon",
      href: "/ship-svgrepo-com.svg",
    },
  ],
});

useSeoMeta({
  ogTitle: "Nex's Blog",
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
