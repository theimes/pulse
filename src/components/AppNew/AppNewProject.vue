<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new project</SheetTitle>
      </SheetHeader>
      <p>Content</p>
    </SheetContent>
  </Sheet>
</template>
