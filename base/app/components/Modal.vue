<template>
  <Dialog
    v-model:open="open"
    class="modal"
    :title="title"
    :compat="compat"
    :x-close="xClose"
    :click-outside="clickOutside"
    @closed="emit('closed')"
  >
    <slot />
  </Dialog>
</template>

<script setup>
const open = defineModel('open', { required: true })
const emit = defineEmits(['closed'])

const props = defineProps({
  title: String,
  compat: Boolean,
  clickOutside: {
    type: Boolean,
    default: true,
  },
  xClose: {
    type: Boolean,
    default: true,
  },
})
</script>
