<template>
  <article>
    <h1>Hello VV Theme</h1>

    <Calendar v-model="date" :is-date-unavailable="isDateUnavailable" />

    <span>{{ date }}</span>
  </article>
</template>

<script setup lang="ts">
import type { CalendarRootProps } from 'reka-ui'
import { today } from '@internationalized/date'

const date = ref()

const validUntil = today('UTC')
const isDateUnavailable: CalendarRootProps['isDateUnavailable'] = (date) => {
  return date.compare(validUntil) < 0
}
</script>

<style scoped>
article {
  display: grid;
  gap: var(--spacer);
}
</style>
