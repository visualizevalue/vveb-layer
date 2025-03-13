<template>
  <Dialog
    v-model:open="open"
    class="modal"
    :compat="compat"
    :x-close="xClose"
  >
    <slot />
  </Dialog>
</template>

<script setup>
const open = defineModel('open', { required: true })

const props = defineProps({
  compat: Boolean,
  xClose: {
    type: Boolean,
    default: true,
  },
})
</script>

