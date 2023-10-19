<template>
  <header class="border-b-2 border-gray-400/20 bg-white/30 backdrop-blur-sm">
    <div class="container flex items-center py-4">
      <h3 class="text-3xl">
        <NuxtLink to="/" class="px-2 py-4">Home</NuxtLink>
      </h3>
      <ul class="ms-auto flex">
        <li><NuxtLink to="/" class="px-2 py-4">分類</NuxtLink></li>
        <li><NuxtLink to="/about" class="px-2 py-4">Global</NuxtLink></li>
        <li>
          <button @click="darkMode" class="ms-40">
            <img
              v-if="isDarkMode"
              class="fill-white"
              src="/dark_mode.svg"
              alt="darkMode"
            /><img v-else="!isDarkMode" src="/light_mode.svg" alt="lightMode" />
          </button>
        </li>
      </ul>
    </div>
  </header>
  <slot />
  <footer class="group relative mt-auto h-[100px] w-full">
    <img
      src="/ship-svgrepo-com.svg"
      alt=""
      class="absolute w-[3vw] group-hover:[animation-play-state:running;]"
    />
  </footer>
</template>
<script setup>
const api = ref(null);
const isDarkMode = ref(false);

function darkMode() {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  isDarkMode.value = html.classList.contains("dark");
}
</script>

<style scoped>
footer {
  background:
    radial-gradient(
        50px at 50% -23.5px,
        #0000 99%,
        rgba(28, 114, 235, 0.6) 100%
      ) -10px 0px/80px 100px repeat-x,
    radial-gradient(50px at 50% -23.5px, #0000 99%, rgb(28, 114, 235) 100%) 6px
      1px/60px 100px repeat-x;
  & > img {
    animation: position 40s ease-in-out infinite, wave 2s ease-in-out infinite forwards alternate;
    animation-play-state: paused;
  }
}
@keyframes position {
  0% {
    left: -3vw;
  }
  100% {
    left: 100%;
  }
}
@keyframes wave {
  0% {
    top: 0%;
  }
  100% {
    top: -10px;
  }
}
</style>
