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
  flex-wrap: wrap;
  gap: var(--spacer-sm);

  &:empty {
    display: none;
  }

  :deep(.button) {
    width: auto;
  }
}
</style>
