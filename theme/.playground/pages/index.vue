<template>
  <article>
    <h1>Hello VV Theme</h1>

    <Calendar v-model="date" />

    <span>{{ date }}</span>
  </article>
</template>

<script setup lang="ts">
const date = ref()
</script>

<style scoped>
article {
  display: grid;
  gap: var(--spacer);
}
</style>
