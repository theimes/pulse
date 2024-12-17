import type { TasksWithProject, TaskWithProject } from '@/utils/supaQueries'
import {
  deleteTaskQuery,
  TasksWithProjectQuery,
  TaskWithProjectQuery,
  updateTaskQuery
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProject | null>(null)
  const task = ref<TaskWithProject | null>(null)

  const loadTasks = useMemoize(async () => await TasksWithProjectQuery)
  const loadTask = useMemoize(async (id: string) => await TaskWithProjectQuery(id))

  interface ValidateCacheArgs {
    ref: typeof tasks | typeof task
    query: typeof TasksWithProjectQuery | typeof TaskWithProjectQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
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

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks()

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) {
      tasks.value = data
    }
    validateCache({
      ref: tasks,
      query: TasksWithProjectQuery,
      key: 'tasks',
      loaderFn: loadTasks
    })
  }

  const getTask = async (id: string) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error: error, customCode: status })
    if (data) task.value = data
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    tasks,
    task,
    getTasks,
    getTask,
    updateTask,
    deleteTask
  }
})
