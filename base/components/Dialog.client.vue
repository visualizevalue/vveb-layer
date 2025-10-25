<template>
  <Teleport to="body">
    <component ref="dialog" :is="tag" :class="classes" @cancel.stop.prevent="open = false">
      <button v-if="xClose" class="close unstyled" :title="`Close ${title || 'Dialog'}`" @touchdown="open = false"
        @click="open = false">
        <Icon type="close" />
      </button>

      <slot />
    </component>

    <div v-if="compat" class="overlay" @click="() => onClickOutside()"></div>
  </Teleport>
</template>

<script setup>
const dialog = ref(null)
const props = defineProps({
  title: String,
  class: String,
  xClose: Boolean,
  clickOutside: {
    type: Boolean,
    default: true,
  },
  compat: Boolean,
})
const open = defineModel('open', { required: true })
const debouncedOpen = ref(open.value)
const tag = computed(() => (props.compat ? 'article' : 'dialog'))
const classes = computed(() => {
  let obj = {
    dialog: true,
    compat: props.compat,
  }

  // Apply passed classes
  if (typeof props.class === 'string') {
    obj[props.class] = true
  } else if (Array.isArray(props.class)) {
    props.class.forEach((c) => {
      obj[c] = true
    })
  } else if (typeof props.class === 'object') {
    obj = { ...obj, ...props.class }
  }

  // Apply open state class
  if (props.compat && debouncedOpen.value) {
    obj.open = true
  }

  return obj
})

const show = () => {
  if (props.compat) {
    debouncedOpen.value = true
  } else {
    dialog.value?.showModal()
  }
}

const hide = () => {
  return new Promise((resolve) => {
    const keyFrame = new KeyframeEffect(
      dialog.value,
      [
        {
          translate: '0 var(--spacer)',
          opacity: '0',
        },
      ],
      { duration: 300, easing: 'ease', direction: 'normal' },
    )

    const animation = new Animation(keyFrame, document.timeline)

    animation.onfinish = () => {
      if (props.compat) {
        debouncedOpen.value = false
      } else {
        dialog.value?.close()
      }
      resolve()
    }
    animation.play()
  })
}

const onClickOutside = () => {
  if (props.clickOutside) {
    open.value = false
  }
}

// Keep track of the open/hide state
watchEffect(() => (open.value ? show() : hide()))
</script>

<style>
.dialog {
  position: fixed;
  padding: calc(var(--spacer) * 2);
  max-width: min(var(--dialog-width), calc(100vw - var(--spacer) * 2));
  width: 100%;
  background: var(--background);
  color: var(--color);
  border: var(--border);
  border-radius: var(--border-radius);
  overscroll-behavior: contain;
  height: min-content;
  opacity: 0;
  pointer-events: none;
  align-content: center;
  max-height: 100dvh;
  container-type: inline-size;

  @media (--md) {
    max-height: calc(100dvh - var(--spacer) * 2);
  }

  &.modal {
    padding: var(--spacer-lg);
    display: grid;
    gap: var(--spacer);

    &:has(> h1:first-of-type) {
      padding: var(--spacer);
      padding-top: calc(var(--spacer) * 3);
      font-size: var(--ui-font-size);
    }
  }

  &.compat {
    transform: translate(-50%, -50%);
  }

  &::backdrop,
  +.overlay {
    background: var(--backdrop-background-color);
    backdrop-filter: none;
  }

  &[open],
  &.open {
    animation: fade-in var(--speed);
    opacity: 1;
    pointer-events: all;

    &.compat {
      animation: compat-dialog-fade-in var(--speed);
    }

    &::backdrop,
    +.overlay {
      background: var(--backdrop-background-color);
      backdrop-filter: var(--blur);
    }
  }

  &.open {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: var(--z-index-dialog);

    +.overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--z-index-overlay);
    }
  }

  >.close {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    width: var(--spacer);
    height: var(--spacer);
    padding: 0;
    z-index: 10;

    &:--highlight {
      outline: none;
    }
  }

  &.modal>.close {
    top: 0;
    right: 0;
    height: calc(var(--spacer) * 2);
    width: calc(var(--spacer) * 2);
    border-left: var(--border);
    border-bottom: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  >h1 {
    padding-right: var(--size-6);
    font-family: var(--ui-font-family);
    font-size: var(--ui-font-size);
    text-transform: var(--ui-text-transform);
    margin-bottom: var(--size-3);
  }

  &.modal>h1:first-of-type {
    width: 100%;
    border-bottom: var(--border);
    height: calc(var(--spacer) * 2);
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 0 0 var(--spacer);
    display: flex;
    align-items: center;
    margin: 0;
    font-size: var(--ui-font-size);
  }

  >.actions {
    margin-top: var(--spacer);
    display: flex;
    gap: var(--spacer);
    justify-content: flex-end;
  }

  &.modal .modal-footer {
    margin: var(--spacer) calc(var(--spacer) * -1) calc(var(--spacer) * -1);
    padding: var(--spacer);
    justify-content: flex-end;
    border-top: var(--border);
  }
}

html:has(dialog[open]),
body:has(dialog[open]),
html:has(.dialog.open),
body:has(.dialog.open) {
  overflow: hidden;
}

@keyframes compat-dialog-fade-in {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + var(--spacer)));
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
