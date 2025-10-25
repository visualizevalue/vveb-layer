<template>
  <Teleport to="body">
    <div :popover="mode" ref="popover" class="popover" @toggle.stop.prevent="maybeDismiss">
      <button v-if="xClose" class="close" @click="dismiss">
        <Icon type="close" />
      </button>

      <slot />
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  id: String,
  class: String,
  mode: {
    type: String,
    default: 'manual',
  },
  xClose: {
    type: Boolean,
    default: true,
  },
})
const open = defineModel('open', { required: true })
const popover = ref(null)

const show = () => popover.value?.showPopover()
const hide = () => popover.value?.hidePopover()

const dismiss = () => (open.value = false)
const maybeDismiss = (e) => (e.newState === 'closed' ? dismiss() : null)

// Keep track of the open/hide state
watchEffect(() => (open.value ? show() : hide()))
</script>

<style>
[popover] {
  position: fixed;
  padding: calc(var(--spacer) * 2);
  max-width: var(--dialog-width);
  width: 100%;
  background: var(--background);
  color: var(--color);
  border: var(--border);
  overscroll-behavior: contain;
  height: min-content;
  pointer-events: none;
  align-content: center;
  transition-behavior: allow-discrete;
  transition: all var(--speed);
  transition:
    opacity var(--speed) ease-out,
    transform var(--speed) ease-out,
    display var(--speed) allow-discrete;
  transform: translateY(var(--spacer));
  opacity: 0;

  &::backdrop {
    background: transparent;
    backdrop-filter: none;
    pointer-events: none;
  }

  &:popover-open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;

    @starting-style {
      opacity: 0;
      transform: translateY(var(--spacer));
    }

    &::backdrop {
      background: var(--popover-background-color);
      backdrop-filter: var(--popover-backdrop-filter);
      pointer-events: none;
    }
  }

  > .close {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    width: var(--spacer);
    height: var(--spacer);
    padding: 0;
    z-index: var(--z-index-dialog);
  }

  > h1 {
    padding-right: var(--size-6);
    font-family: var(--ui-font-family);
    font-size: var(--font-lg);
    text-transform: var(--text-transform);
    margin-bottom: var(--size-3);
  }

  > .actions {
    margin-top: var(--spacer);
    display: flex;
    gap: var(--spacer);
    justify-content: flex-end;
  }
}

html:has(dialog[open]),
body:has(dialog[open]) {
  overflow: hidden;
}
</style>
