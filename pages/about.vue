<template>
  <div class="container my-10 border py-4 lg:w-3/4">
    <h1 class="mb-6 text-4xl">關於我:</h1>
    <p class="mb-2">正在轉職路上的工程師, 喜歡音樂。</p>
    <h2 class="mb-4">最近想分享的:</h2>
    <h3 class="text-xl">程式</h3>
    <ul class="mb-2 space-y-4 ps-4">
      <li
        v-for="{ name, about, link } in program"
        :key="name"
        class="group flex w-fit items-center"
      >
        <img
          src="/arrow_forward.svg"
          alt="arrow_icon"
          class="me-2 w-4 group-hover:animate-bounce"
        /><a
          class="hover:outline-b flex items-center"
          :href="link"
          target="_blank"
          ><p class="me-1 text-xl text-blue-500">{{ name }}</p>
          <span>- {{ about }}</span></a
        >
      </li>
    </ul>
    <div class="border w-full"></div>
    <h3 class="mb-2 text-xl py-3">其他</h3>
    <ul class="space-y-4 ps-4">
      <li
        v-for="{ name, about, link } in other"
        :key="name"
        class="group flex w-fit items-center"
      >
        <img
          src="/arrow_forward.svg"
          alt=""
          class="me-2 w-4 group-hover:animate-bounce"
        />
        <a class="flex items-center" :href="link" target="_blank"
          ><p class="me-1 text-xl text-blue-500">{{ name }}</p>
          <span>- {{ about }}</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
let lists = ref(null);

onMounted(async () => {
  let list = await $fetch("/api/article");
  lists.value = list;
});

const program = computed(() => {
  return lists.value?.filter(({ type }) => type === "程式");
});

const other = computed(() => {
  return lists.value?.filter(({ type }) => type === "其他");
});
</script>
