<template>
  <ConnectorQR :uri="uri">
    <template #instruction>
      Scan the code in your MetaMask mobile app
    </template>
  </ConnectorQR>
</template>

<script setup>
defineProps({
  uri: {
    type: String,
    required: true,
  },
})
</script>
