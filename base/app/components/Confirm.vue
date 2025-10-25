<template>
  <slot>
    <Button @click="open = true">Trigger</Button>
  </slot>

  <Dialog v-model:open="open" class="confirm-modal">
    <h1>{{ title }}</h1>
    <p v-if="description">{{ description }}</p>

    <Actions>
      <Button @click="open = false">{{ cancel }}</Button>
      <Button @click="() => emit('confirm')">{{ confirm }}</Button>
    </Actions>
  </Dialog>
</template>

<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits(['confirm'])

const {
  title,
  description,
  cancel = 'Cancel',
  confirm = 'Confirm',
} = defineProps<{
  title: string
  description?: string
  cancel?: string
  confirm?: string
}>()
</script>

<style>
.confirm-modal {
  padding: var(--spacer-lg);

  .actions {
    margin-top: var(--spacer-lg);
  }
}
</style>
