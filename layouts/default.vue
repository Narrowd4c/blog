<template>
  <header class="border-b-2 border-gray-400/20 backdrop-blur-sm">
    <div class="container flex items-center py-4">
      <NuxtLink to="/"
        ><h3 class="font-['Shadows_Into_Light'] text-3xl font-black">
          Nex's BLOG
        </h3></NuxtLink
      >
      <ul class="ms-auto flex">
        <li><NuxtLink to="/article" class="px-2 py-4">分類</NuxtLink></li>
        <li><NuxtLink to="/about" class="px-2 py-4">關於</NuxtLink></li>
        <li>
          <button @click="darkMode" class="ms-40">
            <img v-if="isDarkMode" src="/dark_mode.svg" alt="darkMode" /><img
              v-else="!isDarkMode"
              src="/light_mode.svg"
              alt="lightMode"
            />
          </button>
        </li>
      </ul>
    </div>
  </header>
  <slot />
  <footer class="wave relative mt-auto w-full py-10 dark:hidden">
    <img src="/ship-svgrepo-com.svg" alt="" class="absolute w-10" />
  </footer>
</template>
<script setup>
const isDarkMode = ref(false);

function darkMode() {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  isDarkMode.value = html.classList.contains("dark");
}
</script>

<style scoped></style>
