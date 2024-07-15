/* eslint-env node */

import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const logErrorAndExit = (tablename, error) => {
  console.error(`Error seeding ${tablename} with code ${error.code} and message ${error.message}`)
  console.error(error)
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(`\n${stepMessage}`)
}

// create seed projects name, slug, collaborators
const seedProjects = async (numEntries) => {
  logStep('Seeding projects')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name,
      slug: faker.helpers.slugify(name.toLowerCase()),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  }
  console.log(projects)

  const { data, error } = await supabase.from('projects').insert(projects).select('id')
  if (error) logErrorAndExit('projects', error)

  return data
}

// create seed task name status desctiption due_date project_id collaborators
const seedTasks = async (numEntries, projectsIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) logErrorAndExit('tasks', error)

  logStep('Seeding tasks completed')

  return data
}

const seedDatabase = async (numEntries) => {
  const projects = await seedProjects(numEntries)
  console.log('projects ', projects)

  const projectsIds = projects.map((project) => project.id)
  await seedTasks(numEntries, projectsIds)
}

await seedDatabase(10)
