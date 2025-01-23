<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'Tasks'

const taskLoader = useTasksStore()
const { tasks } = storeToRefs(taskLoader)
const { getTasks } = taskLoader

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <div>
    <div>
      <h1>Tasks Page</h1>
    </div>
    <div>
      <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
    </div>
    <div>
      <RouterLink to="/">Home</RouterLink>
    </div>
  </div>
</template>
