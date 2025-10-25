<template>
  <Button v-if="showConnect" @click="chooseModalOpen = true" :class="className">
    <slot>Connect Wallet</slot>
  </Button>
  <slot v-else name="connected" :address="address">
    <Account :address="address" />
  </slot>

  <Teleport to="body">
    <Modal v-if="showConnect" v-model:open="chooseModalOpen">
      <h1>Connect Wallet</h1>
      <Alert v-if="errorMessage" type="error">
        {{ errorMessage }}
      </Alert>
      <template v-if="isConnecting">
        <Loading />
        <p>Waiting for wallet confirmation...</p>
        <p>Check your wallet to approve the connection</p>
      </template>
      <div v-else class="wallet-options">
        <Button v-for="connector in shownConnectors" :key="connector.uid" @click="() => login(connector)"
          class="choose-connector-button">
          <img v-if="ICONS[connector.name]" :src="connector.icon || `${base}icons/wallets/${ICONS[connector.name]}`"
            :alt="connector.name" />
          {{ connector.name }}
        </Button>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup>
import { useAccount, useConnect, useChainId } from '@wagmi/vue'

const ICONS = {
  'Coinbase Wallet': 'coinbase.svg',
  MetaMask: 'metamask.svg',
  Phantom: 'phantom.svg',
  'Rabby Wallet': 'rabby.svg',
  Rainbow: 'rainbow.svg',
  WalletConnect: 'walletconnect.svg',
}

const props = defineProps(['className'])
const emit = defineEmits(['connected', 'disconnected'])
const base = useBaseURL()

const chainId = useChainId()
const { connectors, connectAsync } = useConnect()
const { address, isConnected } = useAccount()

const showConnect = computed(() => !isConnected.value)
const shownConnectors = computed(() => {
  const unique = Array.from(
    new Map(connectors?.map((connector) => [connector.name, connector])).values(),
  )

  const filtered = unique.length > 1 ? unique.filter((c) => c.id !== 'injected') : unique

  return filtered
})

const chooseModalOpen = ref(false)
const errorMessage = ref('')
const isConnecting = ref(false)

const login = async (connector) => {
  // Clear any previous error message and set connecting state
  errorMessage.value = ''
  isConnecting.value = true

  try {
    await connectAsync({ connector, chainId })

    // Connection successful, close modal
    setTimeout(() => {
      chooseModalOpen.value = false
      isConnecting.value = false
    }, 100)
  } catch (error) {
    // Reset connecting state
    isConnecting.value = false

    // User rejected or cancelled the connection request
    if (error.message?.includes('User rejected') || error.message?.includes('rejected') || error.message?.includes('denied')) {
      errorMessage.value = 'Connection cancelled. Please try again.'
    } else {
      // Other errors
      errorMessage.value = 'Failed to connect. Please try again.'
    }
    console.error('Wallet connection error:', error)
  }
}

// Clear error message and connecting state when modal closes
watch(chooseModalOpen, (isOpen) => {
  if (!isOpen) {
    errorMessage.value = ''
    isConnecting.value = false
  }
})

const check = () =>
  isConnected.value ? emit('connected', { address: address.value }) : emit('disconnected')
watch(isConnected, () => check())
onMounted(() => check())
</script>

<style scoped>
.wallet-options {
  display: flex;
  gap: var(--spacer);
  flex-wrap: wrap;
  justify-content: center;
}

.choose-connector-button {
  img {
    margin: -1rem 0 -1rem -0.4rem;
    padding-right: 0.5rem;
    width: var(--size-5);
    height: var(--size-5);
    border-right: var(--border);
  }
}
</style>
