import type { Projects, ProjectData } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { projectQuery, projectsQuery } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<ProjectData | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheArgs {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loaderFn: loaderFN }: ValidateCacheArgs) => {
    if (ref.value !== null) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          return
        } else {
          loaderFN.delete(key)
          if (!error && data) {
            ref.value = data
          }
        }
      })
    }
  }

  const getProjects = async () => {
    projects.value = null

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) {
      projects.value = data
    }
    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects
    })
  }

  const getProject = async (slug: string) => {
    project.value = null

    const { data, error, status } = await loadProject(slug)

    if (error) useErrorStore().setError({ error: error, customCode: status })
    if (data) project.value = data

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: slug,
      loaderFn: loadProject
    })
  }

  return {
    projects,
    getProjects,
    project,
    getProject
  }
})
