<template>
  <header class="fixed top-0 w-full bg-white/30 backdrop-blur-sm">
    <div class="container">
    <ul class="flex py-4">
      <li><NuxtLink to="/" class="px-2 py-4">Home</NuxtLink></li>
      <li><NuxtLink to="/global" class="px-2 py-4">Global</NuxtLink></li>
    </ul>
    </div>
  </header>
  <slot />
</template>
<script setup></script>

<style scoped>

</style>
