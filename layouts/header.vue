<template>
  <header class="fixed top-0 w-full bg-white/30 dark:bg-black dark:text-white backdrop-blur-sm">
    <div class="container flex py-4 items-center">
    <h3 class="text-3xl">筆記</h3>
    <ul class="flex ms-auto">
      <li><NuxtLink to="/" class="px-2 py-4">Home</NuxtLink></li>
      <li><NuxtLink to="/global" class="px-2 py-4">Global</NuxtLink></li>
      <li><button @click="darkMode"><img v-if="isDarkMode" class="fill-white" src="/dark_mode.svg" alt="darkMode"><img v-else="!isDarkMode" src="/light_mode.svg" alt="lightMode"></button></li>
    </ul>
    </div>
  </header>
  <slot />
</template>
<script setup>
const api = ref(null);
const isDarkMode = ref(false)
onMounted(async () => {
  let getRes = await $fetch("/api/api");
  api.value = getRes.api;
  console.log('getRes',getRes)
});

function darkMode() { 
  const html = document.querySelector('html')
  html.classList.toggle('dark')
  isDarkMode.value = html.classList.contains('dark')
}
</script>

<style scoped>

</style>
