<template>
  <NuxtLayout>
    <div class="container flex items-center justify-center">
      <div class="text-center">
        <img src="/404.png" alt="error page" class="w-[400px]" />
        <p class="mb-6 text-4xl">網址錯誤</p>
        <div
          class="mx-auto w-fit rounded bg-gradient-to-r from-cyan-500 to-blue-500 p-1"
        >
          <button
            class="w-full rounded-sm bg-white px-4 py-2 font-bold dark:bg-gray-800"
            @click="goBack"
          >
            <p
              class="text-xl text-blue-200 drop-shadow-[0.5px_0.5px_1px_rgba(0,0,0,1)] dark:text-white"
            >
              回到上一頁
            </p>
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>

<style scoped>
.back {
  background: linear-gradient(
    45deg,
    rgba(200, 200, 255, 1),
    rgba(0, 255, 255, 1),
    rgba(0, 100, 255, 1)
  );
}
</style>
