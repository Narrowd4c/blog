<template>
<div class="bg-red-500 fixed top-0 w-full">
  <NuxtLink to="/">Home</NuxtLink>

  <NuxtLink to="/about">About</NuxtLink>
</div>
  <slot />
  
</template>
<script setup></script>

<style scoped>

a{
    padding: 12px;
}
</style>
