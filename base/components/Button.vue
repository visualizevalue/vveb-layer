<template>
  <NuxtLink v-if="to" :to="to" :exact="exact" :target="target"><slot /></NuxtLink>
  <button v-else><slot /></button>
</template>

<script setup>
defineProps({
  to: [String, Object],
  target: {
    type: String,
    default: '_self',
  },
  exact: Boolean,
})
</script>

<style scoped>
button,
a {
  position: relative;
  min-width: fit-content;
  width: fit-content;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  gap: calc(var(--ui-padding-x) / 2);
  @mixin ui-font;

  &:not(.unstyled) {
    background: var(--button-background);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    border: var(--button-border);
    border-radius: var(--button-border-radius);
    transition: background var(--speed), border-color var(--speed), color var(--speed);
  }

  > span {
    display: flex;
    gap: var(--ui-padding-x);
    line-height: var(--ui-line-height);
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  :deep(> .icon) {
    color: var(--button-icon-color);
    transition: color var(--speed);
  }

  &:has(> .icon:first-child) {
    padding-left: calc(var(--ui-padding-x) - var(--size-1));
  }

  &:has(> .icon:first-child:last-child) {
    padding: var(--ui-padding-y);
    aspect-ratio: 1;
  }

  &.small {
    padding: calc(var(--ui-padding-y)/2) calc(var(--ui-padding-x)/2);

    :deep(.icon) {
      width: var(--size-3);
      height: var(--size-3);
    }
  }

  &.link {
    border: 0;
    background: transparent;
    line-height: inherit;
    color: var(--muted);

    :deep(.icon) {
      align-self: center;
      height: 1em;
    }
  }

  &.inline {
    display: inline-flex;
    align-self: baseline;
    align-items: baseline;
    height: inherit;
    margin: 0 !important;
    padding: 0 var(--size-1) !important;
    gap: 0.2em;
    width: min-content;
  }

  &.invisible {
    position: absolute;
    left: -200vw;
    opacity: 0;
  }

  &.danger {
    border-color: var(--error);
    color: var(--error);

    :deep(.icon) {
      color: var(--error);
    }
  }

  &:--highlight {
    background: var(--button-background-highlight);
    border-color: var(--button-border-color-highlight);

    > :deep(.icon) {
      color: var(--button-icon-color-highlight);
    }

    &.link {
      background: var(--button-background-highlight);
      color: var(--color);
    }
  }

  &.non-interactive,
  &[disabled]:not([disabled="false"]) {
    color: var(--muted);
    pointer-events: none;
  }
}
</style>
