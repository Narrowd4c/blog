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
          <button @click="darkMode" class="ms-4">
            <img v-show="isDarkMode.isDark" src="/dark_mode.svg" alt="darkMode" />
            <img v-show="!isDarkMode.isDark" src="/light_mode.svg" alt="lightMode"
            />
          </button>
        </li>
      </ul>
    </div>
  </header>
  <slot />
  <div class="mt-6 h-20 w-full" aria-hidden="true"></div>
  <footer class="fixed bottom-0 mt-auto w-full dark:hidden">
    <div class="wave relative py-10">
      <img src="/ship-svgrepo-com.svg" alt="" class="absolute w-10" />
    </div>
  </footer>
</template>
<script setup>
const isDarkMode = useDarkModeStore();

function darkMode() {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  isDarkMode.toggleDarkMode();
}

</script>

<style scoped></style>
