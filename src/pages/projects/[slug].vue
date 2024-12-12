<script setup lang="ts">
const { slug } = useRoute('/projects/[slug]').params

const projectLoader = useProjectsStore()
const { project } = storeToRefs(projectLoader)
const { getProject } = projectLoader

watch(
  () => project.value?.name,
  (name) => {
    usePageStore().pageData.title = `Project ${name}`
  }
)

await getProject(slug)
</script>

<template>
  <Table>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project?.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ project?.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="n in project?.collaborators"
            :key="n"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
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
            <TableRow v-for="p in project?.tasks" :key="p.id">
              <TableCell>
                <RouterLink :to="`/tasks/${p.id}`">
                  {{ p.name }}
                </RouterLink>
              </TableCell>
              <TableCell> {{ p.status }} </TableCell>
              <TableCell> {{ p.due_date }} </TableCell>
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
</template>

<style>
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
