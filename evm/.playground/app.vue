<template>
  <div class="playground">
    <h1>VVEB EVM Layer Playground</h1>

    <Card>
      <h2>Wallet Connection</h2>
      <Connect>
        <template #connected="{ address }">
          <div class="connected-info">
            <p>Connected: <Account :address="address" /></p>
            <Button @click="disconnect">Disconnect</Button>
          </div>
        </template>
      </Connect>
    </Card>

    <Card v-if="isConnected">
      <h2>Account Info</h2>
      <p>Address: {{ address }}</p>
      <p>Chain ID: {{ chainId }}</p>
    </Card>
  </div>
</template>

<script setup>
import { useAccount, useDisconnect } from '@wagmi/vue'

const { address, isConnected, chainId } = useAccount()
const { disconnect } = useDisconnect()
</script>

<style scoped>
.playground {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacer);
  display: grid;
  gap: var(--spacer);
}

.connected-info {
  display: grid;
  gap: var(--size-4);
}

h1 {
  font-size: var(--font-xl);
  margin-bottom: var(--spacer);
}

h2 {
  font-size: var(--font-lg);
  margin-bottom: var(--size-4);
}
</style>
