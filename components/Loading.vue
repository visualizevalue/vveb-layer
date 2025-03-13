<template>
  <div class="loader">
    <span v-if="txt" class="text">{{ txt }}</span>
  </div>
</template>

<script setup>
const { txt } = defineProps({
  txt: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<style scoped>
.loader {
  position: relative;
  z-index: var(--z-index-ui);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-sm);

  .text {
    @mixin ui-font;
    color: var(--muted);
  }

  &:not(.inline) {
    text-align: center;
    margin: calc(var(--size-6)) 0;
  }

  &.inline {
    display: inline-flex;
    gap: var(--size-1);
    margin-left: var(--size-1);
  }
}
</style>
