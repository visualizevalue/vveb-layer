<template>
  <img :src="img" alt="Default Opepen Avatar" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createIcon } from 'opepen-standard'

const { size = 68, seed = '' } = defineProps<{ size: number; seed: string }>()

const canvas = ref<HTMLCanvasElement>()
const img = computed(() => canvas.value?.toDataURL())

const setCanvas = () => {
  canvas.value = createIcon({
    seed,
    size,
  })
}

watchEffect(() => setCanvas())
</script>

<style scoped>
img {
  border-radius: 50%;
  border: var(--border);
  width: 100%;
}
</style>
