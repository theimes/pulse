import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const TasksWithProjectQuery = supabase.from('tasks')
  .select(`id, name, status, due_date, project_id, collaborators,
    projects (id, name, slug)`)

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

export const projectsQuery = supabase
  .from('projects')
  .select(`id, name, slug, description, created_at, status, collaborators`)

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

export type ProjectData = QueryData<ReturnType<typeof projectQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

export const groupedProfilesQuery = (userIds: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
