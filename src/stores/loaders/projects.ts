import type { Projects } from '@/utils/supaQueries'
import { ProjectsQuery } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>([])
  const getProjects = async () => {
    if (projects.value?.length) return

    const { data, error, status } = await ProjectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data
  }

  return {
    projects,
    getProjects
  }
})
