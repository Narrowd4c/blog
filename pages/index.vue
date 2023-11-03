<template>
  <div class="container my-10 gap-x-20 lg:flex lg:w-3/4">
    <section class="lg:w-1/2">
      <h2 class="mb-6 text-3xl font-bold">近期文章:</h2>
      <ul>
        <li v-for="{ type, title, link } in articles.slice(0, 4)">
          <div class="border-b py-4">
            <h3 class="mb-2 text-xl md:text-2xl">{{ title }}</h3>
            <p class="mb-1">類別: {{ type }}</p>
            <a
              v-show="link"
              :href="`${url}/article/${title}`"
              class="text-blue-500"
              >閱讀更多</a
            >
          </div>
        </li>
      </ul>
    </section>
    <section class="mt-10 lg:mt-0 lg:w-1/2">
      <h2 class="mb-6 text-3xl font-bold">最近正在看:</h2>
      <h3 class="mb-2 text-xl">程式</h3>
      <ul class="mb-2 space-y-4 md:ps-4">
        <li
          v-for="{ name, about, link } in program"
          :key="name"
          class="group flex w-fit items-center"
        >
          <RightArrow
            class="me-2 w-4 group-hover:animate-pulse dark:fill-white"
          /><a
            class="flex items-center text-blue-500"
            :href="link"
            target="_blank"
            ><p class="me-1 md:text-xl">{{ name }}</p>
            <span>- {{ about }}</span></a
          >
        </li>
      </ul>
      <h3 class="mb-2 text-xl">其他</h3>
      <ul class="space-y-4 md:ps-4">
        <li
          v-for="{ name, about, link } in other"
          :key="name"
          class="group flex w-fit items-center"
        >
          <RightArrow
            class="me-2 w-4 group-hover:animate-pulse dark:fill-white"
          />
          <a
            class="flex items-center text-blue-500"
            :href="link"
            target="_blank"
            ><p class="me-1 md:text-xl">{{ name }}</p>
            <span>- {{ about }}</span></a
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import RightArrow from "../components/icon/RightArrow.vue";
let lists = ref(null);
const articles = shallowRef([]);
const url = ref(useRequestURL().href.slice(0, -1));

onMounted(async () => {
  articles.value = await $fetch("/api/article");
  lists.value = await $fetch("/api/link");
});

const program = computed(() => {
  return lists.value?.filter(({ type }) => type === "程式");
});
const other = computed(() => {
  return lists.value?.filter(({ type }) => type === "其他");
});
</script>
