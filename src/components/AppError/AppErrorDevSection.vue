<script setup lang="ts">
defineProps<{
  message: string
  code: string
  details: string
  hint: string | null
  statusCode: number
  customCode: number
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode || code }}</h1>
    <p v-if="statusCode > 0" class="error__msg">Status Code: {{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="details" class="error__msg">{{ details }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
