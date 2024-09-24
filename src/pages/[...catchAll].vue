<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import ErrorPage from '@/components/AppError/AppErrorPage.vue'

usePageStore().pageData.title = 'Not found'
</script>

<template>
  <ErrorPage />
</template>
