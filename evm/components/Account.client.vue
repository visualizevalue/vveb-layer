<template>
  <slot :display="display" :is-current="isCurrent">
    <span>{{ display }}</span>
  </slot>
</template>

<script setup lang="ts">
import type { Address } from 'viem'
import { useAccount, useEnsName } from '@wagmi/vue'

const props = defineProps<{
  address?: Address
}>()
const address = computed(() => props.address)

const { address: currentAddress } = useAccount()

const isCurrent = computed<boolean>(
  () => currentAddress.value?.toLowerCase() === address.value?.toLowerCase(),
)

const { data: ens } = useEnsName({
  address,
  chainId: 1,
})

const display = computed<string>(() => ens.value || shortAddress(address.value!))
</script>
