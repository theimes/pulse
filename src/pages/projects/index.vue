<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'

const projects = ref<any>([])

const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error(error)
  } else {
    projects.value = data
  }
}

onMounted(() => getProjects())
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <p>Projects page content</p>
  </div>

  <Suspense>
    <div>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <RouterLink :to="{ name: '/projects/[id]', params: { id: project.id } }">{{
            project.name
          }}</RouterLink>
        </li>
      </ul>
    </div>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>

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
