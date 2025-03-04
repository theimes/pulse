<script setup lang="ts">
const { slug } = useRoute('/projects/[slug]').params

const projectLoader = useProjectsStore()
const { project } = storeToRefs(projectLoader)
const { getProject, updateProject } = projectLoader

watch(
  () => project.value?.name,
  (name) => {
    usePageStore().pageData.title = `Project ${name}`
  }
)

await getProject(slug)

const { getProfilesByIds } = useCollabs()

const collabs = project.value?.collaborators
  ? await getProfilesByIds(project.value?.collaborators)
  : []

useMeta({
  title: project.value?.name + ' | Pulse'
})
</script>

<template>
  <metainfo></metainfo>
  <div>
    <Table v-if="project">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="project.name" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model="project.description" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="project.status" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collab in collabs"
              :key="collab.id"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                :to="{ name: '/users/[username]', params: { username: collab.username } }"
              >
                <AvatarImage :src="collab.avatar_url || ''" :alt="collab.full_name" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <section class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
      <div class="flex-1">
        <h2>Tasks</h2>
        <div class="table-container">
          <div v-if="project?.tasks.length === 0">
            <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
              This project doesn't have tasks yet...
            </p>
          </div>
          <Table v-else>
            <TableHeader>
              <TableRow>
                <TableHead> Name </TableHead>
                <TableHead> Status </TableHead>
                <TableHead> Due Date </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="task in project?.tasks" :key="task.id">
                <TableCell class="p-0">
                  <RouterLink
                    class="text-left block hover:bg-muted p-4"
                    :to="{ name: '/tasks/[id]', params: { id: task.id } }"
                  >
                    {{ task.name }}
                  </RouterLink>
                </TableCell>
                <TableCell>
                  <AppInPlaceEditStatus readonly :modelValue="task.status" />
                </TableCell>
                <TableCell> {{ task.due_date }} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div class="flex-1">
        <h2>Documents</h2>
        <div class="table-container">
          <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
            This project doesn't have documents yet...
          </p>
          <!-- <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Name </TableHead>
                <TableHead> Visibility </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell> Lorem ipsum dolor sit amet. </TableCell>
                <TableCell> Private </TableCell>
              </TableRow>
            </TableBody>
          </Table> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
