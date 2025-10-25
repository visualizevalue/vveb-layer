<template>
  <div class="loader">
    <span v-if="spinner" class="spinner" aria-hidden="true"></span>
    <span v-if="txt" class="text">{{ txt }}</span>
  </div>
</template>

<script setup>
const { txt, spinner } = defineProps({
  txt: {
    type: String,
    default: 'Loading...',
  },
  spinner: {
    type: Boolean,
    default: false,
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

  .spinner {
    width: var(--size-3);
    height: var(--size-3);
    border: 2px solid var(--muted);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin var(--speed-slow) linear infinite;
  }

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
