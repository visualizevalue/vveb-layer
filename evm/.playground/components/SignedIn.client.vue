<template>
  <Card v-if="isConnected">
    <h2>Disconnect?</h2>
    <Button @click="disconnect">Disconnect</Button>
  </Card>

  <Card v-if="isConnected">
    <h2>Account Info</h2>
    <p>Address: {{ address }}</p>
    <p>Chain ID: {{ chainId }}</p>
  </Card>

  <Card v-if="isConnected">
    <h2>Transaction Flow Example</h2>
    <p>Send 0 ETH to your own address</p>

    <TransactionFlow :request="sendTransaction" :text="{
      title: {
        confirm: 'Send Transaction',
        requesting: 'Requesting...',
        waiting: 'Waiting for confirmation...',
        complete: 'Transaction Complete!',
        error: 'Transaction Error',
      },
      lead: {
        confirm: 'This will send 0 ETH to your address as a test transaction.',
        requesting: 'Please confirm the transaction in your wallet.',
        waiting: 'Your transaction is being processed...',
        complete: 'Your transaction has been confirmed on-chain.',
        error: 'An error occurred while processing your transaction.',
      },
      action: {
        confirm: 'Send Transaction',
        error: 'Try Again',
      },
    }" @complete="onTransactionComplete" @cancel="onTransactionCancel">
      <template #start="{ start }">
        <Actions>
          <Button @click="start">Start Transaction</Button>
        </Actions>
      </template>

      <template #confirm>
        <div class="tx-details">
          <p><strong>To:</strong> {{ address }}</p>
          <p><strong>Amount:</strong> 0 ETH</p>
          <p><strong>Chain:</strong> {{ chainId }}</p>
        </div>
      </template>

      <template #complete>
        <p class="success">✓ Transaction confirmed successfully!</p>
      </template>
    </TransactionFlow>
  </Card>
</template>

<script setup>
import { useAccount, useDisconnect } from '@wagmi/vue'
import { sendTransaction as sendTx } from '@wagmi/core'
import { parseEther } from 'viem'

const { $wagmi } = useNuxtApp()
const { address, isConnected, chainId } = useAccount()
const { disconnect } = useDisconnect()

const sendTransaction = async () => {
  const hash = await sendTx($wagmi, {
    to: address.value,
    value: parseEther('0'),
  })
  return hash
}

const onTransactionComplete = (receipt) => {
  console.log('Transaction complete:', receipt)
}

const onTransactionCancel = () => {
  console.log('Transaction cancelled')
}
</script>

<style scoped>
.tx-details {
  padding: var(--size-4);
  background: var(--gray-z-1);
  border-radius: var(--radius);
  display: grid;
  gap: var(--size-3);
}

.tx-details p {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--font-sm);
}

.success {
  color: var(--success);
  font-weight: 600;
  text-align: center;
}
</style>
