<template>
  <div class="container pt-8">
    <ul class="mb-6 flex justify-center gap-x-4">
      <li v-for="type in types" :key="type" class="rounded-xl">
        <button
          @click="filterArticle(type)"
          class="font-semiblod rounded-xl border px-4 py-2 dark:hover:bg-white"
        >
          {{ type }}
        </button>
      </li>
    </ul>

    <ul class="mx-auto w-3/4 space-y-2">
      <li v-for="{ title, article, link } in filterList" :key="title" class="">
        <div class="rounded-sm border-b p-4">
          <h4 class="text-2xl">{{ title }}</h4>
          <a v-show="link" :href="link" target="_blank" class="text-blue-500"
            >Demo: {{ link }}</a
          >
          <p v-html="article"></p>
          <a href="#" class="underline">閱讀更多...</a>
        </div>
      </li>
    </ul>
  </div>
  
</template>

<script setup>
const lists = shallowRef([]);
let types = ref(null);

const { $arraySet }  = useNuxtApp()

onMounted(async () => {
  lists.value = await $fetch("/api/article");
  types.value = $arraySet(lists.value.map(({ type }) => type))
});

const category = ref("JavaScript");

function filterArticle(param) {
  category.value = param;
}

const filterList = computed(() => {
  return lists.value.filter(({ type }) => category.value == type);
});
</script>
<style></style>
