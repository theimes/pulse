<script setup lang="ts">
import { useMenu } from '@/composables/menu'

// use the usePageStore to acces the page data
const { pageData } = storeToRefs(usePageStore())

const taskSheetOpen = ref(false)
const projectSheetOpen = ref(false)

const { menuOpen } = useMenu()
</script>

<template>
  <Sidebar
    @taskClicked="taskSheetOpen = !taskSheetOpen"
    @projectClicked="projectSheetOpen = !projectSheetOpen"
  />
  <AppNewTask v-model="taskSheetOpen" />

  <AppNewProject v-model="projectSheetOpen" />

  <div class="flex flex-col transition-[margin]" :class="{ 'ml-52': menuOpen, 'ml-24': !menuOpen }">
    <TopNavbar />
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>

      <slot />
    </main>
  </div>
</template>
