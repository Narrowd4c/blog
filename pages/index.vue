<template>
  <div class="container my-10 gap-x-20 lg:flex lg:w-3/4">
    <section class="lg:w-1/2">
      <h2 class="mb-6 text-3xl font-bold">近期文章:</h2>
      <ul>
        <li
          v-for="{ type, title, link } in articles.slice(-5).reverse()"
          :key="title"
          class="border-b py-4"
        >
          <h3 class="mb-2 text-xl md:text-2xl">{{ title }}</h3>
          <p class="mb-3">類別: {{ type }}</p>
          <a :href="link" target="_blank" class="text-blue-500">閱讀更多</a>
        </li>
      </ul>
    </section>
    <section class="mt-10 lg:mt-0 lg:w-1/2">
      <div class="my-6 border-b pb-4">
        <img src="/cat.jpeg" alt="cat" class="mb-4 object-contain" />
        <h1 class="mb-6 text-3xl font-bold">關於:</h1>
        <p class="mb-4">
          正在轉職路上的前端工程師，最近正在嘗試使用 Nuxt.js
          和訓練寫文章的能力。
        </p>
        <div class="flex gap-x-2">
          <a href="https://github.com/Narrowd4c" target="_blank" rel="noopener"
            ><img
              :src="
                isDarkMode.isDark
                  ? '/github-mark-white.svg'
                  : '/github-mark.svg'
              "
              alt="github link"
              class="h-6 w-6"
          /></a>
          <a
            href="https://everlasting-hydrangea-e83.notion.site/2ebe5748ab40470cb53936a42feb876b?pvs=4"
            target="_blank"
            rel="noopener"
            ><img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
              alt="notion icon"
              class="h-6 w-6"
          /></a>
        </div>
      </div>
      <div>
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
              ><p class="me-1 md:text-xl">{{ name }} - {{ about }}</p>
            </a>
          </li>
        </ul>
        <h3 class="mb-2 text-xl">其他</h3>
        <ul class="space-y-4 md:ps-4">
          <li
            v-for="{ name, about, link } in other"
            :key="name + about"
            class="group flex w-fit items-center"
          >
            <RightArrow
              class="me-2 w-4 group-hover:animate-pulse dark:fill-white"
            />
            <a
              class="flex items-center text-blue-500"
              :href="link"
              target="_blank"
              ><p class="me-1 md:text-xl">{{ name }} - {{ about }}</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import RightArrow from "../components/icon/RightArrow.vue";
let lists = ref();
const articles = shallowRef([]);
const isDarkMode = useDarkModeStore();
watchEffect(async () => {
  try {
    const { data } = await useAsyncData("article", () =>
      $fetch("/api/article"),
    );
    articles.value = data.value;
  } catch (e) {
    console.log(e);
  }
});
watchEffect(async () => {
  try {
    const getList = await useFetch("/api/link");
    lists.value = getList.data.value;
  } catch (e) {
    console.log(e);
  }
});

const program = computed(() => {
  return lists.value?.filter(({ type }) => type === "程式");
});
const other = computed(() => {
  return lists.value?.filter(({ type }) => type === "其他");
});
</script>
