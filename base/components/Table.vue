<template>
  <table>
    <slot />
  </table>
</template>

<style scoped>
table {
  @mixin ui-font;
  color: var(--muted);
  height: min-content;

  :slotted(thead) {
    color: var(--color);
  }

  :slotted(tr:not(:last-child:not(:first-child))) {
    border-bottom: var(--border);
  }

  :deep(td) {
    white-space: nowrap;
    padding: var(--size-1) var(--spacer-sm);

    &.right {
      text-align: right;
    }
  }

  :slotted(tfoot) {
    tr {
      border-bottom: 0 !important;
      border-top: var(--border);
    }
  }
}
</style>
