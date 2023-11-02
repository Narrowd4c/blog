<template>
  <div class="container my-10 lg:w-3/4">
    <h2 class="mb-6 text-3xl font-bold">近期文章:</h2>
    <ul>
      <li v-for="{ type, title, link } in articles.slice(0, 4)">
        <div class="border-b py-4">
          <h3 class="mb-2 text-2xl">{{ title }}</h3>
          <p class="mb-1">類別: {{ type }}</p>
          <a v-show="link" :href="`${url}/article/${title}`" class="text-blue-500"
            >閱讀更多</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const articles = shallowRef([]);
const url = ref(useRequestURL().href.slice(0, -1))

onMounted(async () => {
  articles.value = await $fetch("/api/article");
});
</script>
