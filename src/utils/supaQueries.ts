import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectQuery = supabase.from('tasks')
  .select(`id, name, status, due_date, project_id, collaborators,
    projects (id, name, slug)`)

export type tasksWithProject = QueryData<typeof tasksWithProjectQuery>

export const projectsQuery = supabase
  .from('projects')
  .select(`id, name, slug, created_at, status, collaborators`)

export type projectsData = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    id, name, slug, created_at, status, collaborators,
    tasks (id, name, status, due_date)`
    )
    .eq('slug', slug)
    .single()

export type projectData = QueryData<ReturnType<typeof projectQuery>>
