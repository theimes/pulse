<script setup lang="ts">
const route = useRoute()

usePageStore().pageData.title = `Project ${route.params?.slug}`
</script>

<template>
  <div>
    <h1>Project {{ route.params?.slug }}</h1>

    <div class="tg:px-16">
      <RouterLink to="/projects">Projects</RouterLink>
    </div>
  </div>
</template>
