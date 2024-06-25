/* eslint-env node */

import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

// create seed projects name, slug, collaborators
const seedProjects = async (numEntries) => {
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

  await supabase.from('projects').insert(projects)
}

await seedProjects(30)
