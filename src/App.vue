<script setup lang="ts">
import { useErrorStore } from './stores/error'

/*
const MockComponent = defineComponent(async () => {
  const greeting = ref('Hello, World!')

  await new Promise((resolve) => {
    setTimeout(() => {
      greeting.value = 'Hello, World! (after 2 seconds)'
      resolve(true)
    }, 2000)
  })

  return () => h('div', greeting.value)
})
 */

const errorStore = useErrorStore()

const { activeError } = storeToRefs(useErrorStore())

onErrorCaptured((error) => {
  errorStore.setError({ error: error, customCode: 500 })
  return
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0.1">
        <component :is="Component" :key="route.name">Hi</component>

        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
