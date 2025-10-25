<template>
  <Transition name="fade">
    <aside v-if="!dismissed" class="alert" :class="[type]">
      <button v-if="dismissable" @click="dismiss" class="close">
        <Icon type="close" />
      </button>
      <slot />
    </aside>
  </Transition>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  dismiss: {
    type: String,
  },
})

const dismissKey = computed(() => `alert:${props.dismiss}`)

const dismissed = useLocalStorage(dismissKey.value, false)
const dismissable = computed(() => !!props.dismiss)

const dismiss = () => {
  dismissed.value = true
}
</script>

<style scoped>
.alert {
  position: relative;
  display: grid;
  padding: var(--spacer-sm);
  gap: var(--spacer-sm);
  border: var(--border);
  border-color: var(--alert-border-color);
  background-color: var(--alert-background-color);
  font-family: var(--ui-font-family);
  text-transform: uppercase;

  &.info {
    border-color: var(--alert-info-border-color);
    background-color: var(--alert-info-background-color);
    color: var(--alert-info-color);
  }

  &.error {
    border-color: var(--alert-error-border-color);
    background-color: var(--alert-error-background-color);
    color: var(--alert-error-color);
  }

  :deep(> h1) {
    text-transform: uppercase;
    font-weight: bold;
  }

  :deep(> h1),
  :deep(> p) {
    font-size: var(--font-sm);
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: var(--size-4);
    height: var(--size-4);
    padding: 0;
    top: var(--spacer-sm);
    right: var(--spacer-sm);
    background: none;

    &:--highlight {
      background: none;
    }
  }
}
</style>
