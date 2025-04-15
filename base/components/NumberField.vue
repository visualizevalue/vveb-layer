<script setup lang="ts">
import { Button } from '#components'

const { min, small } = defineProps<{ min?: number; small?: boolean }>()
const input = defineModel<number>({ default: 1 })
</script>

<template>
  <NumberFieldRoot v-model="input" :min="min" class="input-group" disable-wheel-change>
    <NumberFieldDecrement :as="Button" :class="{ small }">
      <Icon type="minus" />
    </NumberFieldDecrement>
    <NumberFieldInput :class="{ small }" />
    <NumberFieldIncrement :as="Button" :class="{ small }">
      <Icon type="plus" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>

<style scoped>
.input-group {
  input {
    width: min-content;
    text-align: center;
  }
}
</style>
