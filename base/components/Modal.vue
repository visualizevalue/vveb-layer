<template>
  <Dialog v-model:open="open" class="modal" :title="title" :compat="compat" :x-close="xClose">
    <slot />
  </Dialog>
</template>

<script setup>
const open = defineModel('open', { required: true })

const props = defineProps({
  title: String,
  compat: Boolean,
  xClose: {
    type: Boolean,
    default: true,
  },
})
</script>
