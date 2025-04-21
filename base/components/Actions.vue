<template>
  <menu class="actions">
    <slot />
  </menu>
</template>

<style scoped>
.actions {
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacer-sm);

  &:empty {
    display: none;
  }

  :deep(> a),
  :deep(> button) {
    height: var(--form-item-height);

    &.small {
      height: var(--form-item-height-sm);
    }
  }

  :deep(> label) {
    @mixin ui-font;
    display: flex;
    align-items: center;
    gap: var(--spacer-sm);
    white-space: nowrap;
  }

  :deep(.button) {
    width: auto;
  }

  :deep(select) {
    width: auto;
  }
}
</style>
