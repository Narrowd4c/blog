<template>
  <header>
    <nav>
      <p>{{ api + 'coco'}}</p>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </nav>
  </header>
</template>
<script setup>
const api = ref(null)
onMounted(async () => { 
  let getRes = await $fetch('/api/api')
  console.log(getRes.api)
  api.value = getRes.api
})
</script>
<style>
 
</style>

