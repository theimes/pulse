<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { columns } from '@/utils/tableColumns/projectColumns'
import { useProjectsStore } from '@/stores/loaders/projects'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()

const { projects } = storeToRefs(projectsLoader)

const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getGroupedCollabs(projects.value)

console.log('test :: ', JSON.stringify(groupedCollabs.value))
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
