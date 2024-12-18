const menuOpen = ref(true)

export const useMenu = () => {
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  return {
    menuOpen,
    toggleMenu
  }
}
/*
Now we can use this composable in our  App.vue  file.
<template>
  <div>
    <button @click="toggleMenu">Toggle Menu</button>
    <div v-if="menuOpen">Menu</div>
  </div>
  */
