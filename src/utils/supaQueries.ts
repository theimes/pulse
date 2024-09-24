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
