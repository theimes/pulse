import type { Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { ProjectsQuery } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>([])
  const loadProjects = useMemoize(async (key: string) => await ProjectsQuery)

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data
  }

  return {
    projects,
    getProjects
  }
})
