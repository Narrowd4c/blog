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
  <div @click="scrollToTop" class="fixed bottom-10 right-20 z-10 bg-white rounded-full p-2 -rotate-90 border cursor-pointer"><RightArrow class="fill-indigo-400 w-5 h-5"></RightArrow></div>
  <footer class="mt-auto w-full">
    <div class="wave relative py-10 dark:hidden">
      <img src="/ship-svgrepo-com.svg" alt="ship icon" class="absolute w-10" />
    </div>
    <div class="hidden dark:flex bg-gray-800 text-xl py-4 border-t-2   justify-center">
      <CssDoodle></CssDoodle>
    </div>
  </footer>
</template>
<script setup>
import RightArrow from "../components/icon/RightArrow.vue";
import CssDoodle from "../components/CssDoodle.vue";
const isDarkMode = useDarkModeStore();
function scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
function darkMode() {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  isDarkMode.toggleDarkMode();
}

</script>

<style scoped></style>
