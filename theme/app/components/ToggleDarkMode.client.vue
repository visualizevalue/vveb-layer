<template>
  <button @click="() => toggleDark()" title="Switch Light/Dark mode" class="unstyled">
    <Icon v-if="isDark" type="sun" :size="20" />
    <Icon v-else type="moon" :size="20" />
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const props = defineProps<{ defaultMode?: 'light' | 'dark' }>()

const isDark = useDark({
  initialValue: props.defaultMode === 'dark' ? 'dark' : props.defaultMode === 'light' ? 'light' : undefined
})
const toggleDark = useToggle(isDark)

watch(isDark, () => {
  if (isDark.value) {
    document.documentElement.classList.remove('lightmode')
    localStorage.setItem('color-scheme', 'dark')
  } else {
    document.documentElement.classList.add('lightmode')
    localStorage.setItem('color-scheme', 'light')
  }
})

onMounted(() => {
  if (!isDark.value) {
    document.documentElement.classList.add('lightmode')
  }
})
</script>

<style scoped>
button {
  position: fixed;
  bottom: var(--spacer);
  right: var(--spacer);
  height: var(--size-5);
  width: var(--size-5);
  padding: 0;
  outline: none;
  z-index: 200;

  .icon {
    height: var(--size-5);
    width: var(--size-5);
    color: var(--muted);
    transition: all var(--speed);
  }

  &:--highlight {
    background: transparent;

    .icon {
      color: var(--gray-z-7);
    }
  }
}
</style>
