<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { QueryData } from '@supabase/supabase-js'

usePageStore().pageData.title = 'Tasks'

const tasksWithProjectQuery = supabase.from('tasks')
  .select(`id, name, status, due_date, project_id, collaborators,
    projects (id, name, slug)`)

type tasksWithProject = QueryData<typeof tasksWithProjectQuery>

const tasks = ref<tasksWithProject | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectQuery

  if (error) {
    console.error(error)
  } else {
    tasks.value = data
  }
}

await getTasks()

console.log(tasks.value)

const columns: ColumnDef<tasksWithProject[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-medium block w-full'
        },
        () => row.getValue('name')
      )
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status'))
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    // TODO: make this a router-link to the project details page
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects?.slug}`,
              class: 'text-left font-medium hover:bg-medium block w-full'
            },
            () => row.original.projects?.name
          )
        : ''
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators')))
  }
]
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
