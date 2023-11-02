<template>
  <div class="container flex gap-x-6 pt-8">
    <ul class="w-2/12 space-y-4 border-e bg-white px-6 dark:bg-gray-800">
      <li class="rounded-xl">
        <button
          @click="category = 'All'"
          :class="{ 'text-blue-500': category === 'All' , 'bg-white':category === 'All'}"
          class="font-semiblod rounded-xl border px-4 py-2 dark:hover:bg-white"
        >
          全部
        </button>
      </li>
      <li v-for="type in types" :key="type" class="rounded-xl">
        <button
          @click="filterArticle(type)"
          :class="{ 'text-blue-500': type === category,'bg-white':category === type }"
          class="font-semiblod rounded-xl border px-4 py-2 dark:hover:bg-white"
        >
          {{ type }}
        </button>
      </li>
    </ul>

    <ul class="w-9/12 space-y-2 p-4">
      <li
        v-for="{ title, article, link, type } in filterList"
        :key="title"
        class=""
      >
        <div class="rounded-sm border-b p-4">
          <h4 class="text-2xl">{{ title }}</h4>
          <h5 class="my-4">類別: {{ type }}</h5>
          <a :href="`${url}/${title}`" class="text-blue-500"
            >連結</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const lists = shallowRef([]);
let types = ref(null);
// plugins/arraySet.js
const { $arraySet } = useNuxtApp();
const url = ref(useRequestURL())
onMounted(async () => {
  lists.value = await $fetch("/api/article");
  types.value = $arraySet(lists.value.map(({ type }) => type));
});

const category = ref("All");

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
