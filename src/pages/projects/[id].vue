<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1>Project {{ route.params?.id }}</h1>
    <p>Single project content</p>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>
