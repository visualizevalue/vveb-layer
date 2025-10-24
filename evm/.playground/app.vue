<template>
  <div class="playground">
    <h1>VVEB EVM Layer Playground</h1>

    <Card>
      <h2>Wallet Connection</h2>
      <Connect>
        <template #connected="{ address }">
          <p>
            Connected:
            <Account :address="address" />
          </p>
          <Actions>
            <Button @click="disconnect">Disconnect</Button>
          </Actions>
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
  max-width: 50rem;
  margin: 0 auto;
  padding: var(--spacer);
  display: grid;
  gap: var(--spacer);
}
</style>
