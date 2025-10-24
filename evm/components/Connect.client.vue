<template>
  <Button v-if="showConnect" @click="chooseModalOpen = true" :class="className">
    <slot>Connect Wallet</slot>
  </Button>
  <slot v-else name="connected" :address="address">
    <Account :address="address" />
  </slot>

  <Teleport to="body">
    <Modal v-if="showConnect" v-model:open="chooseModalOpen">
      <div class="wallet-options">
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
const { connectors, connect } = useConnect()
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
const login = async (connector) => {
  connect({ connector, chainId })

  setTimeout(() => {
    chooseModalOpen.value = false
  }, 100)
}

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
    width: var(--size-5);
  }
}
</style>
