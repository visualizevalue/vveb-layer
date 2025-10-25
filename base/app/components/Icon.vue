<template>
  <i v-if="symbol" class="icon">
    {{ symbol }}
  </i>
</template>

<script setup lang="ts">
const props = defineProps<{ type: string }>()

const ICONS: { [key: string]: string } = {
  add: '➕',
  check: '☑️',
  'chevron-down': '⬇️',
  'chevron-left': '⬅️',
  'chevron-right': '➡️',
  'chevron-up': '⬆️',
  close: '✖️',
  code: '🩻',
  discord: '🤖',
  edit: '📝',
  email: '📧',
  folder: '📁',
  github: '💻',
  home: '🏠',
  image: '🏞️',
  link: '🔗',
  loader: '⏳',
  maximize: '⛶',
  times: '✖️',
  trash: '🗑️',
  twitter: '🐦',
  user: '👤',
  website: '🌐',
  withdraw: '💵',
}

const symbol = computed(() => ICONS[props.type])
</script>

<style scoped>
.icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
