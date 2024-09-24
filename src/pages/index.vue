<script setup lang="ts">
usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <p>Home page content</p>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>
