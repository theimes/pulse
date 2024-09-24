<script setup lang="ts">
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Not found'

const route = useRoute()
</script>

<template>
  <div>
    <h1>Not found</h1>

    <p>Sorry, {{ route.fullPath }} does not exist.</p>

    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
