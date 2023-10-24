<template>
  <div class="container my-10 py-4 lg:w-3/4">
    <h2 class="mb-6 text-4xl font-bold ">最近關注:</h2>
    <template v-for="i in lists"></template>

    <h3 class="text-xl mb-2">程式</h3>
    <ul class="mb-2 space-y-4 ps-4">
      <li
        v-for="{ name, about, link } in program"
        :key="name"
        class="group flex w-fit items-center"
      >
        <RightArrow
          class="me-2 w-4 dark:fill-white group-hover:animate-pulse"
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
  </div>
</template>

<script setup>
import RightArrow from "../components/icon/RightArrow.vue";
let lists = ref(null);

onMounted(async () => {
  let getLists = await $fetch("/api/link");
  lists.value = getLists;
});

const program = computed(() => {
  return lists.value?.filter(({ type }) => type === "程式");
});

const other = computed(() => {
  return lists.value?.filter(({ type }) => type === "其他");
});
</script>
