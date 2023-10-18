<template>
  <header>
    <nav>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </nav>
  </header>
</template>
<script setup>
const api = ref(null)
onMounted(async () => { 
  let getRes = await useFetch('/api/api')
  console.log(getRes.api)
  api.value = getRes.api
})
</script>
<style>
 
</style>

