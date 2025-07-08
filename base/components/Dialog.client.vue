<template>
  <Teleport to="body">
    <component
      ref="dialog"
      :is="tag"
      class="dialog"
      :class="classes"
      @cancel.stop.prevent="open = false"
    >
      <button
        v-if="xClose"
        class="close unstyled"
        :title="`Close ${title}` || 'Close Dialog'"
        @touchdown="open = false"
        @click="open = false"
      >
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

  &.compat {
    transform: translate(-50%, -50%);
  }

  &::backdrop,
  + .overlay {
    background: transparent;
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
    + .overlay {
      background: var(--dialog-background-color);
      backdrop-filter: var(--blur);
    }
  }

  &.open {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: var(--z-index-dialog);

    + .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--z-index-overlay);
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

    &:--highlight {
      outline: none;
    }
  }

  > h1 {
    padding-right: var(--size-6);
    font-family: var(--ui-font-family);
    font-size: var(--font-lg);
    text-transform: var(--ui-text-transform);
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
