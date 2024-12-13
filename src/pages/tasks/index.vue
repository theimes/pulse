<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'Tasks'

const taskLoader = useTasksStore()
const { tasks } = storeToRefs(taskLoader)
const { getTasks } = taskLoader

await getTasks()
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
  </div>

  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>

  <div>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
