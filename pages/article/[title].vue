<template>
  <div class="container">
    <div v-if="article" class="w-2/3 mx-auto px-4 my-10">
      <h1 class="text-3xl mb-4">{{ article.title }}</h1>
      <p v-html="article.article" class="[&_pre]:text-sm"></p>
    </div>
    <div v-else-if="showNotFound" class="w-1/2 mx-auto border">
      <h1>找不到文章</h1>
    </div>
  </div>
</template>
<script setup>
const getArticleData = ref(null);
const route = useRoute();
const showNotFound = ref(false)
const article = ref(null);
watchEffect(async () => {
  let res = await $fetch("/api/article");
  getArticleData.value = res.filter(({ title }) => {
    return route.params.title === title;
  });
  if (getArticleData.value.length !== 0) {
    article.value = getArticleData.value.at(0);
  } else { 
    showNotFound.value = true;
  }
});
</script>
<style>
pre{
  @apply bg-gray-700;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  margin: 1rem;
}

</style>
