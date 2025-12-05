<template>
  <article>
    <h1>Hello VV Theme</h1>

    <Button>Hi Button</Button>
    <Button class="primary">Primary Button</Button>

    <Calendar v-model="date" :is-date-unavailable="isDateUnavailable" />

    <span>{{ date }}</span>

    <hr />

    <div class="light">
      <input type="text" />

      <Calendar v-model="date" :is-date-unavailable="isDateUnavailable" :highlighted="['2025-06-20']" />
    </div>

    <hr />

    <form>
      <input type="checkbox" />

      <hr />

      <label>
        <input type="checkbox" />
        <span>Are you sure?</span>
      </label>
    </form>
  </article>
</template>

<script setup lang="ts">
import type { CalendarRootProps } from 'reka-ui'
import { type DateValue, today } from '@internationalized/date'

const date: Ref<DateValue> = ref(markRaw(today('UTC')))

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
