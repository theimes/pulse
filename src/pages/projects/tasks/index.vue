<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'
import type { Tables } from '../../../../database/types'

const tasks = ref<Tables<'tasks'> | null>()

const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error(error)
  } else {
    tasks.value = data
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
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }} <br />
          {{ task.description }}
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
