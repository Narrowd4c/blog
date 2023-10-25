<template>
  <div class="container my-10 flex items-center lg:w-3/4">
    <div class="w-1/2">
      <section class="mb-6 me-6">
        <h1 class="mb-6 text-3xl font-bold">關於:</h1>
        <p>
          正在轉職路上的工程師，架這個網站的目的是為了嘗試看看 Nuxt.js
          和訓練自己寫文章的能力。
        </p>
        <p class="mb-4">目前文章先以連結代替，之後會再進行修改。</p>
        <div class="flex gap-x-2">
          <a href="https://github.com/Narrowd4c" target="_blank" rel="noopener"
            ><img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
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
      </section>
      <section>
        <h2 class="mb-6 text-3xl font-bold">最近正在看:</h2>
        <h3 class="mb-2 text-xl">程式</h3>
        <ul class="mb-2 space-y-4 ps-4">
          <li
            v-for="{ name, about, link } in program"
            :key="name"
            class="group flex w-fit items-center"
          >
            <RightArrow
              class="me-2 w-4 group-hover:animate-pulse dark:fill-white"
            /><a
              class="hover:outline-b flex items-center"
              :href="link"
              target="_blank"
              ><p class="me-1 text-xl text-blue-500">{{ name }}</p>
              <span>- {{ about }}</span></a
            >
          </li>
        </ul>
        <h3 class="mb-2 text-xl">其他</h3>
        <ul class="space-y-4 ps-4">
          <li
            v-for="{ name, about, link } in other"
            :key="name"
            class="group flex w-fit items-center"
          >
            <RightArrow
              class="me-2 w-4 group-hover:animate-pulse dark:fill-white"
            />
            <a class="flex items-center" :href="link" target="_blank"
              ><p class="me-1 text-xl text-blue-500">{{ name }}</p>
              <span>- {{ about }}</span></a
            >
          </li>
        </ul>
      </section>
    </div>

    <img src="/cat.jpeg" alt="cat" class="w-1/2 object-contain" />
  </div>
</template>

<script setup>
import RightArrow from "../components/icon/RightArrow.vue";
let lists = ref(null);

onMounted(async () => {
  lists.value = await $fetch("/api/link");
});

const program = computed(() => {
  return lists.value?.filter(({ type }) => type === "程式");
});

const other = computed(() => {
  return lists.value?.filter(({ type }) => type === "其他");
});
</script>
