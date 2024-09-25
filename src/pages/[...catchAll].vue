<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import ErrorPage from '@/components/AppError/AppErrorPage.vue'
import { useErrorStore } from '@/stores/error'

usePageStore().pageData.title = 'Not found'

useErrorStore().setError({ error: 'Page not found', customCode: 404 })
</script>

<template>
  <ErrorPage />
</template>
