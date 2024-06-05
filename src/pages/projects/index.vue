<script setup lang="ts"></script>

<template>
  <div>
    <h1>Projects Page</h1>
    <p>Projects page content</p>

    <div>
      <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Project 1</RouterLink>
    </div>

    <div>
      <RouterLink to="/">Home</RouterLink>
    </div>
  </div>
</template>
