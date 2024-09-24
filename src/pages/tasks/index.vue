<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { TasksWithProjectQuery } from '@/utils/supaQueries'
import type { tasksWithProject } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<tasksWithProject | null>(null)
const getTasks = async () => {
  const { data, error } = await TasksWithProjectQuery

  if (error) {
    console.error(error)
  } else {
    tasks.value = data
  }
}

await getTasks()

console.log(tasks.value)
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
