import type { Address } from 'viem'

// Shorten an Ethereum address
export const shortAddress = (address: Address, length: number = 3) =>
  address.substring(0, length + 2) + '...' + address.substring(address.length - length)
