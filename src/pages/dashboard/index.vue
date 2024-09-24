<script setup lang="ts">
usePageStore().pageData.title = 'Dashboard'
</script>

<template>
  <div>
    <h1>Dashboard Page</h1>
    <p>Dashboard content</p>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>
