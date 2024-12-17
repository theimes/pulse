import { supabase } from '@/lib/supabaseClient'
import type { CreateNewTask } from '@/types/CreateNewForm'
import type { QueryData } from '@supabase/supabase-js'

export const TasksWithProjectQuery = supabase
  .from('tasks')
  .select(
    `id, name, status, due_date, project_id, collaborators,
    projects (id, name, slug)`
  )
  .order('id', { ascending: true })

export type TasksWithProject = QueryData<typeof TasksWithProjectQuery>

export const TaskWithProjectQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `id, name, description, status, due_date, project_id, collaborators,
      projects (id, name, slug)`
    )
    .eq('id', id)
    .single()

export type TaskWithProject = QueryData<ReturnType<typeof TaskWithProjectQuery>>

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return supabase.from('tasks').update(updatedTask).eq('id', id)
}

export const deleteTaskQuery = (id: number) => {
  return supabase.from('tasks').delete().eq('id', id)
}

export const projectsQuery = supabase
  .from('projects')
  .select(`id, name, slug, description, created_at, status, collaborators`)
  .order('id', { ascending: true })

export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    id, name, slug, description, created_at, status, collaborators,
    tasks (id, name, status, due_date)`
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return supabase.from('projects').update(updatedProject).eq('id', id)
}

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

export const profilesQuery = supabase.from('profiles').select('id, full_name')

export const groupedProfilesQuery = (userIds: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const createNewTaskQuery = (newTask: CreateNewTask) => {
  return supabase.from('tasks').insert(newTask)
}
