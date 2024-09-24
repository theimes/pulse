<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

import type { Tables } from 'database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const projects = ref<Tables<'projects'> | null>()
const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) console.error(error)

  projects.value = data
}

await getProjects()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
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
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created At'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('created_at'))
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
    <h1>Projects Page</h1>
  </div>

  <div>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>

  <div>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>

In the above code, we have a projects ref that will store the projects data fetched from the
Supabase database. We have a getProjects function that fetches the projects data from the Supabase
database. We call the getProjects function when the component is mounted using the onMounted
lifecycle hook. We use the Suspense component to handle the loading state of the projects data. The
Suspense component has a fallback slot that will be displayed when the projects data is being
fetched. We use the v-for directive to loop through the projects data and display the project names
as links. When a project name is clicked, the user will be navigated to the project details page.
Now, let’s create the project details page. Project Details Page Create a new file named [id].vue in
the src/pages/projects directory and add the following code:
