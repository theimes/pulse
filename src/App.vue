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

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'))
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="activeError" />

      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div class="w-full" :key="route.path">
            <Suspense v-if="Component" :timeout="0.1">
              <component :is="Component">Hi</component>
              <template #fallback>
                <div
                  class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
                >
                  <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
