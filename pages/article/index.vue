<template>
  <div ref="mococo" class="container gap-x-6 pt-8 md:flex">
    <ul
      class="-mx-4 flex flex-wrap gap-4 border-b bg-white px-6 py-4 dark:bg-gray-800 md:flex-col md:border-b-0 md:border-e lg:mx-0 lg:w-2/12"
    >
      <li class="rounded-xl">
        <button
          @click="category = 'All'"
          :class="{
            'text-blue-500': category === 'All',
            'bg-white': category === 'All',
          }"
          class="font-semiblod rounded-xl border px-4 py-2 dark:hover:bg-white"
        >
          全部
        </button>
      </li>
      <li v-for="type in types" :key="type" class="rounded-xl">
        <button
          @click="filterArticle(type)"
          :class="{
            'text-blue-500': type === category,
            'bg-white': category === type,
          }"
          class="font-semiblod rounded-xl border px-4 py-2 dark:hover:bg-white"
        >
          {{ type }}
        </button>
      </li>
    </ul>

    <ul class="space-y-2 p-4 md:w-9/12">
      <li v-for="{ title, type } in filterList" :key="title">
        <div class="rounded-sm border-b p-4">
          <h4 class="text-2xl">{{ title }}</h4>
          <h5 class="my-4">類別: {{ type }}</h5>
          <a :href="`${url}/${title}`" class="text-blue-500">連結</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const lists = shallowRef([]);
let types = ref(null);
const category = ref("All");
// plugins/arraySet.js
const { $arraySet } = useNuxtApp();
const url = ref(useRequestURL());
onMounted(async () => {
  lists.value = await $fetch("/api/article");
  types.value = $arraySet(lists.value.map(({ type }) => type));
});

function filterArticle(param) {
  category.value = param;
}

const filterList = computed(() => {
  if (category.value == "All") {
    return lists.value;
  } else {
    return lists.value.filter(({ type }) => category.value == type);
  }
});
</script>
<style></style>
