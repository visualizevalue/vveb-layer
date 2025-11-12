export function formatETH(value: string | number, maxDecimals: number = 3): string {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numberValue)) {
    throw new Error('Invalid number input')
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(numberValue)
}
